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
    });
  }
});
