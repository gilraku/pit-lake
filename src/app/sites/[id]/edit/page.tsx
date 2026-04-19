import EditClient from './EditClient';

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  return <EditClient paramsPromise={params} />;
}
