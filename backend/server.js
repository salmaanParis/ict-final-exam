const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/salman', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
});

const OTP = mongoose.model('OTP', otpSchema);

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youtonez@gmail.com',
    pass: 'vujv jazj jcen iyte',
  },
});

// Routes
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP to DB
  await OTP.findOneAndUpdate({ email }, { otp }, { upsert: true });

  // Send OTP Email
  const mailOptions = {
    from: 'youtonez@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('OTP sent');
  });
});

app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const record = await OTP.findOne({ email });

  if (record && record.otp === otp) {
    res.status(200).send('OTP verified');
  } else {
    res.status(400).send('Invalid OTP');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
