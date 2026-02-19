# DevOps / SRE Self‑Hosted Portfolio Platform

## Overview

This repository contains a production‑style, fully self‑hosted
DevOps/SRE portfolio platform designed to demonstrate real‑world
infrastructure engineering practices rather than a traditional frontend
project.

The platform runs entirely on self‑managed Proxmox LXC infrastructure
provisioned through Infrastructure as Code. All services are deployed
via Terraform and configured using Ansible, with automated delivery
driven by a GitHub Actions self‑hosted runner.

Core objectives:

-   Demonstrate production‑grade Infrastructure as Code workflows
-   Enforce secure edge‑first traffic architecture using Cloudflare
    Tunnel
-   Implement zero‑downtime static deployments
-   Operate analytics services internally with controlled exposure
-   Showcase hardened Nginx configuration and secure proxying

This repository represents an infrastructure‑first engineering approach
aligned with modern SRE practices.

------------------------------------------------------------------------

## Architecture Diagram (ASCII)

                        Internet
                            │
                            ▼
                       Cloudflare Edge
                            │
                            ▼
                    Cloudflare Tunnel (LXC)
                       192.168.0.11
                            │
                            ▼
                     NGINX Reverse Proxy
                       192.168.0.10
                            │
            ┌───────────────┴────────────────┐
            │                                 │
            ▼                                 ▼
      Static Vite Releases             Internal Umami
     /var/www/html/assets          192.168.0.12 (Private)
            │                                 │
            ▼                                 ▼
        current symlink                PostgreSQL Volume
       Blue/Green Deploy               /var/lib/umami

------------------------------------------------------------------------

## Tech Stack

  Category                   Technology
  -------------------------- -------------------------------------
  Infrastructure             Terraform (HCL), Proxmox VE
  Configuration Management   Ansible, Jinja Templates
  CI/CD                      GitHub Actions + Self‑Hosted Runner
  Runtime                    Proxmox LXC Containers
  Edge Networking            Cloudflare Tunnel (token mode)
  Reverse Proxy              Nginx (Hardened)
  Frontend                   React + Vite + TypeScript
  Analytics                  Umami (Self‑Hosted)
  Database                   PostgreSQL (Persistent Volume)
  Automation                 Shell, SSH, rsync

------------------------------------------------------------------------

## Infrastructure Provisioning (Terraform + Proxmox)

Infrastructure is provisioned declaratively using Terraform modules
under `infra/`.

Terraform manages:

-   Proxmox LXC lifecycle
-   Network configuration and static IP assignments
-   Persistent mountpoints for stateful services
-   Container resource definitions

### Static Network Layout

  Service           Container   IP Address
  ----------------- ----------- --------------
  nginx-web         LXC         192.168.0.10
  cloudflared       LXC         192.168.0.11
  umami-analytics   LXC         192.168.0.12

### Persistent Mountpoints

    /var/www/html/assets   → Static release storage
    /var/lib/umami         → PostgreSQL data volume

------------------------------------------------------------------------

## Security & Hardening (Nginx + CSP)

Nginx is deployed with a hardened configuration to enforce strict edge
security policies.

### Core Hardening Controls

-   `server_tokens off`
-   Strict HTTP methods (`GET`, `HEAD`)
-   Hidden file blocking
-   Rate limiting
-   Gzip compression
-   Reverse proxy cache for analytics endpoints

### Edge Security Model

Cloudflare performs:

-   TLS termination
-   Public ingress handling
-   Reverse proxy enforcement

Infrastructure exposes **zero public inbound ports**.\
All origin access occurs through Cloudflare Tunnel.

------------------------------------------------------------------------

## Analytics Architecture (Umami internal proxy)

Umami analytics runs entirely within a private LXC container and is not
exposed to the internet.

Design goals:

-   Internal observability without public attack surface
-   Persistent PostgreSQL storage
-   Cached analytics API responses via Nginx

### Deployment Details

-   Built using `pnpm build`
-   Prisma migrations executed during Ansible provisioning
-   PostgreSQL data stored on persistent volume
-   Accessed internally through Nginx proxy endpoints:

```{=html}
<!-- -->
```
    /umami
    /api/visitors

The React frontend fetches analytics data through Nginx, not directly
from Umami.

------------------------------------------------------------------------

## Zero-Downtime Deployment Flow

Static frontend deployments use a Blue/Green release model.

### Release Process

    Build → Upload → Release Directory → Symlink Switch

Example layout:

    /var/www/html/assets/releases/<timestamp>
    /var/www/html/assets/current -> symlink

Deployment steps:

1.  New build uploaded to timestamped release directory
2.  Nginx continues serving current version
3.  Symlink switched atomically
4.  No downtime during rollout

Benefits:

-   Instant rollback capability
-   Immutable release history
-   Zero restart deployment

------------------------------------------------------------------------

## GitHub Actions Pipeline

CI/CD runs on a self‑hosted runner deployed inside the infrastructure.

### Pipeline Stages

1.  Install dependencies
2.  Build Vite frontend
3.  Execute Ansible deployment
4.  Synchronize release artifacts via rsync

Key behaviors:

-   Terraform outputs used as dynamic Ansible inventory
-   SSH‑based orchestration
-   Artifact deployment without rebuilding on servers

------------------------------------------------------------------------

## Repository Layout

    .github/workflows/      → CI/CD pipeline definitions
    ansible/                → Base playbooks and roles
    ansible-deploy/         → Deployment orchestration
    infra/                  → Terraform Proxmox provisioning
    zaki-portfolio-v11/     → React + Vite frontend
    runner_setup.sh         → Self-hosted runner bootstrap

------------------------------------------------------------------------

## Local Development

Frontend development occurs within the Vite project.

    cd zaki-portfolio-v11
    npm install
    npm run dev

Build output:

    npm run build

Generated assets are deployed through Ansible during CI/CD.

------------------------------------------------------------------------

## Deployment Instructions

### Terraform Provisioning

    cd infra
    terraform init
    terraform apply

### Ansible Configuration

    ansible-playbook -i inventory deploy.yml

### Runner Setup

    chmod +x runner_setup.sh
    ./runner_setup.sh

The runner connects to GitHub Actions and executes workflows
automatically.

------------------------------------------------------------------------

## Design Decisions & Engineering Tradeoffs

### Cloudflare Tunnel Instead of Public Nginx

-   Eliminates open inbound ports
-   Reduces attack surface
-   Centralizes TLS and edge security

### LXC Containers Over Full VMs

-   Faster provisioning
-   Lower resource overhead
-   Suitable for static workloads

### Blue/Green Static Deployments

-   Enables instant rollback
-   Avoids service restarts
-   Simplifies release management

### Internal Analytics Proxy

-   Prevents direct exposure of analytics backend
-   Allows caching at Nginx layer
-   Improves frontend performance

------------------------------------------------------------------------

## Security Considerations

-   Zero public ingress on origin infrastructure
-   Tunnel‑only connectivity
-   Strict CSP and header enforcement
-   Minimal HTTP method allowance
-   Internal analytics isolation
-   Persistent storage scoped to required services
-   Token‑based Cloudflare Tunnel authentication
-   No origin certificates stored on hosts

------------------------------------------------------------------------

## License

MIT License
