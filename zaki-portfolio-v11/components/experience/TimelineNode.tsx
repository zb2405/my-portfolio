import React, { useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent } from
'framer-motion';
interface TimelineNodeProps {
  isLast: boolean;
  isActive?: boolean;
  index: number;
}
export function TimelineNode({ isLast, index }: TimelineNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(false);
  // Track when the node reaches the viewport center
  const { scrollYProgress: nodeProgress } = useScroll({
    target: nodeRef,
    offset: ['start center', 'center center']
  });
  // Once the node hits center, mark it as reached (stays lit)
  useMotionValueEvent(nodeProgress, 'change', (v) => {
    if (v >= 0.95 && !reached) setReached(true);
  });
  // Line scroll tracking
  const { scrollYProgress: lineProgress } = useScroll({
    target: lineRef,
    offset: ['start center', 'end center']
  });
  const lineScaleY = useTransform(lineProgress, [0, 1], [0, 1]);
  const lineOpacity = useTransform(lineProgress, [0, 0.1, 1], [0, 1, 1]);
  return (
    <div
      ref={nodeRef}
      className="flex flex-col items-center h-full mr-8 md:mr-12 relative">

      {/* Node Circle */}
      <motion.div
        initial={{
          scale: 0,
          opacity: 0
        }}
        whileInView={{
          scale: 1,
          opacity: 1
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.2
        }}
        className="relative z-10 flex items-center justify-center w-4 h-4">

        {/* Dot — transitions from dim to illuminated and stays */}
        <motion.div
          animate={
          reached ?
          {
            borderColor: 'rgba(34, 211, 238, 1)',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
            scale: 1
          } :
          {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            boxShadow: '0 0 0px rgba(34, 211, 238, 0)',
            scale: 0.85
          }
          }
          transition={{
            duration: 0.4,
            ease: 'easeOut'
          }}
          className="w-3 h-3 rounded-full bg-[#060b18] border-2" />


        {/* Persistent pulse ring once reached */}
        {reached &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          className="absolute w-3 h-3">

            <motion.div
            animate={{
              scale: [1, 2.5],
              opacity: [0.4, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            className="w-full h-full rounded-full bg-cyan-400/30" />

          </motion.div>
        }
      </motion.div>

      {/* Scroll-driven Connecting Line */}
      {!isLast &&
      <div ref={lineRef} className="flex-grow my-2 w-px relative">
          <div className="absolute inset-0 bg-white/[0.04]" />
          <motion.div
          style={{
            scaleY: lineScaleY,
            opacity: lineOpacity,
            transformOrigin: 'top'
          }}
          className="absolute inset-0 bg-gradient-to-b from-cyan-500/50 to-cyan-500/10" />

        </div>
      }
    </div>);

}