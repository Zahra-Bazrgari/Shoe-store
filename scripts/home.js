import "../style.css";
import Swiper from "swiper";
import "swiper/css";
import { getUserInfo } from "../Apis/services/user.service.js";
import { errorHandler } from "../libraries/errorHandler.js";
import { urls } from "../Apis/urls.js";
import { httpClient } from "../Apis/client.js";
import axios from "axios";
import { getSessionToken } from "../libraries/session-manager.js";

let selectedBrand = null; 
let allSneakers = [];
let debounceTimeout = null;

async function main() {
  try {
    const response = await getUserInfo();
    console.log(response);
  } catch (error) {
    errorHandler(error);
  }
}

async function displayGreeting() {
  const greetingElement = document.getElementById("greeting");
  const userNameElement = document.querySelector(".username");

  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good night";
  }
  greetingElement.textContent = `${greeting} 👋`;

  try {
    const response = await getUserInfo();
    const userName = response.username;

    userNameElement.textContent = `${userName}!`;
  } catch (error) {
    userNameElement.textContent = "Hello, Guest!";
  }
}

async function fetchSneakers(page = 1, limit = 100) {
  const sessionToken = getSessionToken();

  let url = `http://localhost:3000/sneaker?page=${page}&limit=${limit}`;

  try {
    const response = await axios({
      method: "get",
      url: url,
      headers: { Authorization: `Bearer ${sessionToken}` },
    });

    console.log("Get sneakers response: ", response);
    allSneakers = response.data.data; 
    generateBrandButtons(); 
    renderSneakers(1, 10);
  } catch (error) {
    errorHandler(error)
  }
}

function generateBrandButtons() {
  const container = document.getElementById("brandContainer");
  container.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.classList = "px-4 py-2 rounded-full bg-black text-white no-wrap";
  allButton.innerText = "All";
  allButton.addEventListener("click", () => handleBrandSelection(allButton, null));
  container.appendChild(allButton);

  const uniqueBrands = [...new Set(allSneakers.map(sneaker => sneaker.brand))];
  
  uniqueBrands.forEach((brand) => {
    const button = document.createElement("button");
    button.classList = "text-nowrap px-4 py-2 rounded-full border border-gray-300 text-gray-700 no-wrap";
    button.innerText = brand;
    button.addEventListener("click", () => handleBrandSelection(button, brand));
    container.appendChild(button);
  });
}

function handleBrandSelection(button, brand) {
  const buttons = document.querySelectorAll("#brandContainer button");
  buttons.forEach((btn) => btn.classList = "text-nowrap px-4 py-2 rounded-full border border-gray-300 text-gray-700 no-wrap");

  button.classList = "no-wrap px-4 py-2 rounded-full bg-black text-white";

  selectedBrand = brand;
  renderSneakers(1, 10); 
}

function renderSneakers(page = 1, limit = 10) {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";

  const filteredSneakers = selectedBrand ? allSneakers.filter(sneaker => sneaker.brand === selectedBrand) : allSneakers;
  const totalSneakers = filteredSneakers.length;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const sneakersToDisplay = filteredSneakers.slice(startIndex, endIndex);

  sneakersToDisplay.forEach((sneaker) => {
    const card = document.createElement("div");
    card.classList = "no-wrap card flex flex-col items-start bg-white p-1 rounded-lg";
    card.innerHTML = `
      <img src="${sneaker.imageURL}" alt="${sneaker.name}" class="rounded-lg mb-4 w-full max-h-48">
      <h2 class="text-lg font-semibold truncate max-w-full">${sneaker.name}</h2>
      <p class="text-gray-500">$${sneaker.price}</p>
    `;

    card.addEventListener("click", () => navigateToDetailsPage(sneaker.id)); 

    cardContainer.appendChild(card);
  });

  togglePagination(true); 
  createPagination(totalSneakers, page, limit);
}

function createPagination(totalItems, currentPage = 1, limit = 10) {
  const paginationContainer = document.querySelector("#pagination");
  paginationContainer.innerHTML = ""; 
  const totalPages = Math.ceil(totalItems / limit);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.classList = `px-4 py-2 rounded-full ${
      i === currentPage ? "bg-black text-white" : "bg-white text-black"
    }`;
    button.innerText = i;

    button.addEventListener("click", () => {
      renderSneakers(i, limit);
    });

    paginationContainer.appendChild(button);
  }
}

function searchSneakers(item) {
  const filteredSneakers = allSneakers.filter(sneaker =>
    sneaker.name.toLowerCase().includes(item.toLowerCase()) ||
    sneaker.brand.toLowerCase().includes(item.toLowerCase())
  );

  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";

  if (filteredSneakers.length > 0) {
    filteredSneakers.forEach((sneaker) => {
      const card = document.createElement("div");
      card.classList = "no-wrap card flex flex-col items-start bg-white p-1 rounded-lg";
      card.innerHTML = `
        <img src="${sneaker.imageURL}" alt="${sneaker.name}" class="rounded-lg mb-4 w-full max-h-48">
        <h2 class="text-lg font-semibold truncate max-w-full">${sneaker.name}</h2>
        <p class="text-gray-500">$${sneaker.price}</p>
      `;

      card.addEventListener("click", () => navigateToDetailsPage(sneaker.id)); 

      cardContainer.appendChild(card);
    });
  } else {
    const noResults = document.createElement("div");
    noResults.classList = "w-screen flex flex-col justify-center items-center text-center"; 
    noResults.innerHTML = `
        <img src="pictures/Screenshot 2024-09-03 023813.png" alt="Not Found">
        <p class="font-bold">Not Found</p>
        <p>Sorry, the keyword you entered cannot be found. Please check again or search with another keyword.</p>
    `;
    cardContainer.appendChild(noResults);
  }

  togglePagination(false); 
}

function togglePagination(show) {
  const paginationContainer = document.querySelector("#pagination");
  if (paginationContainer) {
    paginationContainer.style.display = show ? "block" : "none";
  }
}

function handleSearch(event) {
  const query = event.target.value.trim();

  if (debounceTimeout) clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    searchSneakers(query);
  }, 1500);
}

function navigateToDetailsPage(sneakerId) {
  window.location.href = `/sneakers.html?sneakerId=${sneakerId}`;
}


document.getElementById("search-box").addEventListener("input", handleSearch);

document.addEventListener("DOMContentLoaded", () => {
  main();
  displayGreeting();
  fetchSneakers(); 
});