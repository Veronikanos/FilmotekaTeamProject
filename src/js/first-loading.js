import { renderSearchResult } from './render-markup';
import { moviesApiService } from './init';
import { refs } from './refs';
import { createPagination } from './main-page-only/pagination';

export async function onLoadedHomePage() {
  const genres = await moviesApiService.getGenres();
  localStorage.setItem('allGenres', JSON.stringify(genres));
  const result = await moviesApiService.fetchTrending();
  const markup = renderSearchResult(result.data.results);
  createPagination('trending');

  refs.allCardsSection.insertAdjacentHTML('beforeend', markup.join(''));
  const cards = document.querySelectorAll('.main-section__card');
  cards.forEach(item => {
    item.addEventListener('mouseover', () => {
      refs.cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      refs.cursor.classList.remove('hover');
    });
  });
}
