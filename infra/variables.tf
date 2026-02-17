#################################################
# PROXMOX TARGET SETTINGS
#################################################

variable "node" {
  description = "Proxmox node name"
  type        = string
}

variable "storage" {
  description = "Proxmox storage backend"
  type        = string
}

variable "bridge" {
  description = "Network bridge used by containers"
  type        = string
}

variable "template" {
  description = "LXC template path"
  type        = string
}

#################################################
# NETWORK SETTINGS
#################################################

variable "gateway" {
  description = "Default gateway"
  type        = string
}

variable "dns_server" {
  description = "DNS server for containers"
  type        = string
}

variable "nginx_ip" {
  type = string
}

variable "cloudflared_ip" {
  type = string
}

variable "umami_ip" {
  type = string
}

#################################################
# CONTAINER ACCESS
#################################################

variable "ct_password" {
  description = "Initial container root password"
  type        = string
  sensitive   = true
}

#################################################
# PROXMOX API AUTHENTICATION
#################################################

variable "pm_api_url" {
  type = string
}

variable "pm_api_token_id" {
  type      = string
  sensitive = true
}

variable "pm_api_token_secret" {
  type      = string
  sensitive = true
}

#################################################
# SSH PUBLIC KEY (PASSED FROM RUNNER)
#################################################

variable "ssh_public_key" {
  description = "Runner public key used by Ansible"
  type        = string
}
