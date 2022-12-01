import { renderSearchResult } from './render-markup';
import { moviesApiService } from './init';
import { refs } from './refs';

export async function onLoadedHomePage() {
  const genres = await moviesApiService.getGenres(); // Отримання всіх жанрів
  localStorage.setItem('allGenres', JSON.stringify(genres)); // Запис всіх жанрів у localStorage
  const result = await moviesApiService.fetchTrending(); // Запит на отримання трендових фільмів
  const markup = renderSearchResult(result.data.results); // Рендер розмітки
  refs.allCardsSection.insertAdjacentHTML('beforeend', markup.join(''));
}
