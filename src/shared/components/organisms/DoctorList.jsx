import React, { useState } from 'react';
import DoctorCard from './DoctorCard';

const DoctorList = ({ doctors }) => {
  const [favorites, setFavorites] = useState([]);

  const handleFavorite = (doctorId) => {
    setFavorites((prev) => prev.includes(doctorId) ? prev : [...prev, doctorId]);
  };

  return (
    <div>
      {doctors.map(doctor => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          favorite={favorites.includes(doctor.id)}
          onFavorite={handleFavorite}
        />
      ))}
    </div>
  );
};

export default DoctorList; 