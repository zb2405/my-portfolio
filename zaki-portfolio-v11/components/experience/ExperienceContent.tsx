import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceTimeline } from './ExperienceTimeline';
import { TerminalHeader } from '../ui/TerminalHeader';
import { StatusBadge } from '../ui/StatusBadge';
export function ExperienceContent() {
  return (
    <div className="relative z-10 w-full max-w-7xl ml-0 mr-auto">
      {/* Header Section */}
      <div className="mb-20">
        <motion.div
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6
          }}
          className="flex flex-col items-start gap-6">

          <StatusBadge label="career_pipeline: active" status="active" />

          <div className="space-y-4">
            <TerminalHeader text="experience" />

            <motion.p
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.4,
                duration: 0.8
              }}
              className="text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed">

              The deployment history of a systems engineer.
              <span className="text-cyan-400/70 block mt-2 font-mono text-sm">
                // tracing execution from initialization to production
              </span>
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <ExperienceTimeline />

      {/* Footer / End of Log */}
      <motion.div
        initial={{
          opacity: 0
        }}
        whileInView={{
          opacity: 1
        }}
        viewport={{
          once: true
        }}
        className="mt-12 ml-16 md:ml-20 flex items-center gap-4">

        <div className="h-px w-12 bg-white/10" />
        <span className="font-mono text-xs text-white/30 uppercase tracking-widest">
          End of log
        </span>
      </motion.div>
    </div>);

}