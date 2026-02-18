import React from 'react';
import { ExperienceContent } from '../../components/experience/ExperienceContent';
export function ExperiencePage() {
  return (
    <main className="relative w-full min-h-screen">
      {/*
           Global Layout Wrapper:
           - pl-[96px]: 72px sidebar + 24px gap
           - pt-28: Standard top padding for pages
           - pb-20: Bottom padding for scroll space
         */}
      <div className="pl-[96px] pt-28 pb-20 pr-8">
        <ExperienceContent />
      </div>
    </main>);

}
