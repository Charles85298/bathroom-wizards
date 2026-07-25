(() => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") || "arizona-landscapes";
  const galleries = window.PHOTOGRAPHY_GALLERIES || {};
  const config = window.GITHUB_GALLERY_CONFIG || {};
  const data = galleries[category];
  const title = document.getElementById("gallery-title");
  const description = document.getElementById("gallery-description");
  const gallery = document.getElementById("photo-gallery");
  const empty = document.getElementById("gallery-empty");

  if (!data) {
    title.textContent = "Gallery Not Found";
    description.textContent = "Return to the photography page and choose a gallery.";
    empty.textContent = "This photography category is not configured.";
    empty.hidden = false;
    return;
  }

  document.title = `${data.title} | Charles Fleming Photography`;
  title.textContent = data.title;
  description.textContent = data.description;

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  let photos = [];
  let currentIndex = 0;

  const filenameToTitle = (filename) => {
    const withoutExtension = filename.replace(/\.[^.]+$/, "");
    return withoutExtension
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (character) => character.toUpperCase());
  };

  const show = (index) => {
    if (!photos.length) return;
    currentIndex = (index + photos.length) % photos.length;
    const photo = photos[currentIndex];
    lightboxImage.src = photo.url;
    lightboxImage.alt = photo.title;
    lightboxCaption.textContent = photo.title;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
  };

  const close = () => {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
  };

  const renderPhotos = () => {
    gallery.replaceChildren();
    photos.forEach((photo, index) => {
      const button = document.createElement("button");
      button.className = "gallery-photo-card";
      button.type = "button";
      button.dataset.index = String(index);

      const image = document.createElement("img");
      image.src = photo.url;
      image.alt = photo.title;
      image.loading = "lazy";
      image.decoding = "async";

      const caption = document.createElement("span");
      caption.textContent = photo.title;

      button.append(image, caption);
      gallery.appendChild(button);
    });
  };

  const loadGallery = async () => {
    const required = ["username", "repository", "branch", "baseFolder"];
    const missing = required.filter((key) => !config[key]);
    const usernameIsPlaceholder = config.username === "YOUR_GITHUB_USERNAME";

    if (missing.length || usernameIsPlaceholder) {
      empty.textContent = "Gallery setup is incomplete. Add your GitHub username in assets/js/gallery-config.js.";
      empty.hidden = false;
      return;
    }

    empty.textContent = "Loading photographs...";
    empty.hidden = false;

    const folderPath = `${config.baseFolder}/${category}`;
    const encodedPath = folderPath.split("/").map(encodeURIComponent).join("/");
    const apiUrl = `https://api.github.com/repos/${encodeURIComponent(config.username)}/${encodeURIComponent(config.repository)}/contents/${encodedPath}?ref=${encodeURIComponent(config.branch)}`;

    try {
      const response = await fetch(apiUrl, {
        headers: { Accept: "application/vnd.github+json" }
      });

      if (!response.ok) {
        throw new Error(`GitHub returned ${response.status}`);
      }

      const files = await response.json();
      const extensions = new Set((config.imageExtensions || []).map((item) => item.toLowerCase()));

      photos = files
        .filter((file) => file.type === "file")
        .filter((file) => extensions.has(file.name.split(".").pop().toLowerCase()))
        .filter((file) => !file.name.toLowerCase().startsWith("placeholder."))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }))
        .map((file) => ({
          title: filenameToTitle(file.name),
          url: file.download_url
        }));

      if (!photos.length) {
        empty.textContent = "No photographs have been added to this gallery yet.";
        empty.hidden = false;
        return;
      }

      empty.hidden = true;
      renderPhotos();
    } catch (error) {
      console.error("Unable to load GitHub gallery:", error);
      empty.textContent = "The gallery could not be loaded from GitHub. Confirm the username, repository, branch, folder path, and repository visibility in gallery-config.js.";
      empty.hidden = false;
    }
  };

  gallery.addEventListener("click", (event) => {
    const card = event.target.closest(".gallery-photo-card");
    if (card) show(Number(card.dataset.index));
  });
  document.querySelector(".lightbox-close").addEventListener("click", close);
  document.querySelector(".lightbox-prev").addEventListener("click", () => show(currentIndex - 1));
  document.querySelector(".lightbox-next").addEventListener("click", () => show(currentIndex + 1));
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) close(); });
  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(currentIndex - 1);
    if (event.key === "ArrowRight") show(currentIndex + 1);
  });

  loadGallery();
})();
