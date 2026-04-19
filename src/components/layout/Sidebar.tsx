'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: '◈' },
  { href: '/sites',     label: 'Sites',     icon: '⊞' },
  { href: '/compare',   label: 'Compare',   icon: '⊟' },
  { href: '/map',       label: 'Map',       icon: '◉' },
];

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={className} style={{
      minHeight: '100vh',
      background: 'var(--surface)',
      borderRight: '1px solid var(--line)',
      flexDirection: 'column',
      padding: '24px 0',
      flexShrink: 0,
    }}>
      <div style={{ padding: '0 20px 24px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20, color: 'var(--primary)', fontWeight: 400 }}>
          PIT Lake
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Score Index
        </div>
      </div>

      <nav style={{ padding: '16px 12px', flex: 1 }}>
        {NAV.map(({ href, label, icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link key={href} href={href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 'var(--radius)',
              marginBottom: 2,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: active ? 600 : 400,
              color: active ? 'var(--primary)' : 'var(--ink-2)',
              background: active ? 'color-mix(in oklab, var(--primary) 8%, var(--surface))' : 'transparent',
            }}>
              <span style={{ fontSize: 16, opacity: 0.7 }}>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--line)' }}>
        <Link href="/assess/new" style={{
          display: 'block',
          textAlign: 'center',
          padding: '9px 16px',
          borderRadius: 'var(--radius)',
          background: 'var(--primary)',
          color: 'var(--primary-ink)',
          textDecoration: 'none',
          fontSize: 13,
          fontWeight: 600,
        }}>
          + New Assessment
        </Link>
      </div>
    </aside>
  );
}
