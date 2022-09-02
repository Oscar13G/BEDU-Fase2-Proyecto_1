function buildRecipeCard(data) {
  const card = document.createElement("div");
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
    '<img src="img/pizza.jpg" class="card-img-top" alt="..." />' +
    '<div class="card-body">' +
    '<h5 class="card-title">Pizza Planeta</h5>' +
    '<div class="card-btn">' +
    '<a href="#" class="btn">Ver receta</a>' +
    "</div>" +
    "</div>" +
    "</div>";
  return card;
}
export { buildRecipeCard };
{
  /* <div
          class="col-12 col-md-4 mx-auto d-flex justify-content-center card-container"
        >
          <div class="card card-meal" style="width: 18rem">
            <img src="img/pizza.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Pizza Planeta</h5>
              <div class="card-btn">
                <a href="#" class="btn">Ver receta</a>
              </div>
            </div>
          </div>
        </div> */
}
