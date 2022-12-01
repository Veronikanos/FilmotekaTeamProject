import Notiflix from 'notiflix';
import { renderSearchResult } from './render-markup';
import { moviesApiService } from './init';
import { createPagination } from './main-page-only/pagination';

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
    const allCardsSection = document.querySelector('.main-section__allcards');
    allCardsSection.innerHTML = '';

    allCardsSection.insertAdjacentHTML(
      'beforeend',
      renderSearchResult(films.data.results).join('')
    );
    createPagination('search');
    headerFormInput.reset();
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}
