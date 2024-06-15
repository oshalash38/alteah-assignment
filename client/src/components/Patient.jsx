import React, { Fragment } from 'react';
import BtnGroup from './BtnGroup';

function Patient({ patient, handleBtnClick, isActive, onToggle }) {
  const uniqueId = `flush-collapse${patient.patientID}`;
  const headingId = `flush-heading${patient.patientID}`;

  return (
    <Fragment>
      <div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id={headingId}>
            <button
              className={`accordion-button ${
                isActive ? '' : 'collapsed'
              } centered`}
              type='button'
              onClick={onToggle}
              aria-expanded={isActive}
              aria-controls={uniqueId}
            >
              {patient.fName} {patient.lName}
            </button>
          </h2>
          <div
            id={uniqueId}
            className={`accordion-collapse collapse ${isActive ? 'show' : ''}`}
            aria-labelledby={headingId}
            data-bs-parent='#accordionFlushExample'
          >
            <div className='accordion-body'>
              <h4>Patient Information</h4>
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                <li>Date of Birth: {patient.dob}</li>
                <li>Gender: {patient.gender}</li>
                <li>Admission Date: {patient.admissionDate}</li>
                <li>
                  Discharge Date:{' '}
                  {patient.dischargeDate
                    ? patient.dischargeDate
                    : 'Undischarged'}
                </li>
                <li>Current Bed: {patient.currentBed}</li>
              </ul>
              {patient.dischargeDate && patient.currentBed === 'N/A' ? (
                'Patient Discharged'
              ) : (
                <BtnGroup patient={patient} onBtnClick={handleBtnClick} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Patient;
