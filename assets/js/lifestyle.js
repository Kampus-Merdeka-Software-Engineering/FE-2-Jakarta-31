// News API
const API_KEY = "eb078876cc9e4ab389e506a9aa8df764";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("lifestyle"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const gridsContainer = document.getElementById("grids-container");
  const newsGridTemplate = document.getElementById("template-news-grid");

  gridsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const gridClone = newsGridTemplate.content.cloneNode(true);
    fillDataInGrid(gridClone, article);
    gridsContainer.appendChild(gridClone);
  });
}

function fillDataInGrid(gridClone, article) {
  const newsImg = gridClone.querySelector("#news-img");
  const newsHeading = gridClone.querySelector("#news-heading");
  const newsDecs = gridClone.querySelector("#news-desc");
  // const newsAuthor = gridClone.querySelector("#news-author");
  const newsSource = gridClone.querySelector("#news-source");

  newsImg.src = article.urlToImage;
  newsHeading.innerHTML = article.title;
  newsDecs.innerHTML = article.description;
  // newsAuthor.innerHTML = article.author;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  gridClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

function onNavItemClick(id) {
  fetchNews(id);
}
