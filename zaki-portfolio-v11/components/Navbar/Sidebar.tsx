import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Briefcase,
  Layers,
  Github,
  Linkedin,
  Wrench,
} from "lucide-react";

/* =====================================================
   NAV ITEMS
===================================================== */

const navItems = [
  { href: "/", label: "HOME", icon: Home },
  { href: "/about", label: "ABOUT", icon: User },
  { href: "/skills", label: "SKILLS", icon: Wrench },
  { href: "/experience", label: "EXPERIENCE", icon: Briefcase },
  { href: "/projects", label: "PROJECTS", icon: Layers },
];

const socials = [
  { href: "https://github.com/zb2405", label: "GITHUB", icon: Github },
  {
    href: "https://www.linkedin.com/in/zaki-bawade",
    label: "LINKEDIN",
    icon: Linkedin,
  },
];

/* =====================================================
   SIDEBAR
===================================================== */

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside
      className="fixed left-0 top-0 z-50 h-screen w-[72px]
                 bg-gradient-to-b from-black via-zinc-950 to-black
                 border-r border-white/5
                 flex flex-col items-center"
    >
      {/* VISITOR BADGE */}
      <div className="pt-6 pb-8">
        <VisitorMetric />
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-6 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || (pathname === "/" && href === "/");

          return (
            <Link
              key={label}
              to={href}
              className="group relative flex items-center justify-center
                         w-12 h-12 rounded-xl
                         text-zinc-500
                         focus:outline-none focus-visible:ring-2
                         focus-visible:ring-cyan-400/60"
            >
              {/* ICON */}
              <div
                className={`relative z-10 flex items-center justify-center
                            w-10 h-10 rounded-lg
                            transition-all duration-300 ease-in-out
                            ${
                              isActive
                                ? "text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.6)] animate-pulse"
                                : "group-hover:text-cyan-300 group-hover:shadow-[0_0_16px_rgba(34,211,238,0.45)]"
                            }`}
              >
                <Icon size={20} strokeWidth={1.8} />
              </div>

              {/* LABEL */}
              <span
                className="pointer-events-none absolute left-full ml-3
                           px-3 py-1 rounded-md
                           bg-black/80 backdrop-blur-md
                           text-xs tracking-widest text-cyan-200
                           opacity-0 translate-x-[-6px]
                           transition-all duration-300 ease-in-out
                           group-hover:opacity-100 group-hover:translate-x-0
                           group-focus-visible:opacity-100 group-focus-visible:translate-x-0
                           shadow-[0_0_20px_rgba(34,211,238,0.35)]"
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* SOCIALS */}
      <div className="pb-6 flex flex-col gap-5">
        {socials.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center
                       w-12 h-12 rounded-xl
                       text-zinc-500
                       focus:outline-none focus-visible:ring-2
                       focus-visible:ring-cyan-400/60"
          >
            <div
              className="relative z-10 flex items-center justify-center
                         w-10 h-10 rounded-lg
                         transition-all duration-300 ease-in-out
                         group-hover:text-cyan-300
                         group-hover:shadow-[0_0_16px_rgba(34,211,238,0.45)]"
            >
              <Icon size={18} strokeWidth={1.8} />
            </div>

            <span
              className="pointer-events-none absolute left-full ml-3
                         px-3 py-1 rounded-md
                         bg-black/80 backdrop-blur-md
                         text-xs tracking-widest text-cyan-200
                         opacity-0 translate-x-[-6px]
                         transition-all duration-300 ease-in-out
                         group-hover:opacity-100 group-hover:translate-x-0
                         shadow-[0_0_20px_rgba(34,211,238,0.35)]"
            >
              {label}
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
}

/* =====================================================
   VISITOR METRIC (UMAMI via nginx cache)
===================================================== */

function VisitorMetric() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadVisitors() {
      try {
        const res = await fetch("/api/visitors", {
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        if (!res.ok) throw new Error("bad response");

        const data = await res.json();


        const value =
          typeof data?.pageviews === "number" ? data.pageviews : 0;

        if (mounted) setCount(value);
      } catch {
        if (mounted) setCount(0);
      }
    }

    loadVisitors();

    
    const interval = setInterval(loadVisitors, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center gap-1
                 px-3 py-2 rounded-lg
                 bg-black/50 backdrop-blur-sm
                 border border-white/5
                 transition-shadow duration-300
                 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)]"
    >
      <span className="text-[15px] font-medium text-cyan-300 leading-none">
        {count !== null ? (count / 1000).toFixed(1) + "K" : "--"}
      </span>

      <span className="text-[9px] tracking-[0.2em] text-zinc-400 uppercase">
        Views
      </span>
    </div>
  );
}
