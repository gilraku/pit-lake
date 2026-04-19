'use client';

import { usePitStore } from '@/store/usePitStore';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  const { theme, toggleTheme } = usePitStore();

  return (
    <header style={{
      height: 60,
      background: 'var(--surface)',
      borderBottom: '1px solid var(--line)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      flexShrink: 0,
    }}>
      <div>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{title}</span>
        {subtitle && (
          <span className="topbar-subtitle" style={{ fontSize: 13, color: 'var(--muted)', marginLeft: 12 }}>{subtitle}</span>
        )}
      </div>
      <button
        onClick={toggleTheme}
        style={{
          background: 'var(--paper-2)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius)',
          padding: '5px 12px',
          cursor: 'pointer',
          fontSize: 12,
          color: 'var(--muted)',
        }}
      >
        {theme === 'light' ? '◑ Dark' : '◐ Light'}
      </button>
    </header>
  );
}
