const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../client")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.post("/signup", (req, res) => {
  console.log("Signup Data (Not saved):", req.body);
  res.redirect("/"); // redirect to login page
});

app.post("/login", (req, res) => {
  console.log("Login Data (Not checked):", req.body);
  res.redirect("/editor.html"); // direct redirect to editor
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
