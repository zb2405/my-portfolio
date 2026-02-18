import React from 'react';
import { motion } from 'framer-motion';
interface TerminalHeaderProps {
  text: string;
  className?: string;
}
export function TerminalHeader({ text, className = '' }: TerminalHeaderProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -16
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      transition={{
        duration: 0.5,
        delay: 0.08
      }}
      className={`flex items-center gap-4 ${className}`}>

      <span
        className="text-cyan-500 font-mono text-2xl select-none"
        aria-hidden="true">

        ~/
      </span>
      <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
        {text}
      </h1>
      <motion.span
        animate={{
          opacity: [1, 0, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'steps(2)'
        }}
        className="inline-block w-[3px] h-12 bg-cyan-400 rounded-sm ml-1"
        aria-hidden="true" />

    </motion.div>);

}