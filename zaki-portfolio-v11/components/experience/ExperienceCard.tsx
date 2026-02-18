"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";

export interface ExperienceData {
  role: string;
  company: string;
  date: string;
  description: string;
  logo: string;
  skills?: string[];
}

interface ExperienceCardProps {
  data: ExperienceData;
  index: number;
}

export function ExperienceCard({ data, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative w-full max-w-3xl mb-16 last:mb-0"
    >
      {/* Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />

      <div className="relative bg-[#0a1020] border border-white/5 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.05)]">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Logo Column */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-xl bg-white border border-white/20 flex items-center justify-center p-2 shadow-innerw-16 h-16 rounded-xl bg-white border border-white/20 flex items-center justify-center overflow-hidden">
              <img
                src={data.logo}
                alt={data.company}
                className="w-[85%] h-[85%] object-contain scale-150"
              />
            </div>

            <div className="mt-4 hidden md:flex flex-col items-center">
              <div className="w-px h-8 bg-gradient-to-b from-white/10 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
                  {data.date}
                </span>

                <h3 className="text-2xl font-bold text-white mt-1">
                  {data.company}
                </h3>

                <p className="text-lg text-white/70 font-medium mt-1">
                  {data.role}
                </p>
              </div>

              <ArrowUpRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition" />
            </div>

            <p className="text-white/60 leading-relaxed mb-6 font-light">
              {data.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/5 text-xs font-mono text-cyan-200/70"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Terminal Icon */}
        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
          <Terminal className="w-24 h-24 text-white/5 -rotate-12 translate-x-8 -translate-y-8" />
        </div>
      </div>
    </motion.div>
  );
}
