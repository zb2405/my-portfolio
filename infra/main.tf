#################################################
# LOCALS
#################################################

locals {
  ansible_user = "root"
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

  nameserver      = var.dns_server
  ssh_public_keys = var.ssh_public_key

  network {
    name   = "eth0"
    bridge = var.bridge
    ip     = "${var.nginx_ip}/24"
    gw     = var.gateway
  }

  rootfs {
    storage = var.storage
    size    = "6G"
  }

  mountpoint {
    key     = 0
    slot    = 0
    storage = var.storage
    size    = "1G"
    mp      = "/var/www/html/assets"
  }

  features { nesting = true }

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

  nameserver      = var.dns_server
  ssh_public_keys = var.ssh_public_key

  network {
    name   = "eth0"
    bridge = var.bridge
    ip     = "${var.cloudflared_ip}/24"
    gw     = var.gateway
  }

  rootfs {
    storage = var.storage
    size    = "3G"
  }

  features { nesting = true }

  onboot = true
}

#################################################
# UMAMI CONTAINER
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

  nameserver      = var.dns_server
  ssh_public_keys = var.ssh_public_key

  network {
    name   = "eth0"
    bridge = var.bridge
    ip     = "${var.umami_ip}/24"
    gw     = var.gateway
  }

  rootfs {
    storage = var.storage
    size    = "10G"
  }

  mountpoint {
    key     = 0
    slot    = 0
    storage = var.storage
    size    = "10G"
    mp      = "/var/lib/umami"
  }

  features { nesting = true }

  onboot = true
}

#################################################
# ANSIBLE READINESS CHECKS (STATIC IPS)
#################################################

resource "null_resource" "wait_for_nginx" {
  depends_on = [proxmox_lxc.nginx]

  provisioner "local-exec" {
    command = <<EOT
for i in {1..60}; do
  ssh -o StrictHostKeyChecking=no ${local.ansible_user}@${var.nginx_ip} "echo ready" && exit 0
  sleep 5
done
exit 1
EOT
  }
}

resource "null_resource" "wait_for_cloudflared" {
  depends_on = [proxmox_lxc.cloudflared]

  provisioner "local-exec" {
    command = <<EOT
for i in {1..60}; do
  ssh -o StrictHostKeyChecking=no ${local.ansible_user}@${var.cloudflared_ip} "echo ready" && exit 0
  sleep 5
done
exit 1
EOT
  }
}

resource "null_resource" "wait_for_umami" {
  depends_on = [proxmox_lxc.umami]

  provisioner "local-exec" {
    command = <<EOT
for i in {1..60}; do
  ssh -o StrictHostKeyChecking=no ${local.ansible_user}@${var.umami_ip} "echo ready" && exit 0
  sleep 5
done
exit 1
EOT
  }
}