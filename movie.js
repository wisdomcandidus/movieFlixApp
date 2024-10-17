
const global = {
    currentPage: window.location.pathname
}

async function movieDisplay(){
    const {results} =await fetchMovie('movie/popular');
    results.forEach(movies=>{
        const myDiv = document.createElement('div');
        myDiv.classList.add('tiles');
        myDiv.innerHTML =  `
              <a href="movie-details.html?id=${movies.id}">
                ${
                    movies.poster_path ?
                    `<img src="https://image.tmdb.org/t/p/w300${movies.poster_path}" alt=${movies.title}>`
                    :`<img src="./images/no-image.jpg" alt="Movie title">`
                }
                <div class="content">
                    <h3>${movies.title}</h3>
                    <p><strong>Release</strong>: ${movies.release_date}</p>
                </div>
            </a>
        `
        document.querySelector('.movie-grid').appendChild(myDiv)
    })
}

// for the swiper

async function displaySlider() {
    const { results } = await fetchMovie('movie/now_playing');
  
    results.forEach((movie) => {
      const div = document.createElement('div');
      div.classList.add('swiper-slide');
  
      div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        
        <h4>
          <i class="fa fa-star star"></i> ${movie.vote_average.toFixed(1)} / 10
        </h4>
        </a>
      `;
  
      document.querySelector('.swiper-wrapper').appendChild(div);
  
      initSwiper();
    });
  }
  
  function initSwiper() {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        450: {
          slidesPerView: 1,
        },
        500: {
          slidesPerView: 2,
        },
        800: {
          slidesPerView: 3,
        },
        901: {
          slidesPerView: 4,
        },
        1100: {
          slidesPerView:5,
        },
      },
    });
  }


async function tvDisplay(){
    const {results} =await fetchMovie('tv/popular');
    results.forEach(tv_Show =>{
        const myDiv = document.createElement('div');
        myDiv.classList.add('tiles');
        myDiv.innerHTML =  `
              <a href="tv-details.html?id=${tv_Show.id}">
                ${
                    tv_Show.poster_path ?
                    `<img src="https://image.tmdb.org/t/p/w300${tv_Show.poster_path}" alt=${tv_Show.name}>`
                    :`<img src="./images/no-image.jpg" alt="${tv_Show.name}">`
                }
                <div class="content">
                    <h3>${tv_Show.name}</h3>
                    <p><strong>Release</strong>: ${tv_Show.first_air_date}</p>
                </div>
            </a>
        `
        document.querySelector('.movie-grid').appendChild(myDiv)
    })
}



const movie_Details = async ()=>{
    const getId = window.location.search.split('=')[1]
    const movieDetail = await fetchMovie(`movie/${getId}`);

    displayImage('movie',movieDetail.backdrop_path)
    const divDetail = document.createElement('div');

    divDetail.innerHTML = `
    <div class="container-detail">
    <div class="container">
        <div class="image-detail">
        ${movieDetail.poster_path ? `<img src="https://image.tmdb.org/t/p/w300${movieDetail.poster_path}" alt="${movieDetail.title}"></img>`:`<img src="./images/no-image.jpg" alt="${movieDetail.title}"></img>`}
        </div>
        <div class="container-wrap">
            <h2>${movieDetail.title}4</h2>
            <div class="wrap">
                <p class="shape-icon
                "><i class="fa fa-star"></i>${movieDetail.vote_average.toFixed(1)}/10</p>
                <p>Release Date: <span class="date">${movieDetail.release_date}</span></p>
                <p class="info">${movieDetail.overview}</p>
                <h3>Genres</h3>
                <ul>
                  ${movieDetail.genres.map((genre) =>`<li>${genre.name}</li>`).join('')}
                </ul>
                <div class="back-btn1 ">
                    <a href="home.html">Visit movie home page</a>
                </div>
            </div>
        </div>
    </div>
        <div class="movie-info">
            <h2>MOVIE INFO</h2>
            <ul>
                <li><span>Budget:</span>$${addCommas(movieDetail.budget)}</li>
                <li><span>Revenue:</span>$${addCommas(movieDetail.revenue)}</li>
                <li><span>Runtime:</span>${movieDetail.runtime} minutes</li>
                <li><span>Status:</span>${movieDetail.status}</li>
            </ul>
            <div class="production">
                <h3>Production Companies</h3>
                <p>${movieDetail.production_companies.map((company)=> `<span>${company.name}, </span>`)}</p>
            </div>
        </div>
    </div>`

    document.querySelector('.movie-detail').appendChild(divDetail)

}
const tv_Details = async ()=>{
    const getId = window.location.search.split('=')[1]
    const tvDetail = await fetchMovie(`tv/${getId}`);
    console.log(tvDetail)
    displayImage('tv',tvDetail.backdrop_path)
    const divDetail = document.createElement('div');

    divDetail.innerHTML = `
    <div class="container-detail">
        <div class="container">
        <div class="image-detail">
        ${tvDetail.poster_path ? `<img src="https://image.tmdb.org/t/p/w300${tvDetail.poster_path}" alt="${tvDetail.name}"></img>`:`<img src="./images/no-image.jpg" alt="${tvDetail.name}"></img>`}
        </div>
        <div class="container-wrap">
            <h2>${tvDetail.name}4</h2>
            <div class="wrap">
                <p class="shape-icon
                "><i class="fa fa-star"></i>${tvDetail.vote_average.toFixed(1)}/10</p>
                <p>Release Date: <span class="date">${tvDetail.first_air_date}</span></p>
                <p class="info">${tvDetail.overview}</p>
                <h3>Genres</h3>
                <ul>
                  ${tvDetail.genres.map((genre) =>`<li>${genre.name}</li>`).join('')}
                </ul>
                <div class="back-btn1 ">
                    <a href="${tvDetail.homepage}" target=_blank>Visit movie home page</a>
                </div>
            </div>
            </div>
        </div>
        <div class="movie-info">
            <h2>MOVIE INFO</h2>
            <ul>
                <li><span>Number of Episodes:</span>${addCommas(tvDetail.number_of_episodes)}</li>
                <li><span>Number of Seasons:</span>${addCommas(tvDetail.number_of_seasons)}</li>    
                <li><span>Runtime:</span>${tvDetail.episode_run_time} minutes per eposide</li>
                <li><span>Language:</span>${tvDetail.spoken_languages.map(language => language.name).join(',')}</li>
                <li><span>Status:</span>${tvDetail.status}</li>
            </ul>
            <div class="production">
                <h3>Production Companies</h3>
                <p>${tvDetail.production_companies.map((company)=> `<span>${company.name} </span>`).join('')}</p>
            </div>
        </div>
    </div>`
    
    document.querySelector('.movie-detail').appendChild(divDetail)

}


function displayImage(type,backdrop){
    const overlay = document.createElement('div');
    overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop})`;
    overlay.classList.add('bg-image');

    if(type === 'movie'){
        document.querySelector('.details').appendChild(overlay)
    }else{
        document.querySelector('.details').appendChild(overlay)
    }
}


function showSpinner(){
    document.querySelector('.spinner').classList.remove('show');
    // document.querySelector('.pagination').style.display = 'none';
}
function hideSpinner(){
    document.querySelector('.spinner').classList.add('show');
    // const pagination = document.querySelector('.pagination');
    // pagination.style.display = 'flex';
    // pagination.style.justifyContent = 'center';
    // pagination.style.flexDirection = 'column';
    // pagination.style.alignItems = 'center'

}

async function fetchMovie(movies_endpoint) {
    const API_Key = '3c8685db24642e4c2b971877340f4ae9';
    const API_URL = 'https://api.themoviedb.org/3/';
    showSpinner()
    const res = await fetch(`${API_URL}${movies_endpoint}?api_key=${API_Key}&language=en-US`);

    const data = await res.json();
    hideSpinner()
    return data;
}

function activeLink(){
    const link = document.querySelectorAll('header nav ul li a')
    link.forEach(active => {
        if(active.getAttribute('href') === global.currentPage){
            active.classList.add('a-link');
        }
    })
}


function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function init(){
    switch (global.currentPage){
        case '/home.html':
        case '/':
            displaySlider()
            movieDisplay();
        break;
        case '/tv-shows.html':
            tvDisplay();
        break;
        case '/tv-details.html':
            tv_Details();
        break;
        case '/movie-details.html':
            movie_Details();
        break;
        case './search.html':
            console.log('search');
        break;
    }
    
    
    activeLink();

}

document.addEventListener('DOMContentLoaded', init)