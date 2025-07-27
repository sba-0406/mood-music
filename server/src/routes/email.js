require('dotenv').config();

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST /api/email/share
router.post('/share', async (req, res) => {
  const { email, text } = req.body;

  if (!email || !text) {
    return res.status(400).json({ error: 'Missing email or text' });
  }

  // Configure your SMTP transporter here — update with your email credentials
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com' , // correct
 // e.g., smtp.gmail.com
    port: 587,
    secure: false,
    auth: {
      user: 'process.env.EMAIL_USER',
      pass: 'process.env.EMAIL_PASS',
    },
  });

  try {
    await transporter.sendMail({
      from: '"MoodMusic Diary" <your-email@example.com>',
      to: email,
      subject: 'Shared Diary Entry from MoodMusic',
      text: text,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email sending error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
