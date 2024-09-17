const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Route to handle contact form submission
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Set up nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fuzzads.co@gmail.com', // replace with your email
      pass: 'yqqcsxvazlppquhv', // replace with your email password
    },
  });

  const mailOptions = {
    from: email,
    to: 'unnatisamaiyar02@gmail.com', // Replace with your receiving email
    subject: `Contact form submission from ${name}`,
    text: `You have a new message from ${name} (${email}): \n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
