
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
