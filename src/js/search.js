import Notiflix from 'notiflix';
import { renderSearchResult } from './render-markup';
import { moviesApiService } from './init';
import { refs } from './refs';

refs.headerFormInput.addEventListener('submit', onSubmitSearchForm);

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

    // if (films.length === 0) {
    //   console.log('films.length === 0');
    // }
    refs.allCardsSection.innerHTML = '';
    refs.allCardsSection.insertAdjacentHTML(
      'beforeend',
      renderSearchResult(films.data.results).join('')
    );

    refs.headerFormInput.reset();
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}
