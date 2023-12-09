const API_KEY = "78667e112f1947cb964b5e3f4845b488";
const newsApiUrl = "https://newsapi.org/v2/everything?q=";
const customApiUrl = "https://be-2-jakarta-31-production.up.railway.app/news";

async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function renderSection(arr) {
  let section = document.querySelector("section");
  let sectionHTML = "";

  if (arr && arr.articles && Array.isArray(arr.articles) && arr.articles.length > 0) {
    for (let i = 0; i < arr.articles.length; i++) {
      if (arr.articles[i].urlToImage) {
        const cutDescription = arr.articles[i].description ? arr.articles[i].description.slice(0, 70) : "";
        sectionHTML += `
          <div class="grid">
            <img src="${arr.articles[i].urlToImage}" alt="News Image">
            <div class="souda">
              <p>${arr.articles[i].source?.name}</p>
              <span> • </span>
              <p>${new Date(arr.articles[i].publishedAt).toLocaleDateString()}</p>
            </div>
            <h4>${arr.articles[i].title}</h4>
            <div class="desc">
              ${cutDescription}...
            </div>
          </div>
        `;
      }
    }
  } else {
    sectionHTML = "<p>No articles found.</p>";
  }

  section.innerHTML = sectionHTML;

  document.querySelectorAll(".grid").forEach((grid, index) => {
    grid.addEventListener("click", () => {
      displaySelectedNews(arr.articles[index], section);
    });
  });
}

async function fetchAndRenderData(topic) {
  const newsApiQuery = encodeURIComponent(topic);
  const newsApiEndpoint = `${newsApiUrl}${newsApiQuery}&apiKey=${API_KEY}`;
  const customApiEndpoint = "https://be-2-jakarta-31-production.up.railway.app/news";

  try {
    const [newsApiData, customApiData] = await Promise.all([fetchData(newsApiEndpoint), fetchData(customApiEndpoint)]);

    if (newsApiData && newsApiData.articles) {
      renderSection(newsApiData);
    } else {
      console.error("Invalid data structure or empty articles array:", newsApiData);
    }

    // Use customApiData as needed
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

const defaultTopic = "lifestyle";
const storedTopic = getTopicFromSessionStorage() || defaultTopic;
fetchAndRenderData(storedTopic);
setTopicInSessionStorage(storedTopic);

const topics = ["lifestyle", "technology", "sports", "entertainment", "politics"];

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

function onNavItemClick() {
  const topic = this.getAttribute("data-topic");
  fetchAndRenderData(topic);
  setTopicInSessionStorage(topic);
}

function displaySelectedNews(article) {
  const section = document.querySelector("section");
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
