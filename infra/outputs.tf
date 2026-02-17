#################################################
# ANSIBLE AUTO-INVENTORY OUTPUTS
#################################################

output "ansible_inventory" {
  depends_on = [
    null_resource.wait_for_nginx,
    null_resource.wait_for_cloudflared,
    null_resource.wait_for_umami
  ]

  value = {
    nginx = {
      hosts = {
        nginx-web = {
          ansible_host = proxmox_lxc.nginx.network[0].ip
          ansible_user = local.ansible_user
        }
      }
    }

    cloudflared = {
      hosts = {
        cloudflared = {
          ansible_host = proxmox_lxc.cloudflared.network[0].ip
          ansible_user = local.ansible_user
        }
      }
    }

    umami = {
      hosts = {
        umami-analytics = {
          ansible_host = proxmox_lxc.umami.network[0].ip
          ansible_user = local.ansible_user
        }
      }
    }
  }
}
