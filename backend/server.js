// Replace this old code:
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});
