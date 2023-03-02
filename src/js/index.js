// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const sliderElement = document.getElementById('slider');
const popularSection = document.getElementById('popular');

const fetchData = async url => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '?api_key=39ecfaa61f1cb93c9e39fc6adf769ace';

const URLS = {
  popularMovies: API_URL + '/movie/popular' + API_KEY,
  trendingAll: API_URL + '/trending/all/day' + API_KEY
};

const printSlider = async () => {
  const data = await fetchData(`${URLS.trendingAll}`);
  const fragment = document.createDocumentFragment();
  data.results.forEach(movie => {
    const newMovie = document.createElement('div');
    newMovie.classList.add('section__item--slider');
    newMovie.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`;
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
    newMovie.append(newBookmarkIcon);
    newMovie.append(newMovieData);
    newMovie.append(newTitle);
    fragment.append(newMovie);
  });
  sliderElement.append(fragment);
};

const printSection = async url => {
  const data = await fetchData(url);
  const fragment = document.createDocumentFragment();
  for (let index = 0; index <= 5; index++) {
    const movie = data.results[index];
    console.log(movie);

    const newMovieContainer = document.createElement('div');
    newMovieContainer.classList.add('section__item__container');

    const newMovie = document.createElement('div');
    newMovie.classList.add('section__item');
    newMovie.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`;

    const newMovieData = document.createElement('div');
    newMovieData.classList.add('section__data');

    const newMovieYear = document.createElement('div');
    newMovieYear.classList.add('section__year');
    newMovieYear.textContent = movie.release_date.substring(0, 4);

    const newItemType = document.createElement('div');
    newItemType.classList.add('section__item-type');
    newItemType.textContent = 'Movie';

    const newMediaIcon = document.createElement('img');
    newMediaIcon.src = 'assets/icon-category-movie.svg';

    const newTitle = document.createElement('div');
    newTitle.textContent = movie.original_title;
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
    newMovieContainer.append(newMovieData);
    newMovieContainer.append(newTitle);
    fragment.append(newMovieContainer);
  }
  popularSection.append(fragment);
};

printSection(URLS.popularMovies);

printSlider();
