// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const sliderElement = document.getElementById('slider');
let mediaFavoritesArray = [];
const fetchData = async url => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '?api_key=39ecfaa61f1cb93c9e39fc6adf769ace';

const URLS = {
  popularMovies: API_URL + '/movie/popular' + API_KEY,
  trendingAll: API_URL + '/trending/all/day' + API_KEY,
  nowPlaying: API_URL + '/movie/now_playing' + API_KEY,
  upcomingMovies: API_URL + '/movie/upcoming' + API_KEY,
  topRatedMovied: API_URL + '/movie/top_rated' + API_KEY,
  popularTv: API_URL + '/tv/popular' + API_KEY
};

const printSlider = async () => {
  const data = await fetchData(`${URLS.trendingAll}`);
  const fragment = document.createDocumentFragment();
  data.results.forEach(movie => {
    const newMovie = document.createElement('div');
    newMovie.classList.add('section__item--slider');
    newMovie.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`;
    const newBookmarkIconContainer = document.createElement('div');
    newBookmarkIconContainer.classList.add(
      'section__bookmark-icon-container--slider'
    );
    newBookmarkIconContainer.dataset.id = movie.id;
    newBookmarkIconContainer.dataset.checked = false;
    const newBookmarkIcon = document.createElement('img');
    newBookmarkIcon.classList.add('section__bookmark-icon--slider');
    newBookmarkIcon.src = 'assets/icon-bookmark-empty.svg';
    const newMovieData = document.createElement('div');
    newMovieData.classList.add('section__data--slider');
    const newMovieYear = document.createElement('div');
    newMovieYear.classList.add('section__year');
    if (movie.release_date)
      newMovieYear.textContent = movie.release_date.substring(0, 4);
    else newMovieYear.textContent = movie.first_air_date.substring(0, 4);
    const newItemType = document.createElement('div');
    newItemType.classList.add('section__item-type--slider');
    if (movie.media_type === 'movie') newItemType.textContent = 'Movie';
    else newItemType.textContent = 'Series';
    const newMediaIcon = document.createElement('img');
    if (movie.media_type === 'movie')
      newMediaIcon.src = 'assets/icon-category-movie.svg';
    else newMediaIcon.src = 'assets/icon-category-tv.svg';
    const newTitle = document.createElement('div');
    if (movie.name) newTitle.textContent = movie.name;
    else newTitle.textContent = movie.original_title;
    newTitle.classList.add('section__item-title--slider');
    newItemType.append(newMediaIcon);
    newMovieData.append(newMovieYear);
    newMovieData.append(newItemType);
    newBookmarkIconContainer.append(newBookmarkIcon);
    newMovie.append(newBookmarkIconContainer);
    newMovie.append(newMovieData);
    newMovie.append(newTitle);
    fragment.append(newMovie);
  });
  sliderElement.append(fragment);
};

const printSection = async (url, id) => {
  const data = await fetchData(url);
  const fragment = document.createDocumentFragment();
  for (let index = 0; index <= 5; index++) {
    const movie = data.results[index];

    const newMovieContainer = document.createElement('div');
    newMovieContainer.classList.add('section__item__container');

    const newMovie = document.createElement('div');
    newMovie.classList.add('section__item');
    newMovie.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`;

    const newBookmarkIconContainer = document.createElement('div');
    newBookmarkIconContainer.classList.add('section__bookmark-icon-container');
    newBookmarkIconContainer.dataset.id = movie.id;
    newBookmarkIconContainer.dataset.checked = false;
    const newBookmarkIcon = document.createElement('img');
    newBookmarkIcon.classList.add('section__bookmark-icon');
    newBookmarkIcon.src = 'assets/icon-bookmark-empty.svg';

    const newMovieData = document.createElement('div');
    newMovieData.classList.add('section__data');

    const newMovieYear = document.createElement('div');
    newMovieYear.classList.add('section__year');
    if (movie.release_date)
      newMovieYear.textContent = movie.release_date.substring(0, 4);
    else newMovieYear.textContent = movie.first_air_date.substring(0, 4);

    const newItemType = document.createElement('div');
    newItemType.classList.add('section__item-type');
    if (movie.media_type === 'movie') newItemType.textContent = 'Movie';
    else newItemType.textContent = 'Series';

    const newMediaIcon = document.createElement('img');
    if (movie.media_type === 'movie')
      newMediaIcon.src = 'assets/icon-category-movie.svg';
    else newMediaIcon.src = 'assets/icon-category-tv.svg';

    const newTitle = document.createElement('div');
    if (movie.name) newTitle.textContent = movie.name;
    else newTitle.textContent = movie.original_title;
    newTitle.classList.add('section__item-title');

    if (index === 4) {
      newMovieContainer.classList.add('section__item__container--bottom-part');
      newMovie.classList.add('section__item--bottom-part');
    }

    if (index === 5) {
      newMovieContainer.classList.add(
        'section__item__container--bottom-part--second'
      );
      newMovie.classList.add('section__item--bottom-part');
    }

    newMovieContainer.append(newMovie);
    newMovieData.append(newMovieYear);
    newMovieData.append(newMediaIcon);
    newMovieData.append(newItemType);
    newBookmarkIconContainer.append(newBookmarkIcon);
    newMovieContainer.append(newBookmarkIconContainer);
    newMovieContainer.append(newMovieData);
    newMovieContainer.append(newTitle);
    fragment.append(newMovieContainer);
  }
  const Section = document.getElementById(id);
  Section.append(fragment);
};

printSection(URLS.popularMovies, 'popular');
printSection(URLS.nowPlaying, 'nowPlaying');
printSection(URLS.upcomingMovies, 'upcoming');
printSection(URLS.topRatedMovied, 'topRated');
printSection(URLS.popularTv, 'popularTv');
printSlider();

document.body.addEventListener('click', e => {
  console.log(e.target);
  if (
    e.target.classList.contains('section__bookmark-icon-container--slider') ||
    e.target.classList.contains('section__bookmark-icon-container')
  )
    
    if (e.target.dataset.checked === 'false') {
      e.target.children[0].src = 'assets/icon-bookmark-full.svg';
      e.target.dataset.checked = true
      mediaFavoritesArray.push(e.target.dataset.id);
    }
    else {
      e.target.children[0].src = 'assets/icon-bookmark-empty.svg';
      e.target.dataset.checked = false
    }
    console.log(mediaFavoritesArray);
    
});
