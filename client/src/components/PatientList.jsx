import React, { useState } from 'react';
import Patient from './Patient';
import DischargeModal from './DischargeModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TransferModal from './TransferModal';

function PatientList({ patients, setPatients }) {
  const [currentPatient, setCurrentPatient] = useState(null);
  const [activePatientId, setActivePatientId] = useState(null);

  const navigate = useNavigate();

  const handleBtnClick = (patient) => {
    console.log('Button Click Patient:', patient);
    setCurrentPatient(patient);
  };

  const handleDischarge = async (patient, dischargeDate) => {
    console.log('Discharge Patient:', patient);
    console.log('Discharge Date:', dischargeDate);
    try {
      const response = await axios.put('http://localhost:5001/discharge', {
        patientID: patient.patientID,
        dischargeDate: dischargeDate,
      });
      console.log(response);
      const newPatients = patients.map((patient) =>
        patient.patientID === response.data.patientID ? response.data : patient
      );
      setPatients(newPatients);
    } catch (error) {
      alert(error.response.data.message);
      console.error('Error discharging patient:', error);
    } finally {
      navigate('/');
    }
  };

  const handleTransfer = async (patient, transferBed) => {
    console.log('Transfer Patient:', patient);
    console.log('Transfer Bed:', transferBed);
    try {
      const response = await axios.put('http://localhost:5001/transfer', {
        patientID: patient.patientID,
        currentBed: transferBed,
      });
      console.log(response);
      const newPatients = patients.map((patient) =>
        patient.patientID === response.data.patientID ? response.data : patient
      );
      setPatients(newPatients);
    } catch (error) {
      alert(error.response.data.message);
      console.error('Error transferring patient:', error);
    } finally {
      navigate('/');
    }
  };

  const toggleAccordion = (patientId) => {
    setActivePatientId(activePatientId === patientId ? null : patientId);
  };

  return (
    <div className='patient-list'>
      <div className='accordion accordion-flush' id='accordionFlushExample'>
        {patients.map((patient) => (
          <Patient
            key={patient.patientID}
            patient={patient}
            handleBtnClick={handleBtnClick}
            isActive={activePatientId === patient.patientID}
            onToggle={() => toggleAccordion(patient.patientID)}
          />
        ))}
      </div>
      <DischargeModal
        patient={currentPatient}
        handleDischarge={handleDischarge}
      />
      <TransferModal patient={currentPatient} handleTransfer={handleTransfer} />
    </div>
  );
}

export default PatientList;
