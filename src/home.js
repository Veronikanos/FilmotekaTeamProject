import MoviesApiService from './js/api-service';
import Notiflix from 'notiflix';
import { onLoadedHomePage } from './js/render-main-section';
import { getGenres } from './js/genres';
import { createMarkupTrendingFilms } from './js/render-main-section';

const moviesApiService = new MoviesApiService();

onLoadedHomePage(moviesApiService);

const headerFormInput = document.querySelector('form.header__form');
headerFormInput.addEventListener('submit', onSubmitSearchForm);

async function onSubmitSearchForm(event) {
  event.preventDefault();
  try {
    moviesApiService.query = event.target.elements.searchQuery.value
      .trim()
      .toLowerCase();
    if (moviesApiService.searchQuery === '') {
      return;
    }
    // moviesApiService.resetPage();
    const films = await moviesApiService.fetchMoviesByKeyword();

    if (films.length === 0) {
      // setStyleError();
      console.log('films.length === 0');
    } else {
      // resetStyleError();
    }
    const genres = await getGenres(); // треба винести в локал сторедж, бо повторюється запит
    const allCardsSection = document.querySelector('.main-section__allcards');
    allCardsSection.innerHTML = '';

    allCardsSection.insertAdjacentHTML(
      'beforeend',
      createMarkupTrendingFilms(films.data.results, genres).join('')
    );

    headerFormInput.reset();
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}
