const backendUrl = "https://be-2-jakarta-31-production.up.railway.app/news";
const section = document.querySelector("section");

function fetchData(topic) {
  return fetch(`${backendUrl}/${topic}`)
    .then((response) => response.json())
    .then((data) => data.payload.datas.articles)
    .catch((error) => {
      console.error("Error fetching from backend", error);
      return [];
    });
}

function renderSection(articles) {
  let sectionHTML = "";

  if (articles.length > 0) {
    articles.forEach((article) => {
      if (article.urlToImage) {
        const cutDescription = article.description ? article.description.slice(0, 60) : "";
        sectionHTML += `
          <div class="grid">
            <img src="${article.urlToImage}" alt="News Image">
            <div class="souda">
              <p>${article.source?.name}</p>
              <span> • </span>
              <p>${new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
            <h4>${article.title}</h4>
            <div class="desc">${cutDescription}...</div>
          </div>
        `;
      }
    });
  } else {
    sectionHTML = "<p>No articles found.</p>";
  }

  section.innerHTML = sectionHTML;

  document.querySelectorAll(".grid").forEach((grid, index) => {
    grid.addEventListener("click", () => {
      displaySelectedNews(articles[index], section);
    });
  });
}

async function fetchAndRenderData(topic) {
  try {
    const articles = await fetchData(encodeURIComponent(topic));
    renderSection(articles);
  } catch (error) {
    console.error("Error fetching and rendering data:", error);
  }
}

function setTopicInSessionStorage(topic) {
  sessionStorage.setItem("selectedTopic", topic);
}

function getTopicFromSessionStorage() {
  return sessionStorage.getItem("selectedTopic");
}

function init() {
  const defaultTopic = "science";
  const storedTopic = getTopicFromSessionStorage() || defaultTopic;
  fetchAndRenderData(storedTopic);
  setTopicInSessionStorage(storedTopic);

  const topics = ["science", "technology", "sport", "entertainment", "health"];

  topics.forEach((topic) => {
    document.getElementById(topic).addEventListener("click", function () {
      fetchAndRenderData(topic);
      setTopicInSessionStorage(topic);
    });
  });

  document.querySelectorAll(".nav-link").forEach((navLink) => {
    navLink.addEventListener("click", function () {
      const topic = this.getAttribute("data-topic");
      fetchAndRenderData(topic);
      setTopicInSessionStorage(topic);
    });
  });
}

function displaySelectedNews(article) {
  section.innerHTML = `
    <div class="news-content">
      <h1 class="heading">${article.title}</h1>
      <p class="date">${new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })}</p>
      <img class="image" src="${article.urlToImage}" alt="News Image" />
      <p class="sub-content">${article.description}</p>
      <p class="source">By ${article.source.name}</p>
      <p class="content"> ${article.content}</p>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", init);
