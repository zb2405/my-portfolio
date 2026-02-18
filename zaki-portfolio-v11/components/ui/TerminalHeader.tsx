import React from 'react';
import { motion } from 'framer-motion';
interface TerminalHeaderProps {
  text: string;
  prefix?: string;
  className?: string;
}
export function TerminalHeader({
  text,
  prefix = '~/',
  className = ''
}: TerminalHeaderProps) {
  return (
    <motion.h1
      initial={{
        opacity: 0,
        y: -18
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.6
      }}
      className={`text-5xl md:text-6xl lg:text-7xl font-bold font-mono text-white tracking-tight ${className}`}>

      <span className="text-cyan-500">{prefix}</span>
      {text}
      <span className="ml-2 text-emerald-500 animate-pulse">_</span>
    </motion.h1>);

}