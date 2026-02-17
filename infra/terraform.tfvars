node     = "zaki"
storage  = "local-lvm"
bridge   = "vmbr0"

template = "local:vztmpl/ubuntu-24.04-standard_24.04-2_amd64.tar.zst"

gateway    = "192.168.0.1"
dns_server = "192.168.0.201"

nginx_ip       = "192.168.0.10"
cloudflared_ip = "192.168.0.11"
umami_ip       = "192.168.0.12"
