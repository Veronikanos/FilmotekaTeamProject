import Pagination from 'tui-pagination';
import MoviesApiService from '../api-service';
import { renderSearchResult } from '../render-markup';

export function createPagination() {
  const totalResults = localStorage.getItem('totalResults');

  const options = {
    totalItems: JSON.parse(totalResults),
    itemsPerPage: 20,
    template: {
      page: '<a href="#" class="main-section__page-number">{{page}}</a>',
      currentPage:
        '<a href="#" class="main-section__page-number main-section__page-number--active">{{page}}</a>',
      moveButton:
        '<a class="main-section__arrows main-section__arrows--{{type}} "></a>',
      disabledMoveButton: '<a style="display: none">',
    },
  };

  const paginationContainer = document.querySelector('.tui-pagination');
  const pagination = new Pagination(paginationContainer, options);
  console.log(pagination);
  pagination.on('afterMove', async function (eventData) {
    const paginatedMovieApiService = new MoviesApiService();
    paginatedMovieApiService.page = eventData.page;
    const movies = await paginatedMovieApiService.fetchTrending();
    const allCardsSection = document.querySelector('.main-section__allcards');
    allCardsSection.innerHTML = renderSearchResult(movies.data.results).join(
      ''
    );
  });
}
