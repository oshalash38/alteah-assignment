import React from 'react';
import { Modal } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
const TransferModal = ({ patient, handleTransfer }) => {
  const navigate = useNavigate();

  const submitTransferForm = () => {
    const transferBed = document.getElementById('TransferBed').value;
    if (transferBed) {
      handleTransfer(patient, transferBed);

      // Close the modal after submission
      const modal = document.getElementById('TransferModal');
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
      alert('Please select a Transfer Bed.');
    }
  };

  return (
    <div
      className='modal fade'
      id='TransferModal'
      tabIndex='-1'
      aria-labelledby='TransferModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='TransferModalLabel'>
              Transfer Patient
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <form id='TransferForm'>
              <div className='mb-3'>
                <label htmlFor='TransferBed' className='form-label'>
                  Transfer Bed
                </label>
                <input
                  type='number'
                  className='form-control'
                  id='TransferBed'
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
              onClick={submitTransferForm}
            >
              Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;
