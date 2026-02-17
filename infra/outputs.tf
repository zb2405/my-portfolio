#################################################
# AUTO GENERATED ANSIBLE INVENTORY
#################################################

output "ansible_inventory_yaml" {

  value = yamlencode({

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

