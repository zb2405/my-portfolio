import React from 'react';
import { motion } from 'framer-motion';
interface StatusBadgeProps {
  label: string;
  status?: 'active' | 'inactive' | 'warning';
  className?: string;
}
export function StatusBadge({
  label,
  status = 'active',
  className = ''
}: StatusBadgeProps) {
  const statusColors = {
    active: {
      dot: 'bg-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/5',
      text: 'text-emerald-400',
      glow: 'shadow-[0_0_8px_rgba(52,211,153,0.3)]'
    },
    inactive: {
      dot: 'bg-gray-500',
      border: 'border-gray-500/30',
      bg: 'bg-gray-500/5',
      text: 'text-gray-400',
      glow: ''
    },
    warning: {
      dot: 'bg-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/5',
      text: 'text-amber-400',
      glow: 'shadow-[0_0_8px_rgba(251,191,36,0.3)]'
    }
  };
  const colors = statusColors[status];
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -8
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4
      }}
      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border ${colors.border} ${colors.bg} ${className}`}>

      <span className="relative flex h-2 w-2">
        {status === 'active' &&
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.dot} opacity-40`} />

        }
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${colors.dot} ${colors.glow}`} />

      </span>
      <span className={`text-xs font-mono tracking-wider ${colors.text}`}>
        {label}
      </span>
    </motion.div>);

}