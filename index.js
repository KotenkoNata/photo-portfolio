const movieList = document.querySelector('.movie-list');
document.querySelector('.search-field').focus();
const form = document.querySelector('.search-form');
const deleteSearchBtn = document.querySelector('.delete-search');


function clearSearchField() {
  deleteSearchBtn.classList.add("isHidden");
  document.getElementById('search-form').reset();
}

form.addEventListener("submit", function (event) {
  event.preventDefault()
  const query = event.target.elements.query.value;
  deleteSearchBtn.classList.remove("isHidden");

  getSearchMovie(query).then((data)=>{

    if(data.results.length === 0){
      const p = `<p class="error-message">No result was found for query ${query}. Try one more time.</p>`;
      movieList.insertAdjacentHTML('beforeend', p);
    }else{
      movieList.innerHTML = "";
      renderData(data);
    }
  }).catch(e => {
    const p = `<p class="error-message">Error - ${e.message}. Try late.</p>`;
    movieList.insertAdjacentHTML('beforeend', p);
  });

});

deleteSearchBtn.addEventListener('click', clearSearchField);


async function getSearchMovie(query) {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=3fd2be6f0c70a2a598f084ddfb75487c`)
  const data = await res.json();
  movieList.innerHTML = "";
  return data;
}


async function getPopularMovie() {
  const res = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c`)
  return await res.json();
}

getPopularMovie().then(data => {
  renderData(data);
}).catch(e => {
  const p = `<p class="error-message">Error - ${e.message}. Try late.</p>`;
  movieList.insertAdjacentHTML('beforeend', p);
});

function renderData({results: dataArray}) {
  dataArray.map(({original_title, overview, poster_path, title,vote_average})=>{

    const a = `<li class="movie-item animation flexible">
    <a href="#none" class="movie-link">
    <div class="movie-relative">
    <img class="movie-img" src="https://image.tmdb.org/t/p/original${poster_path}" alt="${title}">
    <div class="hover-text animation">
    <h3 class="title-overview">Overview</h3>
    <p class="movie-overview excerpt details">${overview}</p>
    </div> 
    </div>
    <div class="movie-list-title flexible">
    <h2 class="movie-title lead">${original_title}</h2> 
    <span class="movie-popularity">${vote_average}</span>
    </div>
    </a>
</li>`;
    movieList.insertAdjacentHTML('beforeend', a);
})
}

console.log(`Score: 60/60\n
1. Вёрстка +10/10;
2. При загрузке приложения на странице отображаются карточки фильмов +10/10;
3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10/10
4. Поиск +30/30;
5. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10/10;`)



