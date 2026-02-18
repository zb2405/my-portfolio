import React, { useState, lazy } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  Cpu,
  Cloud,
  Shield,
  Activity,
  Server,
  GitBranch } from
'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { TerminalHeader } from '../ui/TerminalHeader';
/* ======================================================
   TYPES
====================================================== */
type Skill = {
  name: string;
  logoUrl: string;
};
type Category = {
  id: string;
  title: string;
  icon: React.ElementType;
  skills: Skill[];
};
/* ======================================================
   DATA  (LOCAL SVG FILES ONLY)
====================================================== */
const SKILL_CATEGORIES: Category[] = [
{
  id: 'programming',
  title: 'Programming Languages',
  icon: Terminal,
  skills: [
  {
    name: 'Python',
    logoUrl: '/skills/python.svg'
  },
  {
    name: 'Golang',
    logoUrl: '/skills/go.svg'
  },
  {
    name: 'BASH',
    logoUrl: '/skills/bash.svg'
  }]

},
{
  id: 'containers',
  title: 'Containers & Orchestration',
  icon: Server,
  skills: [
  {
    name: 'Docker',
    logoUrl: '/skills/docker.svg'
  },
  {
    name: 'Kubernetes',
    logoUrl: '/skills/kubernetes.svg'
  },
  {
    name: 'Rancher',
    logoUrl: '/skills/rancher.svg'
  }]

},
{
  id: 'cicd',
  title: 'CI/CD & Version Control',
  icon: GitBranch,
  skills: [
  {
    name: 'Jenkins',
    logoUrl: '/skills/jenkins.svg'
  },
  {
    name: 'GitHub',
    logoUrl: '/skills/github.svg'
  },
  {
    name: 'GitHub Actions',
    logoUrl: '/skills/github_actions.svg'
  }]

},
{
  id: 'iac',
  title: 'Infrastructure as Code',
  icon: Cpu,
  skills: [
  {
    name: 'Terraform',
    logoUrl: '/skills/terraform.svg'
  },
  {
    name: 'Ansible',
    logoUrl: '/skills/ansible.svg'
  },
  {
    name: 'Puppet',
    logoUrl: '/skills/puppet.svg'
  }]

},
{
  id: 'cloud',
  title: 'Cloud & Operating Systems',
  icon: Cloud,
  skills: [
  {
    name: 'AWS',
    logoUrl: '/skills/aws.svg'
  },
  {
    name: 'Red Hat',
    logoUrl: '/skills/redhat.svg'
  },
  {
    name: 'Ubuntu',
    logoUrl: '/skills/ubuntu.svg'
  },
  {
    name: 'Microsoft',
    logoUrl: '/skills/microsoft.svg'
  }]

},
{
  id: 'networking',
  title: 'Networking & Security',
  icon: Shield,
  skills: [
  {
    name: 'Cisco',
    logoUrl: '/skills/cisco.svg'
  },
  {
    name: 'Juniper',
    logoUrl: '/skills/juniper.svg'
  },
  {
    name: 'Aruba',
    logoUrl: '/skills/aruba.svg'
  },
  {
    name: 'Zscaler',
    logoUrl: '/skills/zscaler.svg'
  }]

},
{
  id: 'monitoring',
  title: 'Monitoring & Observability',
  icon: Activity,
  skills: [
  {
    name: 'Grafana',
    logoUrl: '/skills/grafana.svg'
  },
  {
    name: 'Splunk',
    logoUrl: '/skills/splunk.svg'
  },
  {
    name: 'OpsGenie',
    logoUrl: '/skills/opsgenie.svg'
  },
  {
    name: 'Catchpoint',
    logoUrl: '/skills/catchpoint.svg'
  }]

}];

/* ======================================================
   SKILL CARD
====================================================== */
const SkillCard = ({ skill }: {skill: Skill;}) => {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -6
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="
        group relative flex flex-col items-center justify-center
        p-6 rounded-xl bg-[#111427]
        border border-white/5
        hover:border-cyan-500/30
        hover:shadow-[0_0_24px_rgba(6,182,212,0.15)]
        transition-all
      ">








      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 h-14 w-14 mb-4 flex items-center justify-center">
        {!imgError ?
        <img
          src={skill.logoUrl}
          alt={skill.name}
          loading="lazy"
          onError={() => setImgError(true)}
          className="h-full w-full object-contain drop-shadow-lg group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.6)] transition-all" /> :


        <div className="h-12 w-12 rounded-full bg-cyan-900/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-lg">
            {skill.name.charAt(0)}
          </div>
        }
      </div>

      <span className="relative z-10 text-sm font-mono text-gray-400 group-hover:text-cyan-100">
        {skill.name}
      </span>
    </motion.div>);

};
/* ======================================================
   CATEGORY SECTION
====================================================== */
const CategorySection = ({
  category,
  index



}: {category: Category;index: number;}) => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 24
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        margin: '-60px'
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.08
      }}
      className="mb-16">

      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <category.icon className="w-5 h-5 text-emerald-400" />
        <h2 className="text-xl md:text-2xl font-mono font-bold text-gray-200">
          <span className="text-cyan-500 mr-2">~/</span>
          {category.title}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
        {category.skills.map((skill) =>
        <SkillCard key={skill.name} skill={skill} />
        )}
      </div>
    </motion.section>);

};
/* ======================================================
   MAIN COMPONENT
====================================================== */
export default function InfrastructureSkills() {
  return (
    <div className="relative w-full text-gray-300 overflow-visible">
      {/* Decorative elements constrained to this container, but positioned absolutely */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#1a2035 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />


      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-7xl mr-auto">
        <motion.header
          initial={{
            opacity: 0,
            y: -18
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.7
          }}
          className="mb-20">

          <StatusBadge
            label="system_status: online"
            status="active"
            className="mb-8" />


          <TerminalHeader text="skills" />

          <p className="mt-6 text-lg text-gray-400 max-w-2xl leading-relaxed">
            Technologies I use to build, deploy, and manage infrastructure.
          </p>
        </motion.header>

        {SKILL_CATEGORIES.map((category, index) =>
        <CategorySection
          key={category.id}
          category={category}
          index={index} />

        )}

        <motion.div
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          viewport={{
            once: true
          }}
          className="mt-24 pt-8 border-t border-white/10 font-mono text-sm text-gray-600 flex items-center gap-2">

          <Terminal className="w-4 h-4" />
          <span>echo "Ready to deploy."</span>
          <span className="w-2 h-4 bg-cyan-500/50 animate-pulse" />
        </motion.div>
      </div>
    </div>);

}