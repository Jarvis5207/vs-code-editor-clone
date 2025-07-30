// 📁 backend/server.js

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from client folder
app.use(express.static(path.join(__dirname, "../client")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🏠 Home (Login Page)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// 🧾 Signup Handler (Dummy)
app.post("/signup", (req, res) => {
  const { fullname, email, password } = req.body;
  console.log("Signup Data Received (Not saved):", { fullname, email, password });
  res.redirect("/"); // redirect back to login
});

// 🔐 Login Handler (Dummy)
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login Attempt (Not verified):", { email, password });
  res.redirect("/editor.html"); // direct redirect
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
