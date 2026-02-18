import React from 'react';
interface TerminalHeadingProps {
  prefix?: string;
  text: string;
  className?: string;
}
export function TerminalHeading({
  prefix = '~/',
  text,
  className = ''
}: TerminalHeadingProps) {
  return (
    <h1
      className={`font-mono font-bold text-white flex items-center ${className}`}>

      <span className="text-teal-400 mr-1 opacity-80">{prefix}</span>
      <span className="relative">
        {text}
        <span className="inline-block w-[0.6em] h-[1.2em] bg-teal-400 ml-1 align-middle animate-blink shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
      </span>
    </h1>);

}