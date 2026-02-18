// app/about/page.tsx
import React from 'react';
import { AboutSection } from '../../components/about/AboutSection';

export default function AboutPage() {
  return (
    <main className="relative w-full min-h-screen">
      {/*
        Global Layout Wrapper:
        - pl-[96px]: 72px sidebar + 24px gap
        - pt-28: Standard top padding for pages
      */}
      <div className="pl-[96px] pt-28">
        <AboutSection />
      </div>
    </main>
  );
}
