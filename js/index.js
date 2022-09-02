import { buildRecipeCard } from "./components/components.js";
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
// Funcion API Meal Details
function getMealDetails(id_meal) {
  return fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id_meal
  ).then((response) => response.json());
}
function cleanRecipes() {
  document.getElementById("recipeContainer").innerHTML = "";
}
document.querySelector("#randomBtn").addEventListener("click", function (e) {
  cleanRecipes();
  getMealRandom().then(function (data) {
    const card = buildRecipeCard(data.meals[0]);
    document.getElementById("recipeContainer").append(card);
  });
  e.preventDefault();
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btnMealDetails")) {
    const id_meal = e.target.getAttribute("idMeal");
    getMealDetails(id_meal).then(function (data) {
      data = data.meals[0];
      console.log(data);

      document.getElementById("text-instrucciones").innerHTML =
        data.strInstructions;
      document.getElementById("modal-title").innerHTML = data.strMeal;
      document.getElementById("imgMeal").src = data.strMealThumb;
      document.getElementById("mealVideo").href = data.strYoutube;
      document.getElementById("ingredientList").innerHTML = "";
      for (let i = 1; i < 20; i++) {
        let actual = "strIngredient" + i;
        let actualQuantity = "strMeasure" + i;
        const ingredientName = data[actual];
        if (ingredientName != null && ingredientName != "") {
          const ingredientQuantity = data[actualQuantity];
          let ingCard = document.createElement("div");
          ingCard.classList.add("card-ingrediente");
          let row = document.createElement("div");
          row.classList.add("row");
          let imgCol = document.createElement("div");
          imgCol.classList.add(
            "col-2",
            "d-flex",
            "justify-content-center",
            "align-items-center"
          );
          let img = document.createElement("img");
          img.src = "a";
          img.classList.add("img-fluid");
          imgCol.appendChild(img);
          let infoCol = document.createElement("div");
          infoCol.classList.add("col-10", "ingredient-info");
          infoCol.innerHTML =
            "<h5>Ingrediente: <span>" +
            ingredientName +
            "</span></h5>" +
            "<h5>Cantidad: <span>" +
            ingredientQuantity +
            "</span></h5>";
          row.append(imgCol);
          row.append(infoCol);
          ingCard.append(row);
          document.getElementById("ingredientList").append(ingCard);
        } else {
          break;
        }
      }
    });
  }
});
