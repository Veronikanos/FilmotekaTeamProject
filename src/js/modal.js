import { allMoviesList } from '../home';
const cardDivs = document.querySelector('.main-section__allcards');
const modal = document.querySelector('.modal');
const overflow = document.querySelector('.overflow');
const closeBtn = document.querySelector('.modal__close-btn');
const innerModal = document.querySelector('.modal__main');

cardDivs.addEventListener('click', showModal);

function showModal(e) {
  if (e.currentTarget !== e.target) {
    modal.classList.remove('visually-hidden');
    overflow.classList.remove('visually-hidden');
    cardDivs.removeEventListener('click', showModal);
    document.addEventListener('keydown', closeModalonEsc);
    closeBtn.addEventListener('click', closeModal);
    overflow.addEventListener('click', closeModalOverflow);
    const id = e.target.parentElement.dataset.id
      ? e.target.parentElement.dataset.id
      : e.target.parentElement.parentElement.dataset.id;
    createModal(id);
  }
}

function closeModalOverflow(e) {
  if (e.currentTarget === e.target) closeModal();
}

function closeModalonEsc(e) {
  if (e.code === 'Escape') closeModal();
}

function closeModal() {
  modal.classList.add('visually-hidden');
  overflow.classList.add('visually-hidden');
  cardDivs.addEventListener('click', showModal);
  document.removeEventListener('keydown', closeModal);
  closeBtn.removeEventListener('click', closeModal);
  overflow.removeEventListener('click', closeModalOverflow);
}

function createModal(id) {
  console.log(allMoviesList[id]);
  const {
    poster_path,
    original_title,
    title,
    genre_ids,
    vote_average,
    vote_count,
    popularity,
    overview,
  } = allMoviesList[id];
  console.log(genre_ids);
  const marcup = `<div class="modal__img">
      <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" />
    </div>
    <div class="modal__about">
      <div class="modal__headline">${title}</div>
      <ul class="modal__list">
        <li class="modal__item">
          <div class="modal__item-first">Vote / Votes</div>
          <div class="modal__item-votes">
            <span class="modal__item-bg modal__item--accent">${vote_average}</span> /
            <span class="modal__item-bg modal__item--grey">${vote_count}</span>
          </div>
        </li>
        <li class="modal__item">
          <div class="modal__item-first">Popularity</div>
          <div>${popularity}</div>
        </li>
        <li class="modal__item">
          <div class="modal__item-first">Original Title</div>
          <div class="modal__item-title">${original_title}</div>
        </li>
        <li class="modal__item">
          <div class="modal__item-first">Genre</div>
          <div>Western</div>
        </li>
      </ul>
      <div class="modal__about-info">
        <p class="modal__about-headline">About</p>
        <p class="modal__about-text">
          ${overview}
        </p>
        <div class="modal__buttons">
          <button class="modal__btn-watched interactive-button">
            add to Watched
          </button>
          <button class="modal__btn-queue interactive-button">
            add to queue
          </button>
        </div>
      </div>
    </div>
    `;
  innerModal.innerHTML = marcup;
}
