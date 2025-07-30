// 📁 backend/server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from client folder
app.use(express.static(path.join(__dirname, '../client')));

// Serve index.html as root
// Serve editor.html as home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/editor.html"));
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
