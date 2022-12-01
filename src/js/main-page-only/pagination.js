import Pagination from 'tui-pagination';
import MoviesApiService from '../api-service';
import { renderSearchResult } from '../render-markup';
import { refs } from '../refs';

const { paginationContainer, allCardsSection } = refs;

const options = {
  totalItems: 200,
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
  const paginatedMovieApiService = new MoviesApiService();
  paginatedMovieApiService.page = eventData.page;
  const movies = await paginatedMovieApiService.fetchTrending();
  allCardsSection.innerHTML = renderSearchResult(movies.data.results).join('');
});
