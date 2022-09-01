const searchBtn = document.getElementById("search-btn")
const mealList = document.getElementById("meal")
const mealDetailsContent = document.querySelector(".meal-details-content")
const recipeCloseBtn = document.getElementById("recipe-close-btn")
const searchLetter = document.querySelector(".search-letter")
const input = document.getElementById("inputText")
const random = document.getElementById("random")

// Event Listeners
searchBtn.addEventListener("click", getMealList)
mealList.addEventListener("click", getMealRecipe)
input.addEventListener("keyup", EnterGo)
random.addEventListener("click", getRandomMeal)
// recipeCloseBtn.addEventListener("click", () => {
//     mealDetailsContent.parentElement.classList.remove("showRecipe")
// });
// searchLetter.addEventListener("click", getMealByFirstLetter)

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
//searchLetter.innerHTML = html;

// Get Recipe List by First Letter
function getMealByFirstLetter(e) {
    // let mealLetter = e.target.dataset.id
    // fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         let html = ""
    //         if (data.meals) {
    //             data.meals.forEach((meal) => {
    //                 html += `
    //         <div class="meal-item">
    //             <div class="meal-img" data-id="${meal.idMeal}">
    //                 <img src="${meal.strMealThumb}" alt="food" />
    //             </div>
    //             <div class="meal-name" data-id="${meal.idMeal}">
    //                 <h3>${meal.strMeal}</h3>
    //                 <a href="#" class="recipe-btn">Show Recipe</a>
    //                 <a href="#" class="recipe-btn-ingredient">Show ingredients</a>
    //             </div>
    //         </div>
    //           `
    //             })
    //             mealList.classList.remove("notFound")
    //         } else {
    //             html = "Ops, Not found the recipe!"
    //             mealList.classList.add("notFound")
    //         }

    //         mealList.innerHTML = html
    //     })
}

// load first recipes
// fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
//     .then((response) => response.json())
//     .then((data) => {
//         let html = ""
//         if (data.meals) {
//             data.meals.forEach((meal) => {
//                 html += `
//         <div class="meal-item">
//             <div class="meal-img" data-id="${meal.idMeal}">
//                 <img src="${meal.strMealThumb}" alt="food" />
//             </div>
//             <div class="meal-name" data-id="${meal.idMeal}">
//                 <h3>${meal.strMeal}</h3>
//                 <a href="#" class="recipe-btn">Show Recipe</a>
//                 <a href="#" class="recipe-btn-ingredient">Show ingredients</a>

//             </div>
//         </div>
//             `
//             })
//         }
//         mealList.innerHTML = html
    // })

// get recipes list when button is clicked
function getMealList() {
    let searchInputTxt = document.getElementById("inputText").value.trim()
    fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`
    )
        .then((response) => response.json())
        .then((data) => {
            let html = ""
            if (data.meals) {
                data.meals.forEach((meal) => {
                    html += `
                    <div class="col">
                    <div class="card h-100 " data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body" id="${meal.idMeal}">
                            <h5 class="card-title text-center">${meal.strMeal}</h5>
                            <a href="#" class="recipe-btn">Recipe</a>
                            <a href="#" class="recipe-btn-ingredient">Ingredients</a>                             
                        </div>
                    </div>
                    </div>`;
                })
                mealList.classList.remove("notFound")
            } else {
                html = "Ops, Recipe not found!"
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
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`
        )
            .then((response) => response.json())
            .then((data) => mealRecipeModal(data.meals))
    } else if (e.target.classList.contains("recipe-btn-ingredient")) {
        let mealItem = e.target.parentElement
        fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`
        )
            .then((response) => response.json())
            .then((data) => mealIngredientsModal(data.meals))
    }

}

//create modal
function mealRecipeModal(meal) {
    meal = meal[0]
    let html = `
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>    
    <p class="recipe-category"><b>#${meal.strCategory}  #${meal.strArea}</b></p>
    <div class="recipe-instruct" style="padding: 10px; max-height: 400px; overflow-y: scroll;">
        <h3>Instructions</h3>
        <p style="text-align: justify;">${meal.strInstructions}</p>
    </div>
    <div class="recipe-link">
        
    </div>  
    <div class="modal-footer">
    <a href="${meal.strYoutube}" target="_blank"><img height="40px" src="img/yt.png"></a>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>    
    `

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
            ingredientsList.push(`
            <img height="20px" src="https://www.themealdb.com/images/ingredients/${ingredients[i]}-Small.png">
            ${ingredients[i]} - ${measurements[i]}`)
        }
        i++
    }
    let html = `
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>     
    <div class="recipe-ingredients">
        <h3>Ingredients</h3>
        <ul class="ingredients-list">
            ${ingredientsList.map((ingredient) => `<p>${ingredient}</p>`).join("")}
        </ul>
    </div>
    </div>  
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>`

    mealDetailsContent.innerHTML = html
    mealDetailsContent.parentElement.classList.add("showRecipe")
}

//Detect when Enter key was pressed
function EnterGo(e){
    if (e.key === "Enter") { getMealList() }    
}


// get random recipe when button is clicked
function getRandomMeal() {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((response) => response.json())
        .then((data) => {
            let html = ""
            if (data.meals) {
                data.meals.forEach((meal) => {
                    html += `
                    <div class="col">
                    <div  class="card h-100 " data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body" id="${meal.idMeal}">
                            <h5 class="card-title text-center">${meal.strMeal}</h5>
                            <a href="#" class="recipe-btn">Recipe</a>
                            <a href="#" class="recipe-btn-ingredient">Ingredients</a>                            
                        </div>
                    </div>
                    </div>`;
                })
                mealList.classList.remove("notFound")
            } else {
                html = "Ops, Recipe not found!"
                mealList.classList.add("notFound")
            }

            mealList.innerHTML = html
        })
}
