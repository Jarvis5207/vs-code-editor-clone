const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Path to the client folder
const clientPath = path.join(__dirname, '..', 'client');

// Serve static files
app.use(express.static(clientPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve login.html on root "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(clientPath, 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { fullname, email, phone, password } = req.body;
  const userData = { fullname, email, phone, password };
  
  // Append to users.json file
  const usersFilePath = path.join(__dirname, 'users.json');
  const users = fs.existsSync(usersFilePath)
    ? JSON.parse(fs.readFileSync(usersFilePath))
    : [];

  users.push(userData);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.send('Login successful! ✅');
});

// Serve editor page after login (optional)
app.get('/editor', (req, res) => {
  res.sendFile(path.join(clientPath, 'editor.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
