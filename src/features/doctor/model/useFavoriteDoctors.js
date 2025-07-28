import { useEffect, useState } from 'react';
import { getFavoriteDoctorsIds } from '../../../entities/doctor/favoritesApi';

export const useFavoriteDoctors = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFavoriteIds = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFavoriteDoctorsIds();
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

  const addToFavorites = (doctorId) => {
    setFavoriteIds(prev => [...prev, doctorId]);
  };

  const removeFromFavorites = (doctorId) => {
    setFavoriteIds(prev => prev.filter(id => id !== doctorId));
  };

  const isFavorite = (doctorId) => {
    return favoriteIds.includes(doctorId);
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