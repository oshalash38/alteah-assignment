import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdmitBtn() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate('/admit');
  };
  return (
    <button
      onClick={handleClick}
      type='submit'
      className='btn btn-primary admit-btn'
    >
      Admit New Patient
    </button>
  );
}

export default AdmitBtn;
