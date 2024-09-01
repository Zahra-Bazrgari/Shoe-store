import "../style.css";
import Swiper from "swiper";
import "swiper/css";
import { getUserInfo } from "../Apis/services/user.service.js";
import { errorHandler } from "../libraries/errorHandler.js";
import { urls } from "../Apis/urls.js";
import { httpClient } from "../Apis/client.js";
import axios from "axios";
import { getSessionToken } from "../libraries/session-manager.js";

// works fine
async function main() {
  try {
    const response = await getUserInfo();
    console.log(response);
  } catch (error) {
    errorHandler(error);
  }
}

// works fine
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
  greetingElement.textContent = `${greeting}`;

  try {
    const response = await getUserInfo();
    const userName = response.username;

    userNameElement.textContent = `${userName}!`;
  } catch (error) {
    userNameElement.textContent = "Hello, Guest!";
  }
}

// works fine, needs updates
async function getBrands() {
  const sessionToken = getSessionToken();
  console.log("Session Token:", sessionToken);

  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/sneaker/brands`,
      headers: { Authorization: `Bearer ${sessionToken}` },
    });

    console.log("Full Response:", response);

    if (Array.isArray(response.data)) {
      const brands = response.data;
      generateBrandButtons(brands);
    } else {
      console.log("Unexpected response format:", response.data);
    }
  } catch (error) {
    console.log("Error fetching brands:", error.message);
  }
}

// works fine, needs updates
function generateBrandButtons(brands) {
  const container = document.getElementById("brandContainer");
  container.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.className = "px-4 py-2 rounded-full bg-black text-white";
  allButton.innerText = "All";
  container.appendChild(allButton);

  brands.forEach((brand) => {
    const button = document.createElement("button");
    button.className =
      "px-4 py-2 rounded-full border border-gray-300 text-gray-700";
    button.innerText = brand;
    container.appendChild(button);
  });
}


async function fetchSneakers(page = 1, limit = 10) {
  const sessionToken = getSessionToken();
  console.log("Session Token:", sessionToken);

  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/sneaker?page=${page}&limit=${limit}`,
      headers: { Authorization: `Bearer ${sessionToken}` },
    });

    return response.data; // Return the fetched sneaker data
  } catch (error) {
    console.error("Error fetching sneakers:", error);
    return [];
  }
}

async function renderSneakers(page = 1, limit = 10) {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.innerHTML = ''; // Clear the card container

  const sneakers = await fetchSneakers(page, limit);

  sneakers.forEach((sneaker) => {
    const card = document.createElement('div');
    card.className = 'card flex flex-col items-center bg-white p-4 rounded-lg shadow-lg';

    card.innerHTML = `
      <img src="${sneaker.image}" alt="${sneaker.name}" class="w-full h-40 object-cover rounded-lg mb-4">
      <h2 class="text-lg font-semibold">${sneaker.name}</h2>
      <p class="text-gray-500">$${sneaker.price}</p>
    `;

    cardContainer.appendChild(card);
  });

  renderPagination(page, limit);
}


function renderPagination(currentPage, limit) {
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = ''; 

  for (let i = 1; i <= 5; i++) { //idk about the number of pages
    const pageButton = document.createElement('button');
    pageButton.className = `page-btn px-4 py-2 mx-1 bg-blue-500 text-white rounded-lg ${i === currentPage ? 'bg-blue-700' : ''}`;
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      renderSneakers(i, limit);
    });

    paginationContainer.appendChild(pageButton);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  main();
  displayGreeting();
  getBrands();
  renderSneakers(); 
});
