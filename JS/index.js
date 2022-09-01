const randomButton = document.getElementById("randomBtn");
const searchButton = document.getElementById("searchBtn");
const searchInput = document.getElementById("inputText");
const titleList = document.getElementById("titleListMeals");
let input;

const divList = document.getElementById("listMeals");
const listModal = document.getElementById("listModal");

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

// Event 1
randomButton.addEventListener("click", function () {
  getMealRandom().then(function (data) {
    searchInput.value = "";
    clearLists();
    buildListMeals(data);
    buildListModal(data);
    titleList.textContent = "Recipe Random";
  });
});

// Event 2
searchButton.addEventListener("click", function () {
  if (searchInput.value !== "") processSearch();
});

// Event 3
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && searchInput.value !== "") processSearch();
});

//  funcion para los eventos
function processSearch() {
  getMealMach(searchInput.value)
    .then(function (data) {
      input = searchInput.value;
      searchInput.value = "";
      clearLists();
      buildListMeals(data);
      buildListModal(data);
      titleList.textContent = `(${data.meals.length}) Recipe(s) for "${input}"`;
    })
    .catch(function () {
      titleList.textContent = "Not found the recipe";
    });
}

// Funcion para construir lista de modals
function buildListModal(data) {

  Array.from(data.meals).forEach((meal) => {
    let divFade = document.createElement("div");
    let divDialog = document.createElement("div");
    let divContent = document.createElement("div");
    let divHeader = document.createElement("div");
    let modalTitle = document.createElement("h2");
    let buttonClose = document.createElement("button");
    let divBody = document.createElement("div");
    let divRow = document.createElement("div");
    let imgModal = document.createElement("img");
    let listIngredient = document.createElement("ul");
    let ingredientTitle = document.createElement("h4");
    let instructionsTitle = document.createElement("h4");
    let instructionsBody = document.createElement("p");
    let divFooter = document.createElement("div");
    let buttonCloseFooter = document.createElement("button");

    divFade.className = "modal fade";
    divFade.id = `Modal${meal.idMeal}`;
    divFade.setAttribute("tabindex", "-1")
    divFade.setAttribute("aria-labelledby", 
    `${meal.strMeal.split(" ").join("")}`);
    divFade.setAttribute("aria-hidden","true");
    divDialog.className = "modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl";
    divContent.className = "modal-content";
    divHeader.className = "modal-header";
    modalTitle.className = "modal-title";
    modalTitle.textContent = `${meal.strMeal}`;
    buttonClose.className = "btn-close";
    buttonClose.type = "button";
    buttonClose.setAttribute("data-bs-dismiss","modal");
    buttonClose.setAttribute("aria-label", "Close");
    divBody.className = "modal-body";
    divRow.className = "row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 g-4";
    imgModal.className = "rounded float-start";
    imgModal.alt = meal.strMeal.split(" ").join("");
    imgModal.src = meal.strMealThumb;
    listIngredient.className = "list-group list-group-flush";
    ingredientTitle.textContent = "Ingredients";
    listIngredient.appendChild(ingredientTitle);
    //  Ciclo ingredientes
    for (let i = 1; i <= 20 ; i++) {
      let ingredient = document.createElement("li");

      ingredient.className = "list-group-item";
      if (!!meal[`strIngredient${i}`]) {
        ingredient.textContent = 
        `${meal[`strIngredient${i}`]}: ${meal[`strMeasure${i}`]}`;
        listIngredient.appendChild(ingredient);
      }
    }
    instructionsTitle.textContent = "Instructions";
    instructionsTitle.id = "instructionsTitle";
    //  valida si tiene un link a youtube
    if (!!meal.strYoutube) {
      let linkYoutube = document.createElement("a");
      let imgYoutube = document.createElement("img");
      
      linkYoutube.href = `${meal.strYoutube}`;
      linkYoutube.target = "_blank";
      // data-bs-toggle="tooltip" data-bs-placement="top" title="API"
      imgYoutube.setAttribute("data-bs-toggle", "tooltip");
      imgYoutube.setAttribute("data-bs-placement", "top");
      imgYoutube.setAttribute("title", "Youtube");
      imgYoutube.src = "img/youtube.svg";
      imgYoutube.width = "40";
      imgYoutube.height = "34";
      instructionsTitle.appendChild(linkYoutube);
      linkYoutube.appendChild(imgYoutube);
    }
    instructionsBody.className = "lh-lg";
    instructionsBody.id = "instructionBody";
    instructionsBody.innerHTML = `${meal.strInstructions
      .replaceAll('\r\n', '<br>')}`;
    divFooter.className = "modal-footer";
    buttonCloseFooter.className = "btn btn-secondary";
    buttonCloseFooter.type = "button";
    buttonCloseFooter.setAttribute("data-bs-dismiss","modal");
    buttonCloseFooter.textContent = "Close";

    listModal.appendChild(divFade);
    divFade.appendChild(divDialog);
    divDialog.appendChild(divContent);
    divContent.appendChild(divHeader);
    divHeader.appendChild(modalTitle);
    divHeader.appendChild(buttonClose);
    divContent.appendChild(divBody);
    divBody.appendChild(divRow);
    divRow.appendChild(imgModal);
    divRow.appendChild(listIngredient);
    divBody.appendChild(instructionsTitle);
    divBody.appendChild(instructionsBody);
    divContent.appendChild(divFooter);
    divFooter.appendChild(buttonCloseFooter);
  });
};

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
    divCard.dataset.bsToggle = "modal";
    divCard.dataset.bsTarget = `#Modal${meal.idMeal}`;
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

// Funcion para vaciar lista de resultados y modals
function clearLists() {
  Array.from(divList.children).forEach((divCol) => divList.removeChild(divCol));
  Array.from(listModal.children).forEach((divMod) => listModal.removeChild(divMod));
}