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
async function tvDisplay(){
    const {results} =await fetchMovie('tv/popular');
    results.forEach(tv_Show =>{
        const myDiv = document.createElement('div');
        myDiv.classList.add('tiles');
        myDiv.innerHTML =  `
              <a href="movie-details.html?id=${tv_Show.id}">
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
    console.log(getId);
}


function showSpinner(){
    document.querySelector('.spinner').classList.remove('show');
    document.querySelector('.pagination').style.display = 'none';
}
function hideSpinner(){
    document.querySelector('.spinner').classList.add('show');
    const pagination = document.querySelector('.pagination');
    pagination.style.display = 'flex';
    pagination.style.justifyContent = 'center';
    pagination.style.flexDirection = 'column';
    pagination.style.alignItems = 'center'

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




function init(){
    switch (global.currentPage){
        case '/home.html':
        case '/':
            movieDisplay();
        break;
        case '/tv-details.html':
            console.log('tv-detail');
        break;
        case '/tv-shows.html':
            tvDisplay();
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