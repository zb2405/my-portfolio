import React, { useEffect, useState } from 'react';
/**
 * EXACT TEXT — unchanged
 */
const TEXT = [
'Hi. I’m Zaki.',
'',
'I am a Linux admin who builds infrastructure that doesn’t need babysitting.',
'I automate what repeats.',
'I monitor what matters.',
'I make dashboards tell the truth.',
'',
'Reliability starts long before incidents do.'];

export default function Hero() {
  const [visible, setVisible] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  /**
   * FLOW REVEAL — animation unchanged
   */
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= TEXT.length) {
        clearInterval(interval);
        setTimeout(() => {
          setShowCTA(true);
        }, 320);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);
  return (
    <section
      className="
        w-full
        min-h-[80vh]
        flex items-center
        justify-start
        px-8
      ">







      {/* SINGLE EDITORIAL COLUMN */}
      <div className="w-full max-w-[72ch]">
        {TEXT.map((line, i) => {
          const isTitle = i === 0;
          const isIntro = i === 2;
          const isClosing = i === 7;
          const isSpacer = line === '';
          if (isSpacer) return <div key={i} className="h-8" />;
          const baseAnimation = `
            transition-all
            duration-[720ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${i < visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
          `;
          /** ---------------- HEADLINE ---------------- */
          if (isTitle) {
            return (
              <h1
                key={i}
                className={`
                  text-[clamp(56px,6vw,84px)]
                  leading-[1.05]
                  tracking-tight
                  font-semibold
                  text-white
                  ${baseAnimation}
                `}>

                {line}
              </h1>);

          }
          /** ---------------- FINAL MANIFESTO LINE ---------------- */
          if (isClosing) {
            return (
              <p
                key={i}
                className={`
                  mt-10
                  text-[clamp(20px,1.4vw,24px)]
                  leading-[1.6]
                  font-medium
                  text-cyan-100
                  ${baseAnimation}
                `}>

                {line}
              </p>);

          }
          /** ---------------- BODY FLOW ---------------- */
          return (
            <p
              key={i}
              className={`
                ${isIntro ? 'mt-8' : 'mt-[18px]'}
                text-[clamp(18px,1.3vw,22px)]
                leading-[1.6]
                font-medium
                text-gray-300
                ${baseAnimation}
              `}>

              {line}
            </p>);

        })}

        {/* ===============================
             CTA BUTTON GROUP
          =============================== */}

        <div
          className={`
            mt-14
            flex items-center gap-6
            transition-all
            duration-[900ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>

          {/* PRIMARY */}
          <a
          href="mailto:bawadezaki@gmail.com"
          className="
            px-10 py-4
            rounded-xl
            text-lg
            font-medium
            text-black
            bg-cyan-400/90
            backdrop-blur-xl
            shadow-[0_12px_32px_rgba(56,189,248,0.25)]
            transition-all duration-300
            ease-[cubic-bezier(0.22,1,0.36,1)]
            delay-[120ms]
            hover:-translate-y-[2px]
            hover:shadow-[0_18px_46px_rgba(56,189,248,0.35)]
            hover:bg-cyan-300
          "
        >
          Contact Me
        </a>

          {/* SECONDARY */}
          <a
            href="/public/pdfs/resume.pdf"
            className="
              px-10 py-4
              rounded-xl
              text-lg
              font-medium
              text-cyan-100
              border border-cyan-400/50
              backdrop-blur-xl

              transition-all
              duration-300
              ease-[cubic-bezier(0.22,1,0.36,1)]
              delay-[120ms]

              hover:-translate-y-[2px]
              hover:bg-cyan-400/10
              hover:shadow-[0_14px_36px_rgba(56,189,248,0.28)]
            ">


















            View Resume
          </a>
        </div>
      </div>
    </section>);

}