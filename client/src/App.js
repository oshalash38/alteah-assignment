import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdmitPage from './components/AdmitPage';
import DischargePage from './components/DischargePage';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/admit' element={<AdmitPage />} />
          <Route path='/discharge' element={<DischargePage />} />
        </Routes>
      </Router>
      <p className='centered'>
        Alteahc Take-home Assignment 2024 - Omar Shalash
      </p>
    </Fragment>
  );
}

export default App;
