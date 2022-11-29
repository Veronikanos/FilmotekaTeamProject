import { createMarkupTrendingFilms } from './js/render-main-section';
import { getGenres } from './js/genres';

const axios = require('axios').default;

const API_KEY = '2d95e97f255e7635245c1980eab541d3';
const allCardsSection = document.querySelector('.main-section__allcards');
onLoadedHomePage();

async function onLoadedHomePage() {
  try {
    const genres = await getGenres(); //Get all genres. This is async function.

    const result = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    const res = createMarkupTrendingFilms(result.data.results, genres);
    allCardsSection.insertAdjacentHTML('beforeend', res.join(''));
  } catch (error) {
    console.log(error);
  }
}
