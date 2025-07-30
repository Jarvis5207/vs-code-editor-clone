const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client")));

const USERS_FILE = path.join(__dirname, "users.json");

function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
}
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Signup route
app.post("/signup", (req, res) => {
  const { fullname, email, phone, password } = req.body;
  const users = readUsers();
  if (users.some(u => u.email === email || u.phone === phone)) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }
  users.push({ fullname, email, phone, password });
  writeUsers(users);
  res.json({ success: true });
});

// Login route
app.post("/login", (req, res) => {
  const { identity, password } = req.body;
  const users = readUsers();
  const user = users.find(u => (u.email === identity || u.phone === identity) && u.password === password);
  if (user) res.json({ success: true });
  else res.status(401).json({ success: false, message: "Invalid login" });
});

app.listen(PORT, () => console.log("Server running on http://localhost:" + PORT));
