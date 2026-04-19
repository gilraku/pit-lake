'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: '◈' },
  { href: '/sites',     label: 'Sites',     icon: '⊞' },
  { href: '/assess/new',label: 'Assess',    icon: '+' },
  { href: '/compare',   label: 'Compare',   icon: '⊟' },
  { href: '/map',       label: 'Map',       icon: '◉' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {NAV.map(({ href, label, icon }) => {
        const active = pathname === href || (href !== '/assess/new' && pathname.startsWith(href + '/'));
        const isAction = href === '/assess/new';
        return (
          <Link key={href} href={href} className={`bottom-nav-item${active ? ' active' : ''}${isAction ? ' action' : ''}`}>
            <span className="bottom-nav-icon">{icon}</span>
            <span className="bottom-nav-label">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
