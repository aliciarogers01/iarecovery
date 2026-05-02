require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json({ limit: '100kb' }));

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'iarecover-backend' });
});

app.post('/api/recovery-request', async (req, res) => {
  const {
    companyName,
    contactName,
    email,
    phone,
    debtorName,
    vin,
    vehicle,
    lastKnownLocation,
    notes,
  } = req.body || {};

  if (!companyName || !contactName || !email || !phone) {
    return res.status(400).json({
      ok: false,
      message: 'Company name, contact name, email, and phone are required.',
    });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = `
New recovery request submitted from iarecover.net

Company Name: ${companyName}
Contact Name: ${contactName}
Email: ${email}
Phone: ${phone}

Debtor Name: ${debtorName || 'Not provided'}
VIN: ${vin || 'Not provided'}
Vehicle: ${vehicle || 'Not provided'}
Last Known Location: ${lastKnownLocation || 'Not provided'}

Notes:
${notes || 'None'}
`;

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `New Recovery Request - ${companyName}`,
      text: message,
    });

    res.json({ ok: true, message: 'Recovery request submitted.' });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ ok: false, message: 'Unable to send request.' });
  }
});

app.listen(PORT, () => {
  console.log(`IAR backend listening on port ${PORT}`);
});
