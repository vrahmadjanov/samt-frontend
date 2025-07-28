import { useEffect, useState } from 'react';
import { getFavoriteClinicsIds } from '../../../entities/clinic/favoritesApi';

export const useFavoriteClinics = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFavoriteIds = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFavoriteClinicsIds();
        setFavoriteIds(data);
      } catch (err) {
        setError(err);
        setFavoriteIds([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteIds();
  }, []);

  const addToFavorites = (clinicId) => {
    setFavoriteIds(prev => [...prev, clinicId]);
  };

  const removeFromFavorites = (clinicId) => {
    setFavoriteIds(prev => prev.filter(id => id !== clinicId));
  };

  const isFavorite = (clinicId) => {
    return favoriteIds.includes(clinicId);
  };

  return { 
    favoriteIds, 
    loading, 
    error, 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite 
  };
}; 