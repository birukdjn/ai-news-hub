'use client';
import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('newsFavorites');
    setFavorites(saved ? JSON.parse(saved) : []);
  }, []);

  const addFavorite = (article) => {
    const newFavorites = [...favorites, article];
    setFavorites(newFavorites);
    localStorage.setItem('newsFavorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = (url) => {
    const newFavorites = favorites.filter(article => article.url !== url);
    setFavorites(newFavorites);
    localStorage.setItem('newsFavorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (url) => favorites.some(article => article.url === url);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}