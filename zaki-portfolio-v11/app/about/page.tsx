// app/about/page.tsx
import React from 'react';
import { AboutSection } from '../../components/about/AboutSection';

export function AboutPage() {
  return (
    <main className="relative w-full min-h-screen">
      <div className="pl-[96px] pt-28">
        <AboutSection />
      </div>
    </main>
  );
}
