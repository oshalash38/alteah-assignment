import express from 'express';
import patients from './patients.js';
import cors from 'cors';
import { body, validationResult } from 'express-validator';

// Init app
const app = express();
app.use(cors());
app.use(express.json());

// Setup event handlers/api

app.get('/patients', (req, res) => {
  try {
    res.status(200).send(patients);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

let newID = 0;

app.post(
  '/admit',
  [
    body('fName').notEmpty().withMessage('First name is required'),
    body('lName').notEmpty().withMessage('Last name is required'),
    body('dob')
      .isDate()
      .withMessage('Date of birth is required and must be a valid date'),
    body('gender')
      .isIn(['Male', 'Female', 'other'])
      .withMessage('Gender must be one of "Male", "Female", or "other"'),
    body('admissionDate')
      .isDate()
      .withMessage('Admission date is required and must be a valid date'),
    body('currentBed')
      .notEmpty()
      .isNumeric()
      .withMessage('Current bed is required')
      .toInt(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fName, lName, dob, gender, admissionDate, currentBed } = req.body;

    // Check if the bed is already in use
    const isBedInUse = patients.some(
      (patient) =>
        patient.currentBed === currentBed && patient.dischargeDate === null
    );
    if (isBedInUse) {
      return res.status(400).send({ message: 'Bed already in use' });
    }

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
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

app.put(
  '/discharge',
  [
    body('patientID').isNumeric().withMessage('Patient ID must be a number'),
    body('dischargeDate')
      .isDate()
      .withMessage('Discharge date is required and must be a valid date'),
    body('admissionDate')
      .isDate()
      .withMessage('Admission date is required and must be a valid date'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { patientID, dischargeDate, admissionDate } = req.body;
    try {
      const patient = patients.find((p) => p.patientID === patientID);
      if (patient) {
        console.log(dischargeDate);
        console.log(admissionDate);

        let currDischargeDate = new Date(dischargeDate);
        let currAdmissionDate = new Date(admissionDate);

        console.log(currDischargeDate);
        console.log(currAdmissionDate);
        if (currDischargeDate < currAdmissionDate) {
          res.status(400).send({
            message: 'Discharge date cannot be earlier than admission date',
          });
        } else {
          patient.dischargeDate = dischargeDate;
          patient.currentBed = 'N/A';
          res.status(200).send(patient);
        }
      } else {
        res.status(404).send({ message: 'Patient not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

app.put(
  '/transfer',
  [
    body('patientID').isNumeric().withMessage('Patient ID must be a number'),
    body('currentBed')
      .isNumeric()
      .withMessage('Current bed is required and must be a number')
      .toInt(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { patientID, currentBed } = req.body;

    // Check if the bed is already in use
    const isBedInUse = patients.some(
      (patient) =>
        patient.currentBed === currentBed && patient.dischargeDate === null
    );
    if (isBedInUse) {
      return res.status(400).send({ message: 'Bed already in use' });
    }

    try {
      const patient = patients.find((p) => p.patientID === patientID);
      if (patient) {
        patient.currentBed = currentBed;
        res.status(200).send(patient);
      } else {
        res.status(404).send({ message: 'Patient not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// Setup port
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
