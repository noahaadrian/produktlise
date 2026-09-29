const cat = new URLSearchParams(window.location.search).get("cat");
console.log(cat);

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${cat}`;
const produktliste = document.querySelector(".produktliste");

document.querySelectorAll("#filtre button").forEach((knap) => knap.addEventListener("click", filtrer));

function filtrer(e) {
  console.log(e.target.textContent);
  console.log(alleData, udsnit);
  const valgt = e.target.textContent;
  if (valgt == "Alle") {
    udsnit = alleData;
  } else {
    udsnit = alleData.filter((produkt) => produkt.gender == valgt);
  }
}

let alleData, udsnit;

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    alleData = udsnit = data;
    visData(data);
  });

const h2 = document.querySelector("h2");
h2.textContent = cat;

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(json) {
  console.log(json);
  json.forEach((produkt) => {
    const tilbudspris = Math.round((produkt.price * (100 - produkt.discount)) / 100);
    produktliste.innerHTML += `
      <a href="productsdetails.html?id=${produkt.id}" class="${produkt.soldout ? "udsolgt" : ""}">
        <article class="card">
          ${produkt.soldout ? '<span class="badge">Udsolgt</span>' : ""}
          ${produkt.discount ? `<span class="badge tilbud">-${produkt.discount}%</span>` : ""}
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp" alt="produktbillede" />
          <h2>${produkt.productdisplayname}</h2>
          <h3>${produkt.brandname}</h3>
          <p class="price">
            ${produkt.discount ? `<s>kr. ${produkt.price},-</s> Nu kr. ${tilbudspris},-` : `kr. ${produkt.price},-`}
          </p>
          <p>${produkt.subcategory}</p>
        </article>
      </a>`;
  });
}
