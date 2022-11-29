import Pagination from 'tui-pagination';

const options = {
    totalItems: 500,
    template: {
        page: '<a href="#" class="main-section__page-number">{{page}}</a>',
        currentPage: '<a href="#" class="main-section__page-number main-section__page-number--active">{{page}}</a>',
        moveButton: '<a class="main-section__arrows"><svg class="main-section__arrow-icon"><use href="./images/sprite.svg#icon-arrow-left"></use></svg></a>',
        disabledMoveButton: '<a class="main-section__arrows"><svg class="main-section__arrow-icon"><use href="../images/sprite.svg#icon-arrow-left"></use></svg></a>',
    }
}

const paginationContainer = document.querySelector('.tui-pagination');
const pagination = new Pagination(paginationContainer, options)

pagination.getCurrentPage();
