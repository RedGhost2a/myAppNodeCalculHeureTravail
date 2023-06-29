const express = require('express');
const workingHourController = require('./_controller/workingHour');
const totalController = require('./_controller/total');
const mapController = require('./_controller/map');
const calendarController = require('./_controller/calendar');
const cors = require("cors");
const db = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

// You can define routes here.
app.use('/workingHours', workingHourController)
app.use('/map', mapController)
app.use('/total', totalController)
app.use('/calendar', calendarController)



// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
