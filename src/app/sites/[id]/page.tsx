import SiteDetailClient from './SiteDetailClient';

export default function SiteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <SiteDetailClient paramsPromise={params} />;
}
