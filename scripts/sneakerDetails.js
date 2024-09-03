import "../style.css";
import { getSessionToken } from "../libraries/session-manager.js";
import axios from "axios";


const urlParams = new URLSearchParams(window.location.search);
const sneakerId = urlParams.get("sneakerId");


async function fetchSneakerDetails(sneakerId) {
  const sessionToken = getSessionToken();

  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/sneaker/item/${sneakerId}`,
      headers: { Authorization: `Bearer ${sessionToken}` },
    });

    if (response.data) {
      displaySneakerDetails(response.data);
    } else {
      console.error("Unexpected response format:", response.data);
    }
  } catch (error) {
    console.error("Error fetching sneaker details:", error.message);
  }
}

function displaySneakerDetails(sneaker) {
  const photoContainer = document.getElementById("sneakerPicture");
  const nameContainer = document.getElementById("nameContainer");
  const sizeContainer = document.getElementById("size");
  const colorContainer = document.getElementById("color");
  const priceContainer = document.getElementById("price");

//   const sizes = sneaker.sizes;
//   const colors = sneaker.colors;

  photoContainer.innerHTML = `
    <img src="${sneaker.imageURL}" alt="${sneaker.name}" class="w-full mb-3 rounded-md">`;

  nameContainer.innerHTML = `
    <h2 class="text-2xl font-bold">${sneaker.name}</h2>`;

//   sizeContainer.innerHTML = sizes
//     .map(
//       (size) => `
//     <button class="size-option border border-gray-300 px-3 py-1 rounded text-sm ${
//       size === sizes[0] ? "border-black font-bold" : ""
//     } hover:border-black hover:font-bold">${size}</button>`
//     )
//     .join("");

//   colorContainer.innerHTML = colors
//     .map(
//       (color) => `
//     <div class="color-option w-8 h-8 rounded-full border border-gray-300" style="background-color: ${color};"></div>`
//     )
//     .join("");

  priceContainer.innerText = `$${sneaker.price}`;
}


let quantity = 0;
const quantityDisplay = document.getElementById("quantity");

document.querySelectorAll(".quantity-btn").forEach((button) => {
  button.addEventListener("click", function () {
    if (this.textContent === "+") {
      quantity++;
    } else if (this.textContent === "-" && quantity > 0) {
      quantity--;
    }
    quantityDisplay.textContent = quantity;
  });
});

document
  .getElementById("toggleButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const descriptionText = document.getElementById("descriptionText");
    const toggleButton = document.getElementById("toggleButton");

    if (descriptionText.classList.contains("h-10")) {
      descriptionText.classList.remove("h-10", "overflow-hidden");
      descriptionText.classList.add("h-auto");
      toggleButton.textContent = "view less..";
    } else {
      descriptionText.classList.remove("h-auto");
      descriptionText.classList.add("h-10", "overflow-hidden");
      toggleButton.textContent = "view more..";
    }
  });

if (sneakerId) {
  fetchSneakerDetails(sneakerId);
}