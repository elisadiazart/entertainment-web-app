// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const sliderElement = document.getElementById('slider');
let moviesData;

const fetchData = async url => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const printSlider = async () => {
  const data = await fetchData(
    'https://api.themoviedb.org/3/trending/all/day?api_key=39ecfaa61f1cb93c9e39fc6adf769ace'
  );
  //sliderElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  data.results.forEach(movie => {
    const newMovie = document.createElement('div');
    newMovie.classList.add('section__item');
    const newBookmarkIcon = document.createElement('img');
    newBookmarkIcon.classList.add('section__bookmark-icon');
    newBookmarkIcon.src = 'assets/icon-bookmark-empty.svg';
    const newMovieData = document.createElement('div');
    newMovieData.classList.add('section__data');
    const newMovieYear = document.createElement('div');
    newMovieYear.classList.add('section__year');
    console.log(movie.release_date);
  });
};

printSlider();
