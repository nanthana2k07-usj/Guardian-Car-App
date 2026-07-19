import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  animated?: boolean;
}

export function Logo({ className, size = 40, showText = true, animated = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        className="shrink-0 drop-shadow-[0_4px_16px_rgba(59,130,246,0.45)]"
      >
        <defs>
          <linearGradient id="logoG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <motion.path
          d="M32 6l20 6.6v15.4c0 13.2-8.8 22-20 26.4C20.8 50 12 41.2 12 28V12.6z"
          fill="url(#logoG)"
          fillOpacity="0.15"
          stroke="url(#logoG)"
          strokeWidth="2.2"
          initial={animated ? { pathLength: 0 } : false}
          animate={animated ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {/* AI circuit node */}
        <motion.g
          initial={animated ? { opacity: 0 } : false}
          animate={animated ? { opacity: 1 } : undefined}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <circle cx="32" cy="21" r="2.4" fill="#fff" />
          <path d="M32 23.4v4.6M26 26.5h12M28 20h-4M40 20h-4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
        </motion.g>
        {/* car silhouette */}
        <motion.g
          initial={animated ? { y: 6, opacity: 0 } : false}
          animate={animated ? { y: 0, opacity: 1 } : undefined}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <path d="M19 40c1.2-5.2 3.2-8 5.6-9.2h14.8c2.4 1.2 4.4 4 5.6 9.2" fill="none" stroke="url(#logoG)" strokeWidth="2.4" strokeLinecap="round" />
          <rect x="20" y="39" width="24" height="7.5" rx="3.2" fill="url(#logoG)" />
          <circle cx="26" cy="47.5" r="2.6" fill="#0B1120" />
          <circle cx="38" cy="47.5" r="2.6" fill="#0B1120" />
        </motion.g>
      </svg>
      {showText && (
        <span className="font-display text-lg font-bold tracking-tight">
          Guardian<span className="text-gradient">Car</span>
        </span>
      )}
    </div>
  );
}
