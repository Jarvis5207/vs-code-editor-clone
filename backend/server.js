// Serve editor.html as home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/editor.html"));
});
