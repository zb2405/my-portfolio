// app/about/page.tsx
import React from 'react';
import { AboutSection } from '../../components/about/AboutSection';

export function AboutPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <div className="pl-[96px] pt-28 h-full flex flex-col">
        <AboutSection />
      </div>
    </main>
  );
}
