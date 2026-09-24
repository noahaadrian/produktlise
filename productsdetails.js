const id = new URLSearchParams(window.location.search).get("id");
console.log(id);

const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

const product = document.querySelector("#product");
const backbutton = document.querySelector("#backbutton");

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(element) {
  console.log(element);
  product.innerHTML = `
    <img src = https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp>
    <h2>${element.gender}</h2>
    <h3>${element.brandname}</h3>
    <p>${element.price}</p>
    <p>${element.subcategory}</p>
    `;
}

backbutton.addEventListener("click", () => {
  window.location.href = "index.html";
});
