import express from 'express';
import patients from './patients.js';
import cors from 'cors';

// Init app
const app = express();
app.use(cors());
app.use(express.json());

// Setup event handlers/api

app.get('/patients', (req, res) => {
  try {
    res.status(200).send(patients);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

let newID = 0;

app.post('/admit', (req, res) => {
  const { fName, lName, dob, gender, admissionDate, currentBed } = req.body;
  try {
    const newPatient = {
      patientID: newID,
      fName: fName,
      lName: lName,
      dob: dob,
      gender: gender,
      admissionDate: admissionDate,
      dischargeDate: null,
      currentBed: currentBed,
    };
    patients.push(newPatient);
    res.send(newPatient);
    newID++;
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.put('/discharge', (req, res) => {
  const { patientID, dischargeDate } = req.body;
  try {
    const patient = patients.find((p) => p.patientID === patientID);
    if (patient) {
      patient.dischargeDate = dischargeDate;
      patient.currentBed = 'N/A';
      res.status(200).send(patient);
    } else {
      res.status(404).send({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.put('/transfer', (req, res) => {
  const { patientID, currentBed } = req.body;
  try {
    const patient = patients.find((p) => p.patientID === patientID);
    if (patient) {
      patient.currentBed = currentBed;
      res.status(200).send(patient);
    } else {
      res.status(404).send({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Setup port
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
