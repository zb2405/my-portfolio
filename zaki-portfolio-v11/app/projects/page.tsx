import React, { useState } from 'react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { TerminalHeader } from '../../components/ui/TerminalHeader';
import { FilterBar } from '../../components/projects/FilterBar';
import { ProjectCard, Project } from '../../components/projects/ProjectCard';
import { Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const PROJECTS: Project[] = [
{
  id: '1',
  title: 'Linux Server QA Automation',
  description:
  'An automated Quality Assurance (QA) framework for validating newly built Linux servers using Ansible and Python. It performs structured validation of system configuration, services, storage, networking, DNS, and OS registration, then generates a formatted Excel QA report. The solution is designed for enterprise build validation workflows where consistency, auditability, and repeatable checks are required.',
  category: 'Automation',
  tech: ['Ansible','Python','Linux'],
  links: { github: 'https://github.com/zb2405/Linux_QA#' }
},
{
  id: '2',
  title: 'Automating IT infrastructure using Ansible and AWX',
  description:
  'Designed and implemented an Infrastructure-as-Code solution using Ansible roles and AWX to automate deployment of a load-balanced web environment. The project demonstrates role-based automation, centralized orchestration, and repeatable configuration management workflows for Apache, HAProxy, SELinux, and system patching.',
  category: 'Automation',
  tech: ['Ansible','Ansible Tower','Infrastructure as Code','DevOps','Automation','HAProxy','Apache','Linux Automation'],
  links: { github: 'https://github.com/zb2405/project-nssa-320/tree/master' }
},
{
  id: '3',
  title: 'Packet Capture Analysis Tool',
  description:
  'implements a Packet Capture Analysis (PCA) tool written in Python. The tool analyzes ICMP packet capture data collected from multiple network nodes and computes performance and network metrics used for analysis.',
  category: 'Monitoring',
  tech: ['python','network-monitoring','linux-networking'],
  links: { github: 'https://github.com/zb2405/Packet-Capture-Analysis-Tool' }
},
{
  id: '4',
  title: 'Webserver Deployment with HAProxy & Apache',
  description:
  'Infrastructure-as-Code project built with Ansible roles to automate deployment of a load-balanced web application environment. The automation provisions Apache web servers, configures HAProxy load balancing, enforces SELinux and firewall policies, and enables automated system updates using dnf-automatic. Designed to demonstrate idempotent configuration management and scalable infrastructure automation workflows.',
  category: 'Infrastructure',
  tech: ['Ansible','infrastructure-as-code','configuration-management','DevOps','linux-automation','apache','haproxy','selinux'],
  links: { github: 'https://github.com/zb2405/NSSA-320-configuration-management/tree/main' }
},
{
  id: '5',
  title: 'Application performance monitoring tool',
  description:
  'This project implements a simple Application Performance Monitoring (APM) tool written in Bash. The script launches multiple application processes, monitors their performance, collects system metrics, and stores the results in CSV files for analysis. The goal of this project was to simulate real-world performance monitoring used by system administrators to detect resource bottlenecks, performance issues, and abnormal application behaviour.',
  category: 'Monitoring',
  tech: ['bash','linux','performance-monitoring'],
  links: { github: 'https://github.com/zb2405/Application-Performance-Monitoring-APM-Tool' }
},
{
  id: '6',
  title: 'HA Kubernetes Cluster Deployment using Ansible, Docker, Rancher',
  description:
  'This project demonstrates the deployment of a High Availability Kubernetes cluster using Ansible automation, Docker containers, Rancher, and RKE (Rancher Kubernetes Engine). The goal of this capstone project was to simplify Kubernetes cluster deployment, reduce manual configuration effort, and provide centralized cluster management using the Rancher dashboard.',
  category: 'Infrastructure',
  tech: ['Kubernetes','ansible','rancher','docker','rke','infrastructure-as-code','DevOps','linux-automation'],
  links: { github: 'https://github.com/zb2405/HA-Kubernetes-cluster-using-Ansible-Docker-and-Rancher' }
},
{
  id: '7',
  title: 'End-to-End Webserver Deployment on AWS',
  description:
  'Designed and deployed a cloud-hosted web application using AWS EC2, RDS, S3, IAM, and Route 53. The project demonstrates full-stack cloud architecture including DNS routing, database integration, object storage, and role-based access control. A Python-based web application was deployed on EC2, storing uploaded files in S3 while persisting structured data in a MySQL database on RDS, showcasing scalable and cost-efficient cloud infrastructure design.',
  category: 'Cloud',
  tech: ['aws','amazon-ec2','amazon-s3','amazon-rds','route53','cloud-computing','cloud-architecture','web-deployment','linux'],
  links: { github: '/public/pdfs/e2e_aws.pdf' }
},
{
  id: '8',
  title: 'CI/CD pipeline using Jenkins, Ansible, and Docker',
  description:
  'Designed and implemented a complete CI/CD pipeline integrating GitHub, Jenkins, Ansible, Docker, and Docker Hub to automate application build, testing, and deployment workflows. The pipeline automatically triggers Jenkins builds on source code commits, builds Docker images from a Dockerfile, pushes versioned images to Docker Hub, and deploys containers using Ansible playbooks across client nodes. The project demonstrates automated software delivery, container-based deployment, and infrastructure orchestration within a DevOps environment.',
  category: 'Cloud',
  tech: ['cicd','Jenkins','docker','ansible','DevOps','automation','pipeline','dockerhub','infrastructure-as-code'],
  links: { github: '/public/pdfs/cicd.pdf' }
},
{
  id: '9',
  title: 'Proxmox LXC GitHub Actions Runner',
  description:
  'Automation script that provisions a self-hosted GitHub Actions runner inside a Proxmox LXC container using Ubuntu and Docker. The project demonstrates CI/CD infrastructure automation, containerized runners, and lightweight virtualization for test or staging environments, with automated runner registration and systemd service management.',
  category: 'Automation',
  tech: ['github-actions','proxmox','lxc','docker','cicd','automation','linux','bash','DevOps'],
  links: { github: 'https://github.com/zb2405/github-selfhosted-runner' }
}
];

const CATEGORIES = [
'All',
'Infrastructure',
'Automation',
'Monitoring',
'Cloud'];

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredProjects =
  activeCategory === 'All' ?
  PROJECTS :
  PROJECTS.filter((p) => p.category === activeCategory);
  return (
    <main className="relative w-full min-h-screen">
      <div className="pl-[96px] pt-28 pb-20 pr-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none z-0" />
        <div className="scanline-overlay absolute inset-0 pointer-events-none z-0 opacity-10" />
        <div className="max-w-6xl mr-auto relative z-10">
          <header className="mb-12">
            <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="flex flex-col items-start gap-6">
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <StatusBadge label="project_registry: active" status="active" />
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                  <span>uptime: 99.99%</span>
                  <span className="w-px h-3 bg-slate-700" />
                  <span>region: us-east-1</span>
                </div>
              </div>
              <div className="space-y-4">
                <TerminalHeader text="projects" />
                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4,duration:0.8}} className="text-slate-400 max-w-xl text-base leading-relaxed border-l-2 border-teal-500/30 pl-5 py-1">
                  Infrastructure, automation, and distributed systems I've architected and deployed.
                </motion.p>
              </div>
            </motion.div>
          </header>

          <FilterBar
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelect={setActiveCategory} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProjects.map((project, index) =>
            <ProjectCard key={project.id} project={project} index={index} />
            )}
          </div>

          {filteredProjects.length === 0 &&
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-lg bg-slate-900/30">
              <Terminal className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-mono text-slate-400 mb-2">
                No projects found
              </h3>
              <p className="text-slate-600 text-sm">
                Try adjusting the filters or check back later.
              </p>
            </div>
          }

          <footer className="mt-16 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3 text-xs font-mono text-slate-600">
            <div>
              <span className="text-teal-500">root@portfolio</span>:~/projects#{' '}
              <span className="animate-pulse">_</span>
            </div>
            <div className="flex gap-6">
              <span>MIT_LICENSE</span>
              <span>V2.0.4</span>
              <span>BUILD_ID: 8f3a2c</span>
            </div>
          </footer>
        </div>
      </div>
    </main>);
}
