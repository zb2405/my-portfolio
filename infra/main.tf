#################################################
# SSH KEY (AUTO-READ FROM RUNNER)
#################################################

locals {
  ssh_public_key = file("/root/.ssh/proxmox_ansible_key.pub")
  ansible_user   = "root"
}

#################################################
# Persistent Volumes (Protected)
#################################################

resource "proxmox_lxc_mountpoint" "umami_volume" {
  target_node = var.node
  storage     = var.storage
  volume      = "umami-data"
  size        = "10G"

  lifecycle {
    prevent_destroy = true
  }
}

resource "proxmox_lxc_mountpoint" "resume_volume" {
  target_node = var.node
  storage     = var.storage
  volume      = "resume-assets"
  size        = "1G"

  lifecycle {
    prevent_destroy = true
  }
}

#################################################
# NGINX CONTAINER
#################################################

resource "proxmox_lxc" "nginx" {
  target_node  = var.node
  hostname     = "nginx-web"
  ostemplate   = var.template
  password     = var.ct_password
  unprivileged = true
  start        = true

  cores  = 1
  memory = 1024

  ssh_public_keys = local.ssh_public_key

  network {
    name   = "eth0"
    bridge = var.bridge
    ip     = "dhcp"
  }

  rootfs {
    storage = var.storage
    size    = "6G"
  }

  mountpoint {
    key     = 0
    slot    = 0
    storage = var.storage
    volume  = proxmox_lxc_mountpoint.resume_volume.volume
    mp      = "/var/www/html/assets"
    ro      = true
  }

  features {
    nesting = true
  }

  onboot = true
}

#################################################
# CLOUDFLARED CONTAINER
#################################################

resource "proxmox_lxc" "cloudflared" {
  target_node  = var.node
  hostname     = "cloudflared"
  ostemplate   = var.template
  password     = var.ct_password
  unprivileged = true
  start        = true

  cores  = 1
  memory = 256

  ssh_public_keys = local.ssh_public_key

  network {
    name   = "eth0"
    bridge = var.bridge
    ip     = "dhcp"
  }

  rootfs {
    storage = var.storage
    size    = "3G"
  }

  features {
    nesting = true
  }

  onboot = true
}

#################################################
# UMAMI ANALYTICS CONTAINER
#################################################

resource "proxmox_lxc" "umami" {
  target_node  = var.node
  hostname     = "umami-analytics"
  ostemplate   = var.template
  password     = var.ct_password
  unprivileged = true
  start        = true

  cores  = 2
  memory = 2048

  ssh_public_keys = local.ssh_public_key

  network {
    name   = "eth0"
    bridge = var.bridge
    ip     = "dhcp"
  }

  rootfs {
    storage = var.storage
    size    = "10G"
  }

  mountpoint {
    key     = 0
    slot    = 0
    storage = var.storage
    volume  = proxmox_lxc_mountpoint.umami_volume.volume
    mp      = "/var/lib/umami"
  }

  features {
    nesting = true
  }

  onboot = true
}

#################################################
# ANSIBLE READINESS CHECKS
#################################################

resource "null_resource" "wait_for_nginx" {
  depends_on = [proxmox_lxc.nginx]

  provisioner "local-exec" {
    command = <<EOT
echo "Waiting for nginx-web SSH..."
for i in {1..60}; do
  ssh -o StrictHostKeyChecking=no ${local.ansible_user}@${proxmox_lxc.nginx.network[0].ip} "echo ready" && exit 0
  sleep 5
done
echo "ERROR: nginx-web not reachable"
exit 1
EOT
  }
}

resource "null_resource" "wait_for_cloudflared" {
  depends_on = [proxmox_lxc.cloudflared]

  provisioner "local-exec" {
    command = <<EOT
echo "Waiting for cloudflared SSH..."
for i in {1..60}; do
  ssh -o StrictHostKeyChecking=no ${local.ansible_user}@${proxmox_lxc.cloudflared.network[0].ip} "echo ready" && exit 0
  sleep 5
done
echo "ERROR: cloudflared not reachable"
exit 1
EOT
  }
}

resource "null_resource" "wait_for_umami" {
  depends_on = [proxmox_lxc.umami]

  provisioner "local-exec" {
    command = <<EOT
echo "Waiting for umami SSH..."
for i in {1..60}; do
  ssh -o StrictHostKeyChecking=no ${local.ansible_user}@${proxmox_lxc.umami.network[0].ip} "echo ready" && exit 0
  sleep 5
done
echo "ERROR: umami not reachable"
exit 1
EOT
  }
}
