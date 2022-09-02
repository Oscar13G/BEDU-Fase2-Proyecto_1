function buildRecipeCard(data) {
  console.log(data);
  const card = document.createElement("div");
  const nombreReceta = data.strMeal;
  card.classList.add(
    "col-12",
    "col-md-4",
    "mx-auto",
    "d-flex",
    "justify-content-center",
    "card-container"
  );
  card.innerHTML =
    '<div class="card card-meal" style="width: 18rem">' +
    '<img src="' +
    data.strMealThumb +
    '" class="card-img-top" alt="..." />' +
    '<div class="card-body">' +
    '<h5 class="card-title">' +
    nombreReceta.substring(0, 18) +
    "</h5>" +
    '<div class="card-btn">' +
    '<a idMeal="' +
    data.idMeal +
    '" class="btn btnMealDetails">Ver receta</a>' +
    "</div>" +
    "</div>" +
    "</div>";
  return card;
}
export { buildRecipeCard };
