import { renderSearchResult } from './render-markup';
import { moviesApiService } from './init';

export async function onLoadedHomePage() {
  const allCardsSection = document.querySelector('.main-section__allcards');

  const genres = await moviesApiService.getGenres(); // Отримання всіх жанрів
  localStorage.setItem('allGenres', JSON.stringify(genres)); // Запис всіх жанрів у localStorage

  const result = await moviesApiService.fetchTrending(); // Запит на отримання трендових фільмів
  const markup = renderSearchResult(result.data.results); // Рендер розмітки
  allCardsSection.insertAdjacentHTML('beforeend', markup.join(''));
}
