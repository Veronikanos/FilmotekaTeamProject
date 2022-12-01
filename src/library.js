import Pagination from 'tui-pagination';
import MoviesApiService from './js/api-service';


const options = {
  totalItems: 400,
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

// pagination.on('beforeMove', function (eventData) {
//   console.log(eventData.page);
// });
pagination.on('afterMove', function (eventData) {
  console.log(eventData.page);
});

import './js/library-page-only/filter';

