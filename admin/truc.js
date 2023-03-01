// Chemin d'accès au dossier contenant les fichiers Markdown
const mdDir = "/admin";

// Convertit un fichier Markdown en HTML
function convertToHtml(markdown) {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdown);
  return html;
}

// Charge et affiche les fichiers Markdown dans la page web
function loadMarkdownFiles() {
  // Récupère la section où les fichiers Markdown seront affichés
  const markdownSection = document.getElementById("markdown-section");

  // Charge tous les fichiers Markdown dans le dossier
  fetch(mdDir)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, "text/html");
      const files = Array.from(dom.querySelectorAll("a"))
        .map(link => link.getAttribute("href"))
        .filter(href => href.endsWith(".md"));

      // Charge chaque fichier Markdown et l'affiche dans la page web
      files.forEach(file => {
        const fileUrl = mdDir + file;
        fetch(fileUrl)
          .then(response => response.text())
          .then(markdown => {
            const html = convertToHtml(markdown);
            const markdownDiv = document.createElement("div");
            markdownDiv.innerHTML = html;
            markdownSection.appendChild(markdownDiv);
          });
      });
    });
}

// Charge les fichiers Markdown lorsque la page est prête
document.addEventListener("DOMContentLoaded", () => {
  loadMarkdownFiles();
});
