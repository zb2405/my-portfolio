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
# CONTAINER ACCESS
#################################################

variable "ct_password" {
  description = "Initial container root password (console only)"
  type        = string
  sensitive   = true
}

#################################################
# PROXMOX API AUTHENTICATION
#################################################

variable "pm_api_url" {
  description = "Proxmox API endpoint"
  type        = string
}

variable "pm_api_token_id" {
  description = "Proxmox API Token ID"
  type        = string
  sensitive   = true
}

variable "pm_api_token_secret" {
  description = "Proxmox API Token Secret"
  type        = string
  sensitive   = true
}

#################################################
# SSH KEY AUTO-INJECTION (RUNNER CONTROL PLANE)
#################################################

variable "ssh_public_key_path" {
  description = "Path to runner SSH public key used for Ansible access"
  type        = string
  default     = "/root/.ssh/proxmox_ansible_key.pub"
}
