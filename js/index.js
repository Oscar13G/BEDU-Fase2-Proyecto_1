import {
  buildRecipeCard,
  createCardIngredient,
} from "./components/components.js";
const recipesTitle = document.getElementById("titleRecipesContainer");
// Funcion API random
function getMealRandom() {
  return fetch("https://themealdb.com/api/json/v1/1/random.php").then(
    (response) => response.json()
  );
}
// Funcion API search
function getMealMatch(value) {
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
//!Traer receta random al clicar el boton
document.querySelector("#randomBtn").addEventListener("click", function (e) {
  cleanRecipes();
  getMealRandom().then(function (data) {
    recipesTitle.innerHTML = "Recetas";
    const card = buildRecipeCard(data.meals[0]);
    document.getElementById("recipeContainer").append(card);
  });
  e.preventDefault();
});
//!Boton de busqueda
document.querySelector("#searchBtn").addEventListener("click", function (e) {
  cleanRecipes();
  const searchTerm = document.getElementById("searchInput").value;
  if (searchTerm != null && searchTerm != 0) {
    let recipesRequest = getMealMatch(searchTerm);
    recipesRequest.then(function (recipes) {
      if (recipes.meals) {
        recipesTitle.innerHTML =
          Object.keys(recipes.meals).length +
          " Recetas para la busqueda: " +
          searchTerm;
        recipes.meals.forEach(function (recipe) {
          const card = buildRecipeCard(recipe);
          document.getElementById("recipeContainer").append(card);
        });
      } else {
        recipesTitle.innerHTML = "Recetas no encontradas.";
      }
    });
  }
  e.preventDefault();
});
//!Agregar tarjeta y hacer append
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
          let ingCard = createCardIngredient(
            ingredientName,
            ingredientQuantity
          );
          document.getElementById("ingredientList").append(ingCard);
        } else {
          break;
        }
      }
    });
    openModal();
  }
});
//!Funciones para el modal
function openModal() {
  document.getElementById("backdrop").style.display = "block";
  document.getElementById("mealModal").style.display = "block";
  document.getElementById("mealModal").classList.add("show");
}
function closeModal() {
  document.getElementById("backdrop").style.display = "none";
  document.getElementById("mealModal").style.display = "none";
  document.getElementById("mealModal").classList.remove("show");
}
document.querySelectorAll(".btn-close-modal").forEach((item) => {
  item.addEventListener("click", function (e) {
    closeModal();
  });
});
//!Limpiar recetas
function cleanRecipes() {
  document.getElementById("recipeContainer").innerHTML = "";
}
