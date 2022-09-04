import imgYt from '../assets/youtube.svg';
const titleList = document.getElementById("titleListMeals");
const divList = document.getElementById("listMeals");
let input;
const listResults = [];
//  events
const randomButton = document.getElementById("randomBtn");
const searchButton = document.getElementById("searchBtn");
const searchInput = document.getElementById("inputText");

// Funcion API random
function getMealRandom() {
  return fetch("https://themealdb.com/api/json/v1/1/random.php").then(
    (response) => response.json()
  );
}
// Funcion API search
function getMealMach(value) {
  if (value !== "") {
    return fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    ).then((response) => response.json());
  }
}
// Funcion API for id
function getMealId(id) {
    return fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(
      (response) => response.json()
    );

}

// Event Click random
randomButton.addEventListener("click", function () {
  getMealRandom().then(function (data) {
    //  limpia barra de busqueda
    searchInput.value = "";
    clearListsResults();
    buildListMeals(data);
    eventModal();
    titleList.textContent = "Recipe Random";
  });
});

// Event click search
searchButton.addEventListener("click", function () {
  if (searchInput.value !== "") processSearch();
});

// Event key enter
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && searchInput.value !== "") processSearch();
});

// Event modal
function eventModal() {
  listResults.forEach(function (cardMeal) {
    cardMeal.addEventListener("click", function () {
      getMealId(cardMeal.id).then((meal) => buildModal(meal.meals[0]));
    });
  });
}

//  funcion para los eventos buttons and key "enter"
function processSearch() {
  getMealMach(searchInput.value)
    .then(function (data) {
      //  dato para mostrar title list
      input = searchInput.value;
      //  limpia barra de busqueda
      searchInput.value = "";
      clearListsResults();
      buildListMeals(data);
      eventModal();
      titleList.textContent = `(${data.meals.length}) Recipe(s) for "${input}"`;
    })
    .catch(function () {
      titleList.textContent = "Not found the recipe";
    });
}

// Funcion para construir modal
function buildModal(meal) {
  let modalTitle = document.getElementById("modalTitle");
  let imgMeal = document.getElementById("imgMeal");
  let ingredientsList = document.getElementById("ingredientsList");
  let instructionsTitle = document.getElementById("instructionsTitle");
  let instructionBody = document.getElementById("instructionBody");

  modalTitle.textContent = `${meal.strMeal}`;
  imgMeal.alt = meal.strMeal.split(" ").join("");
  imgMeal.src = meal.strMealThumb;
  //  ciclo ingredientes
  clearNodo(ingredientsList);
  for (let i = 1; i <= 20; i++) {
    let ingredient = document.createElement("li");

    ingredient.className = "list-group-item";
    if (!!meal[`strIngredient${i}`]) {
      ingredient.innerHTML = `<img height="40px" src="https://www.themealdb.com/images/ingredients/${
        meal[`strIngredient${i}`]
      }-Small.png">
        ${meal[`strIngredient${i}`]}: ${meal[`strMeasure${i}`]}.`;
      ingredientsList.appendChild(ingredient);
    }
  }
  clearNodo(instructionsTitle);
  if (!!meal.strYoutube) {
    let linkYoutube = document.createElement("a");
    let imgYoutube = document.createElement("img");

    linkYoutube.href = `${meal.strYoutube}`;
    linkYoutube.target = "_blank";
    imgYoutube.setAttribute("data-bs-toggle", "tooltip");
    imgYoutube.setAttribute("data-bs-placement", "top");
    imgYoutube.setAttribute("title", "Youtube");
    imgYoutube.src = `${imgYt}`;
    imgYoutube.width = "40";
    imgYoutube.height = "34";
    instructionsTitle.appendChild(linkYoutube);
    linkYoutube.appendChild(imgYoutube);
  };
  instructionBody.innerHTML = `${meal.strInstructions.replaceAll(
    "\r\n",
    "<br>"
  )}`;
}

// Funcion para construir lista de resultados
function buildListMeals(data) {
  Array.from(data.meals).forEach((meal) => {
    let divCol = document.createElement("div");
    let divCard = document.createElement("div");
    let cardImage = document.createElement("img");
    let cardBody = document.createElement("div");
    let titleBody = document.createElement("h5");

    divCol.className = "col";
    divCard.className = "card h-100";
    divCard.id = `${meal.idMeal}`;
    divCard.dataset.bsToggle = "modal";
    divCard.dataset.bsTarget = "#modalMeal";
    listResults.push(divCard);
    cardImage.className = "card-img-top";
    cardImage.alt = meal.strMeal.split(" ").join("");
    cardImage.src = meal.strMealThumb;

    cardBody.className = "card-body d-flex justify-content-center align-items-center";
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
function clearListsResults() {
  Array.from(divList.children).forEach((divCol) => divList.removeChild(divCol));
  listResults.splice(0);
}
// Funcion para vaciar nodo
function clearNodo(nodo) {
  Array.from(nodo.children).forEach((children) =>
    nodo.removeChild(children)
  );
}