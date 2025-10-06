import ClientHome from './components/ClientHome';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

// Avoid server-side fetching on the home page; let the client load data
async function getInitialArticles() {
  return [];
}

export default async function Home() {
  const initialArticles = await getInitialArticles();
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-900" />}> 
      <ClientHome initialArticles={initialArticles} />
    </Suspense>
  );
}