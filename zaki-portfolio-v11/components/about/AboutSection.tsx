import React, { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Coffee, Code, Server } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { TerminalHeader } from '../ui/TerminalHeader';
/* ======================================================
   DATA
====================================================== */
type TimelineItem = {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
};
const TIMELINE_DATA: TimelineItem[] = [
{
  id: 'curiosity',
  title: 'How It Started — Curiosity Before Career',
  icon: Terminal,
  content:
  <>
        <p className="mb-4">
          My relationship with technology started long before it became work.
          While most people used the internet, I was the kid wondering why it
          worked at all.
        </p>
        <p>
          I went down rabbit holes reading about early networking, tweaking
          routers just to see what would happen, and learning that one small
          change could bring everything down. That curiosity never really left.
          Eventually it grew into a career built around Linux, infrastructure,
          and understanding how systems behave.
        </p>
      </>

},
{
  id: 'prevent',
  title: 'Learning to Prevent, Not Just Fix',
  icon: Server,
  content:
  <>
        <p className="mb-4">
          Somewhere along the way I realized I didn’t enjoy firefighting as much
          as preventing the fire in the first place.
        </p>
        <p className="mb-4">
          I started writing scripts for repetitive tasks, refining workflows
          that slowed teams down, and building dashboards that reflected what
          was actually happening instead of just looking impressive.
        </p>
        <p>
          Automation and monitoring stopped feeling like items on a checklist
          and became part of how I approach problems day to day. The focus
          shifted toward building systems that stay predictable rather than
          reacting when things fall apart.
        </p>
      </>

},
{
  id: 'infrastructure',
  title: 'What Good Infrastructure Feels Like',
  icon: Code,
  content:
  <>
        <p className="mb-4">
          I’ve learned that good infrastructure doesn’t try to be impressive. It
          just needs to make sense.
        </p>
        <p>
          I care about setups that are easy to understand months later,
          automation that solves real problems, and engineering decisions that
          hold up over time. When things are built well, nobody talks about them
          — they just work quietly in the background.
        </p>
      </>

},
{
  id: 'life',
  title: 'Life Outside the Terminal',
  icon: Coffee,
  content:
  <>
        <p className="mb-4">
          Outside of all that, life stays pretty grounded. I’m usually somewhere
          between a long walk, a late-night electronic music festival, and
          convincing friends to try a new restaurant I’ve just discovered.
        </p>
        <p className="mb-4">
          I’ve been getting more consistent with the gym lately — nothing
          intense, just trying to be a slightly healthier version of myself.
        </p>
        <p>
          I cook once in a while, mostly for people I love, and I’m always up
          for board games or a quiet Netflix night. When I’m not doing any of
          that, I’m probably rebuilding my own infrastructure. I run a Proxmox
          lab, added AdGuard to keep my network clean, built my own GitHub
          runner using Infrastructure as Code, and yes — this website runs on
          that same homelab setup. It’s my version of relaxing.
        </p>
      </>

}];

/* ======================================================
   ABOUT SECTION
====================================================== */
export default function AboutSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  /* --------------------------------------------------
     SNAP ENGINE — ACTIVE CARD DETECTION
  -------------------------------------------------- */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const center = container.scrollTop + container.clientHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      sectionRefs.current.forEach((el, index) => {
        if (!el) return;
        const elCenter = el.offsetTop + el.clientHeight / 2;
        const distance = Math.abs(center - elCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveStep(closestIndex);
    };
    container.addEventListener('scroll', handleScroll, {
      passive: true
    });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);
  /* --------------------------------------------------
     SCROLL TO SECTION
  -------------------------------------------------- */
  const scrollToSection = useCallback((index: number) => {
    const el = sectionRefs.current[index];
    if (!el) return;
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }, []);
  /* ======================================================
     LAYOUT
  ====================================================== */
  return (
    <div className="relative w-full min-h-screen">
      {/* ======================================================
            CREATIVE ABOUT HEADER
         ====================================================== */}

      {/* Removed ml-[120px] to use global layout instead */}
      <div className="relative z-20 w-full max-w-6xl pr-6">
        {/* SYSTEM TAG */}
        <StatusBadge
          label="identity_profile: loaded"
          status="active"
          className="mb-8" />


        {/* MAIN TITLE */}
        <TerminalHeader text="about_me" />

        {/* SUBTITLE */}
        <motion.p
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            delay: 0.15
          }}
          className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">

          The story of the person behind the terminal
        </motion.p>
      </div>

      {/* ======================================================
             LEFT TIMELINE NAV
         ====================================================== */}

      {/* Adjusted left position to account for new layout: 72px sidebar + 24px gap = 96px */}
      <div className="hidden md:flex fixed left-[96px] top-1/2 -translate-y-1/2 z-[60] flex-col items-start">
        {TIMELINE_DATA.map((item, index) =>
        <button
          key={item.id}
          onClick={() => scrollToSection(index)}
          className="relative flex items-center mb-12 last:mb-0 group transition-all duration-500">

            <div
            className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500
              ${activeStep === index ? 'bg-cyan-500/20 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-110' : index < activeStep ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-[#0b0d1a] border-white/10'}`}>

              <div
              className={`w-2.5 h-2.5 rounded-full ${activeStep === index ? 'bg-cyan-400' : index < activeStep ? 'bg-emerald-500' : 'bg-white/20'}`} />

            </div>

            <div
            className={`ml-5 whitespace-nowrap transition-all duration-300
              ${activeStep === index ? 'opacity-100 translate-x-0' : 'opacity-0 group-hover:opacity-70 -translate-x-2 group-hover:translate-x-0'}`}>

              <span className="text-xs font-mono text-cyan-400 block">
                0{index + 1}_
              </span>
              <span className="text-sm font-semibold text-white">
                {item.title}
              </span>
            </div>
          </button>
        )}
      </div>

      {/* ======================================================
             SNAP SCROLL CONTAINER
         ====================================================== */}

      <div
        ref={containerRef}
        className="
          h-auto
          overflow-visible
          snap-y snap-mandatory
          scroll-smooth
        ">






        {/* BIGGER WIDTH + CENTERED */}
        {/* Adjusted padding to align with new layout: pl-[180px] -> pl-[140px] relative to container */}
        <div className="w-full max-w-5xl mx-auto pl-[140px] pr-16">
          {TIMELINE_DATA.map((item, index) =>
          <section
            key={item.id}
            ref={(el) => sectionRefs.current[index] = el}
            className="
                snap-start
                min-h-[85vh]      // 👈 smaller height pulls cards upward
                flex
                items-start       // 👈 aligns card toward top instead of center
                pt-14            // 👈 fine-tune vertical position (adjust 6–16)
              ">







              <motion.div
              initial={{
                opacity: 0,
                scale: 0.96
              }}
              animate={{
                opacity: activeStep === index ? 1 : 0.4,
                scale: activeStep === index ? 1 : 0.96
              }}
              transition={{
                duration: 0.5
              }}
              className={`
                  relative w-full p-14 rounded-2xl border transition-all duration-700
                  ${activeStep === index ? 'bg-[#111427] border-cyan-500/20 shadow-[0_0_60px_rgba(6,182,212,0.08)]' : 'bg-[#111427]/40 border-white/5'}
                `}>

                <div className="flex items-center gap-5 mb-10">
                  <div
                  className={`p-4 rounded-xl ${activeStep === index ? 'bg-cyan-500/10 text-cyan-400' : 'bg-white/5 text-gray-500'}`}>

                    <item.icon className="w-7 h-7" />
                  </div>

                  <h2 className="text-4xl font-bold text-white">
                    {item.title}
                  </h2>
                </div>

                <div className="text-xl text-gray-400 leading-relaxed">
                  {item.content}
                </div>

                <AnimatePresence>
                  {activeStep === index &&
                <motion.div
                  className="absolute bottom-6 right-6"
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1
                  }}
                  exit={{
                    opacity: 0
                  }}>

                      <motion.div
                    animate={{
                      opacity: [0.2, 0.8, 0.2]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.4
                    }}
                    className="w-3 h-6 bg-cyan-500/40 rounded-sm" />

                    </motion.div>
                }
                </AnimatePresence>
              </motion.div>
            </section>
          )}
        </div>
      </div>
    </div>);

}