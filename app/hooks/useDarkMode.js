'use client';
import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const hasClass = document.documentElement.classList.contains('dark');
    if (hasClass) {
      setIsDark(true);
      return;
    }
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved ? JSON.parse(saved) : prefersDark;
    setIsDark(initial);
    document.documentElement.classList.toggle('dark', initial);
  }, []);

  const toggleDarkMode = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    localStorage.setItem('darkMode', JSON.stringify(newValue));
    if (newValue) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  };

  return [isDark, toggleDarkMode];
}