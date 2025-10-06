'use client';
import { useState, useEffect, useCallback } from 'react';

const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
};

const useTheme = () => {
  const [theme, setTheme] = useState(THEME.LIGHT);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (systemPrefersDark ? THEME.DARK : THEME.LIGHT);
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === THEME.DARK) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', THEME.DARK);
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', THEME.LIGHT);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;
