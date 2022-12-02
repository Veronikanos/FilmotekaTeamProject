import Pagination from 'tui-pagination';
import { moviesApiService } from '../init';
import { renderSearchResult } from '../render-markup';
import { refs } from '../refs';

const { paginationContainer, allCardsSection } = refs;

export function createPagination(fetchType) {
  const totalResults = localStorage.getItem('totalResults');

  const options = {
    centerAlign: true,
    visiblePages: 5,
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
    if (eventData.page > 4) {
      console.log(eventData.page);
      const firstArrow = document.querySelector('.main-section__arrows--first');
      const prevArrow = document.querySelector('.main-section__arrows--prev');
      firstArrow.innerText = '1';
      prevArrow.classList.add('move-left-a-little');
    } else {
      const prevArrow = document.querySelector('.main-section__arrows--prev');
      const firstArrow = document.querySelector('.main-section__arrows--first');
      if (firstArrow) firstArrow.innerText = '';
      if (prevArrow) prevArrow.classList.remove('move-left-a-little');
    }
    const movies =
      fetchType === 'trending'
        ? await moviesApiService.fetchTrending()
        : await moviesApiService.fetchMoviesByKeyword();

    allCardsSection.innerHTML = renderSearchResult(movies.data.results).join(
      ''
    );
  });

  const nextArrow = document.querySelector('.main-section__arrows--next');
  if (options.totalItems / 20 > 5 && screen.width > 768) {
    console.log(screen.width);
    const lastArrow = document.querySelector('.main-section__arrows--last');
    lastArrow.innerText = options.totalItems / 20;
    nextArrow.classList.add('move-right-a-little');
  }
}
