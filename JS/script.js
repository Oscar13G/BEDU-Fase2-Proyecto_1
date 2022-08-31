const randomButton = document.getElementById("randomBtn");
const searchButton = document.getElementById("searchBtn");
const searchInput = document.getElementById("inputText");
const titleList = document.getElementById("titleListMeals");
let input;

const divList = document.getElementById("listMeals");

function getMealRandom() {
  return fetch("https://themealdb.com/api/json/v1/1/random.php").then(
    (response) => response.json()
  );
}
function getMealMach(value) {
  if (value !== "") {
    return fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    ).then((response) => response.json());
  }
}

// Event 1
randomButton.addEventListener("click", function () {
  getMealRandom().then(function (data) {
    searchInput.value = "";
    clearListMeals();
    buildListMeals(data);
    titleList.textContent = "Recipe Random";
  });
});

// Event 2
searchButton.addEventListener("click", function () {
    if (searchInput.value !== '') processSearch();
});

// Event 3
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && searchInput.value !== '') 
  processSearch();
});

//  funcion para los eventos
function processSearch() {
  getMealMach(searchInput.value).then(function (data) {
    input = searchInput.value;
    searchInput.value = "";
    clearListMeals();
    buildListMeals(data);
    titleList.textContent = `(${data.meals.length}) Recipe(s) for "${input}"`;
  })
  .catch(function() {
    titleList.textContent = "Not found the recipe!";
  });

}
// Funcion para construir lista de resultados
function buildListMeals(data) {
  //   console.log(Array.from(data.meals));

  Array.from(data.meals).forEach((meal) => {
    let divCol = document.createElement("div");
    let divCard = document.createElement("div");
    let cardImage = document.createElement("img");
    let cardBody = document.createElement("div");
    let titleBody = document.createElement("h5");

    divCol.className = "col";
    divCard.className = "card h-100";
    divCard.dataset.bsToggle = "modal";
    divCard.dataset.bsTarget = `#${meal.idMeal}`;
    cardImage.className = "card-img-top";
    cardImage.alt = meal.strMeal.split(" ").join("");
    cardImage.src = meal.strMealThumb;
    cardBody.className = "card-body";
    titleBody.className = "card-title text-center";
    divList.appendChild(divCol);
    divCol.appendChild(divCard);
    divCard.appendChild(cardImage);
    divCard.appendChild(cardBody);
    cardBody.appendChild(titleBody);
    titleBody.appendChild(document.createTextNode(meal.strMeal));
  });
}
// Funcion para vaciar lista de resultados
function clearListMeals() {
  Array.from(divList.children).forEach((divCol) => divList.removeChild(divCol));
}