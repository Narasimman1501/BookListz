// Helper to fetch books from Open Library subjects
async function fetchBooks(subject, containerId) {
  const url = `https://openlibrary.org/subjects/${subject}.json?limit=12`;
  const response = await fetch(url);
  const data = await response.json();
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // clear existing

  data.works.forEach(book => {
    const title = book.title;
    const author = book.authors?.[0]?.name || "Unknown";
    const cover = book.cover_id
      ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
      : "images/placeholder.jpg";

    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${cover}" alt="${title}">
      <h4>${title}</h4>
      <p>${author}</p>
      <button>Read</button>
    `;
    container.appendChild(card);
  });
}

// Fetch sample subjects for trending and classic sections
fetchBooks("science_fiction", "trending-books");
fetchBooks("classics", "classic-books");

// Search feature
document.getElementById("search-box").addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const query = e.target.value.trim();
    if (!query) return;
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`);
    const data = await res.json();

    const container = document.getElementById("trending-books");
    container.innerHTML = `<h3>Search Results for "${query}"</h3>`;

    data.docs.forEach(book => {
      const cover = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "images/placeholder.jpg";
      const title = book.title || "Untitled";
      const author = book.author_name ? book.author_name[0] : "Unknown";

      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
        <img src="${cover}" alt="${title}">
        <h4>${title}</h4>
        <p>${author}</p>
        <button>View</button>
      `;
      container.appendChild(card);
    });
  }
});
