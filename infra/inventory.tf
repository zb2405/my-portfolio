#################################################
# ANSIBLE INVENTORY YAML
#################################################

locals {
  ansible_inventory_yaml = yamlencode({
    all = {
      children = {

        nginx = {
          hosts = {
            nginx-web = {
              ansible_host = var.nginx_ip
              ansible_user = "root"
            }
          }
        }

        cloudflared = {
          hosts = {
            cloudflared = {
              ansible_host = var.cloudflared_ip
              ansible_user = "root"
            }
          }
        }

        umami = {
          hosts = {
            umami-analytics = {
              ansible_host = var.umami_ip
              ansible_user = "root"
            }
          }
        }

      }
    }
  })
}
#################################################
# WRITE INVENTORY FILE
#################################################

resource "local_file" "ansible_inventory" {
  filename = "${path.module}/ansible/inventory/generated.yml"
  content  = local.ansible_inventory_yaml
}