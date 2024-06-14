import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientList from './PatientList';
import AdmitBtn from './AdmitBtn';

function HomePage() {
  const [patients, setPatients] = useState([]);

  const getAllPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5001/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  useEffect(() => {
    console.log(patients);
  }, [patients]);

  return (
    <div className='App'>
      <h1>Patients</h1>
      <PatientList patients={patients} setPatients={setPatients} />
      <AdmitBtn />
    </div>
  );
}

export default HomePage;
