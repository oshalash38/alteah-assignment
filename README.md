# Project Description

This is my submission for the ADT Event Handler assignment. This project handles simple ADT (Admission, Discharge, Transfer) event handling functionality.

# Setup Instructions

This project uses Node.js and Express for the backend API. To spin the backend, make sure to have Node.js installed. Then, from the project root directory run

`nodemon start`

For the frontend, I used React. To spin the frontend, make sure to have React installed. Then, from the project root directory navigate to the client folder

`cd client`

Then run

`npm start`

# Basic Use

The app has an intuitive UI which is easy to follow. The main page shows the patient list and has a button to admit a new patient. Upon clicking that button, you are redirected to a form to input the required data for a new patient. This form applies validation. Upon successful submission for a new patient, you are redirec ted back to the list of patients along with the newly admitted patient. To view this patient's information, simply click on it and the information will be revealed along with two buttons. One is for discharging the patient and the other is for transfering the patient. When clicking the discharge button, the user will be prompted to enter a discharge date. Similarly, when clicking the transfer button, the user will be prompter to enter a new bed for transfering. Basic validation such as not allowing a patient to be transfered to a bed already being used is implemented.
