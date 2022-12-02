import Notiflix from 'notiflix';
import { refs } from './refs';
import { renderSearchResult } from './render-markup';
import { moviesApiService } from './init';
import { createPagination } from './main-page-only/pagination';

refs.headerFormInput.addEventListener('submit', onSubmitSearchForm);
refs.headerFormInput.addEventListener('mouseover', () => {
  refs.cursor.classList.add('hover');
});
refs.headerFormInput.addEventListener('mouseleave', () => {
  refs.cursor.classList.remove('hover');
});

async function onSubmitSearchForm(event) {
  event.preventDefault();
  try {
    moviesApiService.query = event.target.elements.searchQuery.value
      .trim()
      .toLowerCase();

    if (moviesApiService.searchQuery === '') {
      refs.noResultsText.classList.remove('visually-hidden');
      return;
    } else {
      refs.noResultsText.classList.add('visually-hidden');
    }

    moviesApiService.resetPage();
    const films = await moviesApiService.fetchMoviesByKeyword();

    if (films.data.total_results === 0) {
      refs.noResultsText.classList.remove('visually-hidden');
      refs.headerFormInput.reset();
      return;
    }

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
