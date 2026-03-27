'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/Button';

interface NavbarProps {
  onLogout: () => void;
}

export function Navbar({ onLogout }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-white hover:text-white/90 transition-colors">
            GooseKit
          </Link>
          <span className="text-xs text-white/30 hidden sm:inline">Website Builder</span>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/dashboard"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              pathname === '/dashboard'
                ? 'text-[#00d4aa] bg-[#00d4aa]/10'
                : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
            }`}
          >
            Builder
          </Link>
          <Link
            href="/dashboard/settings"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              pathname === '/dashboard/settings'
                ? 'text-[#00d4aa] bg-[#00d4aa]/10'
                : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
            }`}
          >
            Settings
          </Link>
          <div className="w-px h-4 bg-white/[0.08] mx-1" />
          <Button variant="ghost" onClick={onLogout} className="text-xs">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
