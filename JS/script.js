const searchBtn = document.getElementById("search-btn")
const mealList = document.getElementById("meal")
const mealDetailsContent = document.querySelector(".meal-details-content")
const recipeCloseBtn = document.getElementById("recipe-close-btn")
const searchLetter = document.querySelector(".search-letter")

// Event Listeners
searchBtn.addEventListener("click", getMealList)
mealList.addEventListener("click", getMealRecipe)
recipeCloseBtn.addEventListener("click", () => {
    mealDetailsContent.parentElement.classList.remove("showRecipe")
});
searchLetter.addEventListener("click", getMealByFirstLetter)

// Create Letter Menu
let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

let html = ""
for (let i = 0; i < letters.length; i++) {
    html += `
    <button type="submit" class="search-letter-btn letter-btn" id="search-${letters[i]}">
        <h6 data-id="${letters[i]}">${letters[i]}</h6>
    </button>
    `
}
searchLetter.innerHTML = html;

// Get Recipe List by First Letter
function getMealByFirstLetter(e) {
    let mealLetter = e.target.dataset.id
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`)
        .then((response) => response.json())
        .then((data) => {
            let html = ""
            if (data.meals) {
                data.meals.forEach((meal) => {
                    html += `
            <div class="meal-item">
                <div class="meal-img" data-id="${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="food" />
                </div>
                <div class="meal-name" data-id="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Show Recipe</a>
                    <a href="#" class="recipe-btn-ingredient">Show ingredients</a>
                </div>
            </div>
              `
                })
                mealList.classList.remove("notFound")
            } else {
                html = "Ops, Not found the recipe!"
                mealList.classList.add("notFound")
            }

            mealList.innerHTML = html
        })
}

// load first recipes
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    .then((response) => response.json())
    .then((data) => {
        let html = ""
        if (data.meals) {
            data.meals.forEach((meal) => {
                html += `
        <div class="meal-item">
            <div class="meal-img" data-id="${meal.idMeal}">
                <img src="${meal.strMealThumb}" alt="food" />
            </div>
            <div class="meal-name" data-id="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn">Show Recipe</a>
                <a href="#" class="recipe-btn-ingredient">Show ingredients</a>

            </div>
        </div>
            `
            })
        }
        mealList.innerHTML = html
    })

// get recipes list when button is clicked
function getMealList() {
    let searchInputTxt = document.getElementById("search-input").value.trim()
    fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`
    )
        .then((response) => response.json())
        .then((data) => {
            let html = ""
            if (data.meals) {
                data.meals.forEach((meal) => {
                    html += `
            <div class="meal-item">
                <div class="meal-img" data-id="${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="food" />
                </div>
                <div class="meal-name" data-id="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Show recipe</a>
                    <a href="#" class="recipe-btn-ingredient">Show ingredients</a>

                </div>
            </div>
              `;
                })
                mealList.classList.remove("notFound")
            } else {
                html = "Ops, Not found the recipe!"
                mealList.classList.add("notFound")
            }

            mealList.innerHTML = html
        })
}

// get Recipe
function getMealRecipe(e) {
    e.preventDefault()

    //open modal recipe or ingredients list

    if (e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.parentElement
        fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
        )
            .then((response) => response.json())
            .then((data) => mealRecipeModal(data.meals))
    } else if (e.target.classList.contains("recipe-btn-ingredient")) {
        let mealItem = e.target.parentElement
        fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
        )
            .then((response) => response.json())
            .then((data) => mealIngredientsModal(data.meals))
    }

}

//create modal
function mealRecipeModal(meal) {
    meal = meal[0]
    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="" />
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Assist video</a>
    </div>  `

    mealDetailsContent.innerHTML = html
    mealDetailsContent.parentElement.classList.add("showRecipe")
}

// create ingredients modal
function mealIngredientsModal(meal) {
    meal = meal[0]

    // mostrar ingredientes en una lista y si alguno tiene un null lo pone como "-"
    let ingredients = []
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(meal[`strIngredient${i}`])
        }
    }

    let measurements = []
    for (let i = 1; i <= 20; i++) {
        if (meal[`strMeasure${i}`]) {
            measurements.push(meal[`strMeasure${i}`])
        }
    }

    let ingredientsList = []
    let i = 0
    while (i < 20) {
        if (ingredients[i] !== undefined && measurements[i] !== undefined) {
            ingredientsList.push(`${ingredients[i]} - ${measurements[i]}`)
        }
        i++
    }
    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <div class="recipe-ingredients">
        <h3>Ingredients</h3>
        <ul class="ingredients-list">
            ${ingredientsList.map((ingredient) => `<p>${ingredient}</p>`).join("")}
        </ul>
    </div> `

    mealDetailsContent.innerHTML = html
    mealDetailsContent.parentElement.classList.add("showRecipe")
}
