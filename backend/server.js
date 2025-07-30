const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from "client" folder
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { fullname, email, phone, password } = req.body;
  console.log('User Info:', fullname, email, phone, password);
  res.send('Login Successful!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
