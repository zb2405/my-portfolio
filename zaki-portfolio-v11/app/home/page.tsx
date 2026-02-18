import React from 'react';
import Hero from '../../components/Hero';
import Terminal from '../../components/Terminal/Terminal';
export function HomePage() {
  return (
    <main className="flex min-h-screen items-center">
      {/*
           Content Layout:
           - pl-[96px]: 72px sidebar + 24px gap
           - pr-[420px]: Space for fixed terminal
         */}
      <div className="flex-1 pl-[96px] pr-[420px]">
        <Hero />
      </div>

      {/* Fixed Terminal Position */}
      <div className="fixed right-0 top-0 h-full w-[400px]">
        <Terminal />
      </div>
    </main>);

}
