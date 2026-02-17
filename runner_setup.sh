#!/usr/bin/env bash
set -euo pipefail

# Proxmox LXC GitHub Actions Runner 


############################
# USER SETTINGS
############################

CTID=101
HOSTNAME="github-runner"
STORAGE="local-lvm"
DISK_SIZE_GB=15
CORES=2
MEMORY_MB=2048
SWAP_MB=2048
BRIDGE="vmbr0"
MAC_ADDRESS="BC:24:11:1A:E2:52"

TEMPLATE_NAME="ubuntu-25.04-standard_25.04-1.1_amd64.tar.zst"
TEMPLATE_PATH="/var/lib/vz/template/cache/${TEMPLATE_NAME}"

RUNNER_VERSION="2.331.0"
RUNNER_ARCHIVE="actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"
RUNNER_URL="https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/${RUNNER_ARCHIVE}"

REPO_URL="https://github.com/<OWNER>/<REPOSITORY>"
RUNNER_TOKEN="<RUNNER_REGISTRATION_TOKEN>"

SSH_KEY_PATH="/root/.ssh/proxmox_ansible_key"

############################
log() {
  echo "[runner-bootstrap] $1"
}

############################
# VALIDATION
############################
if [[ "$REPO_URL" == *"<"* || "$RUNNER_TOKEN" == *"<"* ]]; then
  echo "ERROR: Set REPO_URL and RUNNER_TOKEN before running."
  exit 1
fi

############################
# SSH KEY GENERATION (HOST)
############################
log "Creating persistent SSH identity"

mkdir -p /root/.ssh

if [[ ! -f "${SSH_KEY_PATH}" ]]; then
  ssh-keygen -t ed25519 -N "" -f "${SSH_KEY_PATH}"
fi

chmod 600 "${SSH_KEY_PATH}"

echo ""
echo "PUBLIC KEY FOR TERRAFORM has been generated at ${SSH_KEY_PATH}.pub"
# cat "${SSH_KEY_PATH}.pub"
# echo ""

############################
# TEMPLATE DOWNLOAD
############################
if [[ ! -f "$TEMPLATE_PATH" ]]; then
  log "Downloading Ubuntu template"
  pveam update
  pveam download local "$TEMPLATE_NAME"
fi

############################
# CREATE RUNNER CONTAINER
############################
log "Creating hardened runner LXC ${CTID}"

pct create "$CTID" "$TEMPLATE_PATH" \
  -hostname "$HOSTNAME" \
  -storage "$STORAGE" \
  -rootfs "${STORAGE}:${DISK_SIZE_GB}" \
  -cores "$CORES" \
  -memory "$MEMORY_MB" \
  -swap "$SWAP_MB" \
  -net0 "name=eth0,bridge=${BRIDGE},ip=dhcp,hwaddr=${MAC_ADDRESS}" \
  -features nesting=1,keyctl=1 \
  -unprivileged 0 \
  -onboot 1

pct start "$CTID"
sleep 10

############################
# DNS CONFIGURATION
############################
log "Configuring DNS"

pct exec "$CTID" -- bash -c '
cat <<EOF >/etc/systemd/resolved.conf
[Resolve]
DNS=1.1.1.1 8.8.8.8
FallbackDNS=9.9.9.9
EOF

ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf
systemctl restart systemd-resolved
'

############################
# BASE TOOLING
############################
log "Installing base packages"

pct exec "$CTID" -- bash -c '
export DEBIAN_FRONTEND=noninteractive

apt update -y
apt install -y \
  ca-certificates \
  curl \
  git \
  jq \
  unzip \
  zip \
  locales \
  software-properties-common \
  openssh-client \
  rsync \
  python3 \
  python3-pip

locale-gen en_US.UTF-8
update-locale LANG=en_US.UTF-8
'

############################
# SSH HARDENING (KEY ONLY)
############################
log "Injecting SSH identity into runner"

pct exec "$CTID" -- mkdir -p /root/.ssh
pct push "$CTID" "${SSH_KEY_PATH}" /root/.ssh/id_ed25519
pct push "$CTID" "${SSH_KEY_PATH}.pub" /root/.ssh/id_ed25519.pub

pct exec "$CTID" -- bash -c '
chmod 700 /root/.ssh
chmod 600 /root/.ssh/id_ed25519

cat <<EOF > /root/.ssh/config
Host *
  IdentityFile ~/.ssh/id_ed25519
  StrictHostKeyChecking no
  UserKnownHostsFile /dev/null
EOF

chmod 600 /root/.ssh/config
'

############################
# NODEJS (GitHub Actions Runtime - Node 22)
############################
log "Installing NodeJS 22"

pct exec "$CTID" -- bash -c '
set -e

export DEBIAN_FRONTEND=noninteractive

curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs

node -v
npm -v
'

############################
# TERRAFORM
############################
log "Installing Terraform"

pct exec "$CTID" -- bash -c '
curl -fsSL https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" \
> /etc/apt/sources.list.d/hashicorp.list

apt update -y
apt install -y terraform
terraform version
'

############################
# ANSIBLE
############################
log "Installing Ansible"

pct exec "$CTID" -- bash -c '
apt install -y ansible
ansible --version
'

############################
# GITHUB RUNNER INSTALL
############################
log "Installing GitHub Actions runner"

pct exec "$CTID" -- bash -c "
mkdir -p /opt/actions-runner
cd /opt/actions-runner

curl -L -o ${RUNNER_ARCHIVE} ${RUNNER_URL}
tar xzf ${RUNNER_ARCHIVE}

export RUNNER_ALLOW_RUNASROOT=1

./config.sh \
 --unattended \
 --url ${REPO_URL} \
 --token ${RUNNER_TOKEN} \
 --name ${HOSTNAME} \
 --labels proxmox,lxc,terraform,ansible \
 --work _work

./svc.sh install
./svc.sh start
"

############################
# FINAL OUTPUT
############################
echo ""
echo "===================================================="
echo "ENTERPRISE RUNNER READY"
echo ""
echo "Terraform ssh_public_keys value:"
echo "file(\"/root/.ssh/proxmox_ansible_key.pub\")"
echo ""
echo "Runner Labels:"
echo "proxmox,lxc,terraform,ansible"
echo "===================================================="

log "Bootstrap complete"
