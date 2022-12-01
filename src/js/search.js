import Notiflix from 'notiflix';
import { refs } from './refs';
import { renderSearchResult } from './render-markup';
import { moviesApiService } from './init';
import { createPagination } from './main-page-only/pagination';

refs.headerFormInput.addEventListener('submit', onSubmitSearchForm);

async function onSubmitSearchForm(event) {
  event.preventDefault();
  try {
    moviesApiService.query = event.target.elements.searchQuery.value
      .trim()
      .toLowerCase();
    if (moviesApiService.searchQuery === '') {
      refs.noResultsText.classList.remove('visually-hidden');
      return;
    }
    refs.noResultsText.classList.add('visually-hidden');
    // moviesApiService.resetPage();
    const films = await moviesApiService.fetchMoviesByKeyword();

    // if (films.length === 0) {
    //   console.log('films.length === 0');
    // }
    refs.allCardsSection.innerHTML = '';
    refs.allCardsSection.insertAdjacentHTML(
      'beforeend',
      renderSearchResult(films.data.results).join('')
    );
    refs.headerFormInput.reset();
    setTimeout(createPagination('search'), 0);
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}
