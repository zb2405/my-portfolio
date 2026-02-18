import React from 'react';
interface StatusBadgeProps {
  label: string;
  status?: 'active' | 'loading' | 'error' | 'idle';
  className?: string;
}
export function StatusBadge({
  label,
  status = 'active',
  className = ''
}: StatusBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                    bg-white/5 border border-white/10 text-xs font-mono 
                    text-cyan-400 backdrop-blur-sm ${className}`}>

      <span
        className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-emerald-500 animate-pulse' : status === 'loading' ? 'bg-yellow-500 animate-pulse' : status === 'error' ? 'bg-red-500' : 'bg-slate-500'}`} />

      {label}
    </div>);

}