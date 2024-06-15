import React from 'react';
import { Modal } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
const DischargeModal = ({ patient, handleDischarge }) => {
  const navigate = useNavigate();

  const submitDischargeForm = () => {
    const dischargeDate = document.getElementById('dischargeDate').value;
    if (dischargeDate) {
      handleDischarge(patient, dischargeDate);

      // Close the modal after submission
      const modal = document.getElementById('dischargeModal');
      const modalInstance = Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }
      navigate('/');
    } else {
      alert('Please select a discharge date.');
    }
  };

  return (
    <div
      className='modal fade'
      id='dischargeModal'
      tabIndex='-1'
      aria-labelledby='dischargeModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='dischargeModalLabel'>
              Discharge Patient
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <form id='dischargeForm'>
              <div className='mb-3'>
                <label htmlFor='dischargeDate' className='form-label'>
                  Discharge Date
                </label>
                <input
                  type='date'
                  className='form-control'
                  id='dischargeDate'
                  required
                />
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={submitDischargeForm}
            >
              Discharge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DischargeModal;
