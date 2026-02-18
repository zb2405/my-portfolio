"use client";

import React from "react";
import { ExperienceCard, ExperienceData } from "./ExperienceCard";
import { TimelineNode } from "./TimelineNode";

const EXPERIENCE_DATA: ExperienceData[] = [
  {
    role: "IT Operations",
    company: "Tesla Motors",
    date: "2021 – 2025",
    logo: "/experience/tesla.svg",
    description:
      "Stabilized retail IT operations across North America by resolving high-impact incidents and improving recovery workflows. Automated Linux operations using Bash and Python, built GitHub Actions CI pipelines, supported Docker workloads, and implemented Grafana monitoring and automated health checks. Reduced MTTR through improved alerting, runbooks, and root-cause analysis while collaborating with network, security, and application teams to deliver zero-downtime infrastructure changes.",
    skills: [
      "Linux",
      "Python",
      "Bash",
      "Docker",
      "Grafana",
      "GitHub Actions",
      "Cisco vManage",
      "Zscaler",
      "Aruba"
    ],
  },
  {
    role: "Implementation Engineer (Intern)",
    company: "Ensono",
    date: "2021",
    logo: "/experience/ensono.svg",
    description:
      "Installed and supported Linux web and application servers, resolving production tickets while meeting SLA expectations. Automated server builds with Bash, Python, Ansible, and AWX, monitored system health using Linux tools, hardened hosts with firewalld and iptables, and maintained Apache, NGINX, and LAMP environments across RHEL systems.",
    skills: [
      "RHEL",
      "Apache",
      "NGINX",
      "Ansible",
      "AWX",
      "LAMP",
      "LVM",
      "XFS",
      "NFS"
    ],
  },
  {
    role: "Graduate Teaching Assistant",
    company: "Rochester Institute of Technology",
    date: "2020 – 2021",
    logo: "/experience/rit.svg",
    description:
      "Supported Network Services and System Administration courses, guiding students through Linux administration, TCP/IP networking, DNS, DHCP, and routing labs. Assisted with grading, provided technical feedback, and resolved VMware lab environment issues while improving documentation to reduce setup errors.",
    skills: [
      "Linux",
      "Networking",
      "DNS",
      "DHCP",
      "Routing",
      "CentOS",
      "VMware",
      "Bash"
    ],
  },
  {
    role: "Testing and Systems Engineer",
    company: "Larsen & Toubro",
    date: "2017 – 2019",
    logo: "/experience/lnt.svg",
    description:
      "Commissioned and supported industrial network systems for critical infrastructure projects, achieving 99.9% availability during production handover. Automated deployment workflows, built and troubleshot Windows Server environments supporting SCADA systems, and conducted Factory Acceptance Testing to validate performance and compliance before deployment.",
    skills: [
      "SCADA",
      "Windows Server",
      "Industrial Networking",
      "Automation",
      "FAT Testing"
    ],
  },
];


export function ExperienceTimeline() {
  return (
    <div className="relative w-full max-w-5xl ml-0 mr-auto px-2 md:px-0">
      <div className="flex flex-col">
        {EXPERIENCE_DATA.map((item, index) => (
          <div key={index} className="flex h-full">
            {/* Timeline Node */}
            <div className="flex-shrink-0 w-12 md:w-16 flex justify-center">
              <TimelineNode
                index={index}
                isLast={index === EXPERIENCE_DATA.length - 1}
              />
            </div>

            {/* Card */}
            <div className="flex-grow pb-12">
              <ExperienceCard data={item} index={index} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
