import React from 'react';

function BtnGroup({ patient, onBtnClick }) {
  const handleDischargeClick = () => {
    onBtnClick(patient);
  };
  const handleTransferClick = () => {
    onBtnClick(patient);
  };

  return (
    <div className='btn-group' role='group' aria-label='Basic example'>
      <button
        type='button'
        className='btn btn-primary'
        onClick={handleDischargeClick}
        data-bs-toggle='modal'
        data-bs-target='#dischargeModal'
      >
        Discharge
      </button>
      <button
        type='button'
        className='btn btn-primary'
        onClick={handleTransferClick}
        data-bs-toggle='modal'
        data-bs-target='#TransferModal'
      >
        Transfer
      </button>
    </div>
  );
}

export default BtnGroup;
