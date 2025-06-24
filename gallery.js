// shared/gallery.js

const IMAGES_PER_PAGE = 50;
let keys = [];
let currentPage = 1;
let galleryInstance;

function loadGallery(prefix) {
  const gallery = document.getElementById("gallery");
  const pagination = document.getElementById("pagination");
  gallery.innerHTML = "Loading photos...";
  pagination.style.display = "none";

  fetch(`https://pateltales-photography.s3.us-east-2.amazonaws.com?list-type=2&prefix=${prefix}`)
    .then(res => res.text())
    .then(text => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "application/xml");

      keys = Array.from(xmlDoc.getElementsByTagName("Key"))
        .map(k => k.textContent)
        .filter(key => key.match(/\.(jpe?g|png|gif)$/i) && !key.endsWith("/"));

      if (keys.length === 0) {
        gallery.innerHTML = "<p>No photos found.</p>";
        return;
      }

      currentPage = 1;
      pagination.style.display = "flex";
      renderPage();
    })
    .catch(err => {
      console.error(err);
      gallery.innerHTML = "<p>Error loading photos.</p>";
    });
}

function renderPage() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const endIndex = Math.min(startIndex + IMAGES_PER_PAGE, keys.length);
  const pageKeys = keys.slice(startIndex, endIndex);

  pageKeys.forEach(key => {
    const url = `https://pateltales-photography.s3.us-east-2.amazonaws.com/${key}`;
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("data-lg-size", "1600-1067");
    a.setAttribute("data-sub-html", `<h4>${key.split("/").pop()}</h4>`);
    const img = document.createElement("img");
    img.src = url;
    img.alt = key.split("/").pop();
    img.loading = "lazy";
    a.appendChild(img);
    gallery.appendChild(a);
  });

  if (galleryInstance) galleryInstance.destroy();
  galleryInstance = lightGallery(gallery, {
    plugins: [lgZoom],
    speed: 300,
  });

  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = endIndex >= keys.length;
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if ((currentPage * IMAGES_PER_PAGE) < keys.length) {
    currentPage++;
    renderPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
