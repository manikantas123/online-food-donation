const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint for donations
app.post('/donate', (req, res) => {
  const { fullName, email, foodType, quantity, address } = req.body;

  console.log('Received donation:', { fullName, email, foodType, quantity, address });

  // Normally, you'd store this in a database
  res.status(200).json({ message: 'Donation received successfully!' });
});

// Default route
app.get('/', (req, res) => {
  res.send('Food Donation Backend is running.');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
