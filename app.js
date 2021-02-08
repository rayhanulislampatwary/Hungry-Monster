const search = document.getElementById("search"),
  submit = document.getElementById("submit"),

  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");


  
function searchMeal(e) {
  e.preventDefault();
  resultHeading.innerHTML = ""; // your are looking for ""
  const term = search.value;

  if (term.trim()){
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then( (data) => {

        resultHeading.innerHTML = `<h4 class="d-flex justify-content-center p-5">your are looking for '${term}' </h4>`;
        if (data.meals === null) {
            resultHeading.innerHTML = `
            <h3 class="d-flex justify-content-center p-5"><i class="fas fa-frown"></i>  Sorry! This Item Not Founded </h3>
            `;
          }
          else {
             mealsEl.innerHTML = data.meals
            .map(
                (meal) => `
                <div class = "meal" onclick="singleItem('${meal.strMeal}')">
                <div class="meal-box" >
                <img class="meal-image" src="${meal.strMealThumb}" />
                <h3 class="d-flex justify-content-center">${meal.strMeal}</h3>
                <button class="btn btn-success d-flex justify-content-center" onclick="singleItem('${meal.strMeal}')"> Details </button>
                </div>
                
                </div>
                `
            )
            .join("");     
          }

      });


      search.value = "";
  }
  else {
      alert("please enter meal name");
  }
}

//EventListener
  submit.addEventListener("submit", searchMeal);


// single item show 
const singleItem = name =>{
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  fetch(url)
  .then(res => res.json())
  .then(data => singleItemShow(data));
  
}

const singleItemShow = item => {
  const mealSingleItem=item.meals[0];
  single_mealEl.innerHTML = `
  <div class="d-flex justify-content-center ">
  <div class="single-card">
  <img class="single-meal-img" src="${mealSingleItem.strMealThumb}">
  <h1 class="d-flex justify-content-center">${mealSingleItem.strMeal}</h1>
  <h2> Ingredients </h2> 
  <h6><i class="fas fa-chevron-circle-right"></i> ${mealSingleItem.strIngredient1}</h6>
  <h6><i class="fas fa-chevron-circle-right"></i> ${mealSingleItem.strIngredient2}</h6>
  <h6><i class="fas fa-chevron-circle-right"></i> ${mealSingleItem.strIngredient3}</h6>
  <h6><i class="fas fa-chevron-circle-right"></i> ${mealSingleItem.strIngredient4}</h6>
  <h6><i class="fas fa-chevron-circle-right"></i> ${mealSingleItem.strIngredient5}</h6>
  <h6><i class="fas fa-chevron-circle-right"></i> ${mealSingleItem.strIngredient6}</h6>
  <h6><i class="fas fa-chevron-circle-right"></i> ${mealSingleItem.strIngredient7}</h6>
  <h6><i class="fas fa-chevron-circle-right"></i> ${mealSingleItem.strIngredient8}</h6>
  <h6><i class="fas fa-chevron-circle-right"></i> ${mealSingleItem.strIngredient9}</h6>
  <h6><i class="fas fa-chevron-circle-right"></i> ${mealSingleItem.strIngredient10}</h6>
  </div>
  </div>
  `

}
