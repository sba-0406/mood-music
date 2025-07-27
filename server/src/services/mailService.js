// server/src/services/mailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * Sends a diary entry to an email address.
 */
async function sendDiaryEntry(to, subject, entryText) {
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Or your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });

  return transporter.sendMail({
    from: `"Mood Music Diary" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: entryText
  });
}

module.exports = { sendDiaryEntry };
