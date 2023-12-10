const API_KEY_1 = "6mNUZwpweLSGR8lu7sQSIeXzfTrgyeZa1xp03b04";
const url1 = "https://api.thenewsapi.com/v1/news/all?";

const requestOptions = {
  method: "GET",
};

async function fetchData(api, params) {
  const esc = encodeURIComponent;
  const query = Object.keys(params)
    .map(function (k) {
      return esc(k) + "=" + esc(params[k]);
    })
    .join("&");

  const url = api === "api1" ? `${url1}${query}` : `${url1}${query}&apiKey=${API_KEY_1}`;

  const res = await fetch(url, requestOptions);
  const data = await res.json();
  return data;
}

function renderSection(arr) {
  let section = document.querySelector("section");
  let sectionHTML = "";

  if (arr && arr.articles && Array.isArray(arr.articles) && arr.articles.length > 0) {
    for (let i = 0; i < arr.articles.length; i++) {
      if (arr.articles[i].urlToImage) {
        const cutDescription = arr.articles[i].description ? arr.articles[i].description.slice(0, 85) : "";
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
            ${cutDescription}
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

async function fetchAndRenderData(api, params) {
  try {
    const data = await fetchData(api, params);

    if (data && data.articles) {
      renderSection(data);
    } else {
      console.error("Invalid data structure or empty articles array:", data);
    }
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
fetchAndRenderData("api1", { api_token: API_KEY_1, categories: "business,tech", search: storedTopic, limit: "50" });
setTopicInSessionStorage(storedTopic);

const topics = ["lifestyle", "technology", "sports", "entertainment", "politics"];

topics.forEach((topic) => {
  document.getElementById(topic).addEventListener("click", function () {
    fetchAndRenderData("api1", { api_token: API_KEY_1, categories: "lifestyle,tech,sports,entertainment,politics", search: topic, limit: "50" });
    setTopicInSessionStorage(topic);
  });
});

document.querySelectorAll(".nav-link").forEach((navLink) => {
  navLink.addEventListener("click", onNavItemClick);
});

function onNavItemClick() {
  const topic = this.getAttribute("data-topic");
  fetchAndRenderData("api1", { api_token: API_KEY_1, categories: "lifestyle,tech,sports,entertainment,politics", search: topic, limit: "50" });
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
