import Notiflix from 'notiflix';
import { renderSearchResult } from './render-markup';
import { moviesApiService } from './init';

const headerFormInput = document.querySelector('form.header__form');
const noResultsText = document.querySelector('.header__form-warning-text');

headerFormInput.addEventListener('submit', onSubmitSearchForm);

async function onSubmitSearchForm(event) {
  event.preventDefault();
  try {
    moviesApiService.query = event.target.elements.searchQuery.value
      .trim()
      .toLowerCase();
    if (moviesApiService.searchQuery === '') {
      noResultsText.classList.remove('visually-hidden');
      return;
    }
    noResultsText.classList.add('visually-hidden');
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

    headerFormInput.reset();
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}
