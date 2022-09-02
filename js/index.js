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

document.querySelector("#randomBtn").addEventListener("click", function (e) {
  const pito = buildRecipeCard("alaska");
  document.getElementById("recipeContainer").append(pito);

  getMealRandom().then(function (data) {
    console.log(data);
    const card = buildRecipeCard(data);
    document.getElementById("recipeContainer").append(card);
    titleList.textContent = "Recipe Random";
  });
});
