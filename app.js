const search = document.getElementById("search"),
  submit = document.getElementById("submit"),

  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");


  
function searchMeal(e) {
  e.preventDefault();
  resultHeading.innerHTML = ""; // your are looking for ""
  const term = search.value;
  console.log(term);

  if (term.trim()){
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then( (data) => {
          console.log(data);

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
                <div class = "meal">
                <div class="meal-box">
                <img class="meal-image" src="${meal.strMealThumb}" />
                <h3 class="d-flex justify-content-center">${meal.strMeal}</h3>
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
  submit.addEventListener("submit", searchMeal);
