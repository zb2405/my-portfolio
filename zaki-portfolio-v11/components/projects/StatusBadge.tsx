import React from 'react';
interface StatusBadgeProps {
  label: string;
  status?: 'online' | 'offline' | 'maintenance' | 'building';
  className?: string;
}
export function StatusBadge({
  label,
  status = 'online',
  className = ''
}: StatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]';
      case 'offline':
        return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
      case 'maintenance':
        return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]';
      case 'building':
        return 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]';
      default:
        return 'bg-gray-500';
    }
  };
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 backdrop-blur-sm ${className}`}>

      <span
        className={`w-2 h-2 rounded-full mr-2 ${getStatusColor()} animate-pulse`} />

      <span className="text-xs font-mono text-slate-300 tracking-wider uppercase">
        {label}
      </span>
    </div>);

}