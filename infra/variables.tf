
variable "node" {}
variable "storage" {}
variable "bridge" {}
variable "template" {}
variable "ct_password" {}

variable "pm_api_url" {}
variable "pm_api_token_id" {}
variable "pm_api_token_secret" {}
variable "ssh_public_key_path" {
  description = "Path to runner SSH public key"
  type        = string
  default     = "/root/.ssh/proxmox_ansible_key.pub"
}