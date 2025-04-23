const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Path to the donations file
const donationsFilePath = path.join(__dirname, 'donations.json');

// ✅ Root route for test
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// ✅ API: Submit a donation
app.post('/api/donate', (req, res) => {
  const { fullName, email, foodType, quantity, address } = req.body;

  // Validate input
  if (!fullName || !email || !foodType || !quantity || !address) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Create new donation object
  const donation = {
    id: Date.now(),
    fullName,
    email,
    foodType,
    quantity,
    address,
    time: new Date().toISOString()
  };

  // Read existing donations
  fs.readFile(donationsFilePath, 'utf-8', (err, data) => {
    let donations = [];

    if (!err && data) {
      try {
        donations = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing donations file:', parseErr);
      }
    }

    // Add new donation and write to file
    donations.push(donation);

    fs.writeFile(donationsFilePath, JSON.stringify(donations, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing to file:', writeErr);
        return res.status(500).json({ message: 'Error saving donation.' });
      }

      console.log('✅ Donation received:', donation);
      res.status(200).json({ message: 'Donation received successfully!' });
    });
  });
});

// ✅ API: View all donations (optional, dev-only)
app.get('/api/donations', (req, res) => {
  fs.readFile(donationsFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading donation data.' });

    try {
      const donations = JSON.parse(data);
      res.status(200).json(donations);
    } catch (parseErr) {
      res.status(500).json({ message: 'Error parsing donation data.' });
    }
  });
});

// ✅ Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend is running at http://0.0.0.0:${PORT}`);
});
