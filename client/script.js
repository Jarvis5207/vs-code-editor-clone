let editor;
let currentLang = 'html';
let code = {
  html: "<!-- Start coding HTML here -->",
  css: "/* CSS styling */",
  js: "// JavaScript code"
};

require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' } });

require(["vs/editor/editor.main"], () => {
  editor = monaco.editor.create(document.getElementById("editor"), {
    value: code[currentLang],
    language: currentLang,
    theme: "vs-dark",
    automaticLayout: true
  });
});

function switchTab(lang) {
  code[currentLang] = editor.getValue();
  currentLang = lang;
  editor.setValue(code[lang]);
  monaco.editor.setModelLanguage(editor.getModel(), lang);
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.tab-btn[data-lang="${lang}"]`).classList.add("active");
}

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => switchTab(btn.dataset.lang));
});

document.getElementById("run-btn").addEventListener("click", () => {
  code[currentLang] = editor.getValue();
  const output = `
    <html>
      <head><style>${code.css}</style></head>
      <body>
        ${code.html}
        <script>${code.js}<\/script>
      </body>
    </html>`;
  const iframe = document.getElementById("output");
  iframe.srcdoc = output;
});

document.getElementById("download-btn").addEventListener("click", () => {
  code[currentLang] = editor.getValue();
  const blob = new Blob([code.html], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "code.html";
  link.click();
});

document.getElementById("open-btn").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  fileInput.click();
  fileInput.onchange = () => {
    const reader = new FileReader();
    reader.onload = e => editor.setValue(e.target.result);
    reader.readAsText(fileInput.files[0]);
  };
});

document.getElementById("logout-btn").addEventListener("click", () => {
  window.location.href = "/";
});
