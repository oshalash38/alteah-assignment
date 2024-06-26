import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdmitPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    patientID: 0,
    fName: '',
    lName: '',
    dob: '',
    gender: '',
    admissionDate: '',
    currentBed: 0,
  });

  const handleChange = (e) => {
    if (e.target) {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/admit', form);
      console.log('Patient admitted:', response.data);
      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
      console.error('There was an error admitting the patient!', error);
    }
  };

  return (
    <Fragment>
      <h1>Enter New Patient Information</h1>
      <form className='admit-form' onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col'>
            <div className='mb-3'>
              <label className='form-label'>First Name</label>
              <input
                name='fName'
                type='text'
                className='form-control'
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Last Name</label>
              <input
                name='lName'
                type='text'
                className='form-control'
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='col'>
            <div className='mb-3'>
              <label className='form-label'>Date of Birth</label>
              <input
                name='dob'
                type='date'
                className='form-control'
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Gender</label>
              <select
                name='gender'
                className='form-select'
                aria-label='Default select example'
                onChange={handleChange}
                required
              >
                <option value=''>Open this select menu</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='mb-3'>
              <label className='form-label'>Admission Date</label>
              <input
                name='admissionDate'
                type='date'
                className='form-control'
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='col'>
            <div className='mb-3'>
              <label className='form-label'>Current Bed</label>
              <input
                name='currentBed'
                type='number'
                className='form-control'
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <button type='submit' className='btn btn-primary centered'>
          Submit
        </button>
      </form>
    </Fragment>
  );
}

export default AdmitPage;
