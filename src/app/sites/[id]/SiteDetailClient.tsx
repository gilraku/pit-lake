'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePitStore } from '@/store/usePitStore';
import { PitSite } from '@/types';
import { pitRepository } from '@/lib/repositories';
import TopBar from '@/components/layout/TopBar';
import GaugeCard from '@/components/detail/GaugeCard';
import CategoryBreakdown from '@/components/detail/CategoryBreakdown';
import Chip from '@/components/ui/Chip';

interface Props {
  paramsPromise: Promise<{ id: string }>;
}

export default function SiteDetailClient({ paramsPromise }: Props) {
  const { id } = use(paramsPromise);
  const router = useRouter();
  const { deletePit } = usePitStore();
  const [pit, setPit] = useState<PitSite | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    pitRepository.getById(id).then(p => {
      if (p) setPit(p);
      else setNotFound(true);
    });
  }, [id]);

  async function handleDelete() {
    if (!pit) return;
    await deletePit(pit.id);
    router.push('/sites');
  }

  if (notFound) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <TopBar title="Site not found" />
        <main style={{ padding: 32, color: 'var(--muted)' }}>
          <Link href="/sites" style={{ color: 'var(--primary)' }}>← Back to sites</Link>
        </main>
      </div>
    );
  }

  if (!pit) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <TopBar title={pit.pitName} subtitle={pit.regency} />
      <main style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 32, color: 'var(--ink)',
            }}>{pit.pitName}</span>
            <Chip rating={pit.rating} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href={`/sites/${pit.id}/edit`} style={{
              padding: '8px 18px', borderRadius: 'var(--radius)',
              background: 'var(--paper-2)', border: '1px solid var(--line)',
              textDecoration: 'none', fontSize: 13, fontWeight: 500, color: 'var(--ink)',
            }}>
              Edit
            </Link>
            <button
              onClick={() => setConfirmDelete(true)}
              style={{
                padding: '8px 18px', borderRadius: 'var(--radius)',
                background: 'color-mix(in oklab, var(--sc-vp) 10%, var(--surface))',
                border: '1px solid var(--sc-vp)', cursor: 'pointer',
                fontSize: 13, fontWeight: 500, color: 'var(--sc-vp)',
              }}
            >
              Delete
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
          <span><b style={{ color: 'var(--ink)' }}>Company:</b> {pit.companyName}</span>
          <span><b style={{ color: 'var(--ink)' }}>Period:</b> {pit.assessmentPeriod}</span>
          <span><b style={{ color: 'var(--ink)' }}>Regency:</b> {pit.regency}</span>
          {pit.locationCoordinate && (
            <span><b style={{ color: 'var(--ink)' }}>Coords:</b> {pit.locationCoordinate}</span>
          )}
        </div>

        <GaugeCard pit={pit} />
        <CategoryBreakdown pit={pit} />
      </main>

      {confirmDelete && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
        }}>
          <div style={{
            background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
            padding: '28px 32px', maxWidth: 400, width: '90%',
          }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
              Delete {pit.pitName}?
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>
              This action cannot be undone. All assessment data will be permanently removed.
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setConfirmDelete(false)}
                style={{
                  padding: '8px 18px', borderRadius: 'var(--radius)',
                  background: 'var(--paper-2)', border: '1px solid var(--line)',
                  cursor: 'pointer', fontSize: 13, color: 'var(--ink)',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: '8px 18px', borderRadius: 'var(--radius)',
                  background: 'var(--sc-vp)', border: 'none',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#fff',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
