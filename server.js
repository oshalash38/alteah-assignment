import express from 'express';
import patients from './patients.js';

// Init app
const app = express();
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

app.post('/admit', (req, res) => {
  const { patientID, fName, lName, dob, gender, admissionDate, currentBed } =
    req.body;
  try {
    const newPatient = {
      patientID: patientID,
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
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.put('/discharge', (req, res) => {
  const { id, dischargeDate } = req.body;
  try {
    const patient = patients.find((p) => p.id === id);
    if (patient) {
      patient.dischargeDate = dischargeDate;
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
  const { id, currentBed } = req.body;
  try {
    const patient = patients.find((p) => p.id === id);
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
