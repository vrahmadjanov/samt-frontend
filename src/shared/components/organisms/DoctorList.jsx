import React from 'react';
import DoctorCard from './DoctorCard';

const DoctorList = ({ doctors }) => (
  <div>
    {doctors.map(doctor => (
      <DoctorCard key={doctor.id} doctor={doctor} />
    ))}
  </div>
);

export default DoctorList; 