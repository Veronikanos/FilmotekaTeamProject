import Pagination from 'tui-pagination';
import { moviesApiService } from '../init';
import { renderSearchResult } from '../render-markup';
import { refs } from '../refs';

const { paginationContainer, allCardsSection } = refs;

export function createPagination(fetchType) {
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

  const pagination = new Pagination(paginationContainer, options);
  pagination.on('afterMove', async function (eventData) {
    moviesApiService.page = eventData.page;
    const movies =
      fetchType === 'trending'
        ? await moviesApiService.fetchTrending()
        : await moviesApiService.fetchMoviesByKeyword();

    allCardsSection.innerHTML = renderSearchResult(movies.data.results).join(
      ''
    );
  });
}
