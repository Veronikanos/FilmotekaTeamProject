import { watchTrailer } from '../trailer';
import { refs } from '../refs';
import Notiflix from 'notiflix';

const { allCardsSection, modal, overflow, closeBtn, innerModal, cursor } = refs;

const queueJSON = localStorage.getItem('queue');
const watchedJSON = localStorage.getItem('watched');
let queue = JSON.parse(queueJSON) || [];
let watched = JSON.parse(watchedJSON) || [];

allCardsSection.addEventListener('click', showModal);

function updateMoviesList() {
  const allMoviesListFromStorage = localStorage.getItem('currentFilmList');
  const allMoviesList = JSON.parse(allMoviesListFromStorage);
  return allMoviesList;
}

function addToWatched(e) {
  e.target.innerText = 'remove from watched';
  const currentList = updateMoviesList();
  const clickedFilm = currentList[e.target.dataset.id];
  watched.push(clickedFilm);
  localStorage.setItem('watched', JSON.stringify(watched));
  e.target.addEventListener('click', removeFromWatched);
  e.target.removeEventListener('click', addToWatched);
  Notiflix.Notify.success('Added to watched!');
}

function removeFromWatched(e) {
  e.target.innerText = 'add to watched';
  const currentList = updateMoviesList();
  const clickedFilm = currentList[e.target.dataset.id];
  watched = watched.filter(film => film.id !== clickedFilm.id);
  localStorage.setItem('watched', JSON.stringify(watched));
  e.target.removeEventListener('click', removeFromWatched);
  e.target.addEventListener('click', addToWatched);
  Notiflix.Notify.success('Removed from watched!');
}

function addToQueue(e) {
  e.target.innerText = 'remove from queue';
  const currentList = updateMoviesList();
  const clickedFilm = currentList[e.target.dataset.id];
  queue.push(clickedFilm);
  localStorage.setItem('queue', JSON.stringify(queue));
  e.target.addEventListener('click', removeFromQueue);
  e.target.removeEventListener('click', addToQueue);
  Notiflix.Notify.success('Added to queue!');
}

function removeFromQueue(e) {
  e.target.innerText = 'add to queue';
  const currentList = updateMoviesList();
  const clickedFilm = currentList[e.target.dataset.id];
  queue = queue.filter(film => film.id !== clickedFilm.id);
  localStorage.setItem('queue', JSON.stringify(queue));
  e.target.removeEventListener('click', removeFromQueue);
  e.target.addEventListener('click', addToQueue);
  Notiflix.Notify.success('Removed from queue!');
}

export function showModal(e) {
  if (e.currentTarget !== e.target) {
    modal.classList.remove('hidden-modal');
    overflow.classList.remove('hidden-modal');
    allCardsSection.removeEventListener('click', showModal);
    document.addEventListener('keydown', closeModalOnEsc);
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

function closeModalOnEsc(e) {
  if (e.code === 'Escape') closeModal();
}

function closeModal() {
  modal.classList.add('hidden-modal');
  overflow.classList.add('hidden-modal');
  allCardsSection.addEventListener('click', showModal);
  document.removeEventListener('keydown', closeModal);
  closeBtn.removeEventListener('click', closeModal);
  overflow.removeEventListener('click', closeModalOverflow);
}

async function createModal(id) {
  const currentList = updateMoviesList();
  const {
    poster_path,
    original_title,
    title,
    genre_ids,
    vote_average,
    vote_count,
    popularity,
    overview,
    id: film_id,
  } = currentList[id];
  const genres = JSON.parse(localStorage.getItem('allGenres'));
  const finalGenres = [];
  genre_ids.forEach(idx => {
    finalGenres.push(genres.find(genre => genre.id === idx).name);
  });

  const foundInWatched = watched.find(film => film.id === film_id);
  const foundInQueue = queue.find(film => film.id === film_id);

  const isInQueue = !!foundInQueue;
  const isInWatched = !!foundInWatched;

  const queueBtnMarkup = isInQueue
    ? `<button class="modal__btn-queue interactive-button" data-id=${id}>remove from queue</button>`
    : `<button class="modal__btn-queue interactive-button" data-id=${id}>add to queue</button>`;

  const watchedBtnMarkup = isInWatched
    ? `<button class="modal__btn-watched interactive-button" data-id=${id}>
        remove from Watched
      </button>`
    : `<button class="modal__btn-watched interactive-button" data-id=${id}>
        add to Watched
      </button>`;

  const voteCount =
    vote_count && vote_average
      ? `<li class="modal__item">
          <div class="modal__item-first">Vote / Votes</div>
          <div class="modal__item-votes">
            <span class="modal__item-bg modal__item--accent">${vote_average.toFixed(
              1
            )}</span> /
            <span class="modal__item-bg modal__item--grey">${vote_count}</span>
          </div>
        </li>`
      : '';
  const popularityMarkup = popularity
    ? `<li class="modal__item">
          <div class="modal__item-first">Popularity</div>
          <div>${popularity}</div>
        </li>`
    : '';
  const genresMarkup = finalGenres.length
    ? `<li class="modal__item">
          <div class="modal__item-first">Genre</div>
          <div>${finalGenres.join(', ')}</div>
        </li>`
    : '';
  const originalTitleMarkup = original_title
    ? `<li class="modal__item">
          <div class="modal__item-first">Original Title</div>
          <div class="modal__item-title">${original_title}</div>
        </li>`
    : '';
  const overviewMarkup = overview
    ? `<div class="modal__about-info">
        <p class="modal__about-headline">About</p>
        <p class="modal__about-text">
          ${overview}
        </p>
      </div>`
    : '';
  const photoMarkup = poster_path
    ? `<div class="modal__img">
      <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" />
    </div>`
    : '';
  const markup = `${photoMarkup}
    <div class="modal__about">
      <div class="modal__headline">${title}</div>
      <ul class="modal__list">
        ${voteCount}
        ${popularityMarkup}
        ${originalTitleMarkup}
        ${genresMarkup}
      </ul> 
      ${overviewMarkup}
          <div class="modal__buttons">
      ${watchedBtnMarkup}
      ${queueBtnMarkup}
      <button class='modal_btn-watched interactive-button modal_btn-watch-trailer' data-id=${film_id}>watch trailer</button>
    </div>
    </div>
    `;
  innerModal.innerHTML = markup;

  addListeners(isInQueue, isInWatched);
}

function addListeners(isInQueue, isInWatched) {
  const watchedBtn = document.querySelector('.modal__btn-watched');
  const queueBtn = document.querySelector('.modal__btn-queue');
  const watchTrailerBtn = document.querySelector('.modal_btn-watch-trailer');

  isInQueue
    ? queueBtn.addEventListener('click', removeFromQueue)
    : queueBtn.addEventListener('click', addToQueue);

  isInWatched
    ? watchedBtn.addEventListener('click', removeFromWatched)
    : watchedBtn.addEventListener('click', addToWatched);

  watchTrailerBtn.addEventListener('click', watchTrailer);

  [watchTrailerBtn, queueBtn, watchedBtn, closeBtn].forEach(btn => {
    btn.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    btn.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
}
