const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// MongoDB connection
const uri = 'mongodb+srv://awl4114awl:employeetimeclock@employeetimeclock.mbixtcy.mongodb.net/employeetimeclock?retryWrites=true&w=majority&appName=EmployeeTimeClock';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const clockSchema = new mongoose.Schema({
  name: String,
  clockIn: Date,
  startBreak: Date,
  endBreak: Date,
  startLunch: Date,
  endLunch: Date,
  clockOut: Date,
});

const Clock = mongoose.model('Clock', clockSchema);

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/attendance', async (req, res) => {
  try {
    const employees = await Clock.find({});
    res.render('attendance', { employees, moment });
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).send('An error occurred while fetching employees.');
  }
});

app.get('/employees', async (req, res) => {
  try {
    const employees = await Clock.find({});
    res.render('employees', { employees });
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).send('An error occurred while fetching employees.');
  }
});

app.post('/clockin', async (req, res) => {
  console.log('Clock In:', req.body.name);
  const clock = new Clock({
    name: req.body.name,
    clockIn: new Date(),
  });
  await clock.save();
  console.log('Clock In Successful:', clock);
  res.redirect('/attendance');
});

app.post('/startbreak', async (req, res) => {
  console.log('Start Break:', req.body.name);
  try {
    const doc = await Clock.findOneAndUpdate(
      { name: req.body.name, startBreak: null, clockOut: null },
      { startBreak: new Date() },
      { new: true }
    );
    if (doc) {
      console.log('Start Break Successful:', doc);
    } else {
      console.log('No clock in record found or break already started for user:', req.body.name);
    }
    res.redirect('/attendance');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while starting break.');
  }
});

app.post('/endbreak', async (req, res) => {
  console.log('End Break:', req.body.name);
  try {
    const doc = await Clock.findOneAndUpdate(
      { name: req.body.name, startBreak: { $ne: null }, endBreak: null, clockOut: null },
      { endBreak: new Date() },
      { new: true }
    );
    if (doc) {
      console.log('End Break Successful:', doc);
    } else {
      console.log('No start break record found or break already ended for user:', req.body.name);
    }
    res.redirect('/attendance');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while ending break.');
  }
});

app.post('/startlunch', async (req, res) => {
  console.log('Start Lunch:', req.body.name);
  try {
    const doc = await Clock.findOneAndUpdate(
      { name: req.body.name, startLunch: null, clockOut: null },
      { startLunch: new Date() },
      { new: true }
    );
    if (doc) {
      console.log('Start Lunch Successful:', doc);
    } else {
      console.log('No clock in record found or lunch already started for user:', req.body.name);
    }
    res.redirect('/attendance');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while starting lunch.');
  }
});

app.post('/endlunch', async (req, res) => {
  console.log('End Lunch:', req.body.name);
  try {
    const doc = await Clock.findOneAndUpdate(
      { name: req.body.name, startLunch: { $ne: null }, endLunch: null, clockOut: null },
      { endLunch: new Date() },
      { new: true }
    );
    if (doc) {
      console.log('End Lunch Successful:', doc);
    } else {
      console.log('No start lunch record found or lunch already ended for user:', req.body.name);
    }
    res.redirect('/attendance');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while ending lunch.');
  }
});

app.post('/clockout', async (req, res) => {
  console.log('Clock Out:', req.body.name);
  try {
    const clockInRecord = await Clock.findOne({ name: req.body.name, clockOut: null });
    if (clockInRecord) {
      console.log('Clock In Record Found:', clockInRecord);
      const doc = await Clock.findOneAndUpdate(
        { name: req.body.name, clockOut: null },
        { clockOut: new Date() },
        { new: true }
      );
      console.log('Clock Out Successful:', doc);
    } else {
      console.log('No clock in record found for user:', req.body.name);
    }
    res.redirect('/attendance');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while clocking out.');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
