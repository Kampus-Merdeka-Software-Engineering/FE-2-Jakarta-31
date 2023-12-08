const API_KEY = "eb078876cc9e4ab389e506a9aa8df764";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchData(["lifestyle", "technology", "sports", "entertainment", "politics"]));

async function fetchData(topic) {
  const query = encodeURIComponent(topic);
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  return data;
}

function renderSection(arr) {
  let section = document.querySelector("section");
  let sectionHTML = "";

  // Check if arr is defined and has a length
  if (arr && arr.length) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].urlToImage) {
        const cutDescription = arr[i].description ? arr[i].description.slice(0, 85) : "";
        sectionHTML += `
            <div class="grid">
              <img src="${arr[i].urlToImage}" alt="News Image">
              <div class="souda">
                <p>${arr[i].source?.name}</p>
                <span> • </span>
                <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
              </div>
              <h4>${arr[i].title}</h4>
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
      displaySelectedNews(arr[index]);
    });
  });
}

async function fetchAndRenderData(topic) {
  const query = encodeURIComponent(topic);
  try {
    const data = await fetchData(query);

    // Check if data.articles is defined and has length
    if (data && data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
      renderSection(data.articles);
    } else {
      console.error("Invalid data structure or empty articles array:", data);
      // Handle the error or provide a default behavior
    }
  } catch (error) {
    console.error("Error fetching and rendering data:", error);
    // Handle the error or provide a default behavior
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
