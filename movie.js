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
                    `<img src="https://image.tmdb.org/t/p/w200${movies.poster_path}" alt=${movies.title}>`
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

const movie_Details = async ()=>{
    const movieDetail = await fetchMovie('movie/{movie_id}');
    console.log(movieDetail);
}

async function fetchMovie(movies_endpoint) {
    const API_Key = '3c8685db24642e4c2b971877340f4ae9';
    const API_URL = 'https://api.themoviedb.org/3/';

    const res = await fetch(`${API_URL}${movies_endpoint}?api_key=${API_Key}&language=en-US`);

    const data = await res.json();
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
    const spinner = document.querySelector('.spinner');
    spinner.style.display = 'none';
    switch (global.currentPage){
        case '/home.html':
        case '/':
            movieDisplay();
        break;
        case '/tv-details.html':
            console.log('tv-detail');
        break;
        case '/tv-shows.html':
            console.log('tv-show');
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