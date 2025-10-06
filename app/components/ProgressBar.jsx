'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ProgressBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const id = setTimeout(() => setVisible(false), 500);
    return () => clearTimeout(id);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[70]">
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 animate-pulse" />
    </div>
  );
}


