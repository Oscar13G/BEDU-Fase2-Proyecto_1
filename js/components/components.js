//!Crear tarjeta de la receta
function buildRecipeCard(data) {
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
//!Crear tarjeta del ingrediente
function createCardIngredient(name, quantity) {
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
  img.src =
    "https://www.themealdb.com/images/ingredients/" +
    name.replace(" ", "%20") +
    "-Small.png";
  img.classList.add("img-fluid");
  imgCol.appendChild(img);
  let infoCol = document.createElement("div");
  infoCol.classList.add("col-10", "ingredient-info");
  infoCol.innerHTML =
    "<h5>Ingrediente: <span>" +
    name +
    "</span></h5>" +
    "<h5>Cantidad: <span>" +
    quantity +
    "</span></h5>";
  row.append(imgCol);
  row.append(infoCol);
  ingCard.append(row);
  return ingCard;
}
export { buildRecipeCard, createCardIngredient };
