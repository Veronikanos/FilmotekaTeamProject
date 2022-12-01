import { watchTrailer } from '../trailer';

const cardDivs = document.querySelector('.main-section__allcards');
const modal = document.querySelector('.modal');
const overflow = document.querySelector('.overflow');
const closeBtn = document.querySelector('.modal__close-btn');
const innerModal = document.querySelector('.modal__main');
const queueJSON = localStorage.getItem('queue');
const watchedJSON = localStorage.getItem('watched');
const queue = JSON.parse(queueJSON) || [];
const watched = JSON.parse(watchedJSON) || [];
const watchedBtn = document.querySelector('.watchedJS');
const queueBtn = document.querySelector('.queueJS');

let allMoviesList = updateMoviesList('watched');

watchedBtn.addEventListener('click', () => {
  allMoviesList = updateMoviesList('watched');
});
queueBtn.addEventListener('click', () => {
  allMoviesList = updateMoviesList('queue');
});
cardDivs.addEventListener('click', showModal);

function updateMoviesList(item) {
  const allMoviesListFromStorage = localStorage.getItem(item);
  return JSON.parse(allMoviesListFromStorage);
}

function addToWatched(e) {
  e.target.classList.add('active');
  const clickedFilm = allMoviesList[e.target.dataset.id];
  if (watched.find(film => film.id === clickedFilm.id)) {
    alert('Film already in the watched list!');
  } else {
    watched.push(clickedFilm);
    console.log(watched);
    localStorage.setItem('watched', JSON.stringify(watched));
  }
}

function addToQueue(e) {
  e.target.classList.add('active');
  const clickedFilm = allMoviesList[e.target.dataset.id];
  if (queue.find(film => film.id === clickedFilm.id)) {
    alert('Film already in the queue!');
  } else {
    console.log(queue);
    queue.push(clickedFilm);
    localStorage.setItem('queue', JSON.stringify(queue));
  }
}

export function showModal(e) {
  if (e.currentTarget !== e.target) {
    modal.classList.remove('visually-hidden');
    overflow.classList.remove('visually-hidden');
    cardDivs.removeEventListener('click', showModal);
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
  modal.classList.add('visually-hidden');
  overflow.classList.add('visually-hidden');
  cardDivs.addEventListener('click', showModal);
  document.removeEventListener('keydown', closeModal);
  closeBtn.removeEventListener('click', closeModal);
  overflow.removeEventListener('click', closeModalOverflow);
}

function createModal(id) {
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
  } = allMoviesList[id];
  console.log(allMoviesList);
  const genres = JSON.parse(localStorage.getItem('allGenres'));
  const finalGenres = [];
  genre_ids.forEach(idx => {
    finalGenres.push(genres.find(genre => genre.id === idx).name);
  });

  const markup = `<div class="modal__img">
      <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" />
    </div>
    <div class="modal__about">
      <div class="modal__headline">${title}</div>
      <ul class="modal__list">
        <li class="modal__item">
          <div class="modal__item-first">Vote / Votes</div>
          <div class="modal__item-votes">
            <span class="modal__item-bg modal__item--accent">${vote_average.toFixed(
              1
            )}</span> /
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
          <div>${finalGenres.join(', ')}</div>
        </li>
      </ul> 
      <div class="modal__about-info">
        <p class="modal__about-headline">About</p>
        <p class="modal__about-text">
          ${overview}
        </p>
      </div>
          <div class="modal__buttons">
      <button class="modal__btn-watched interactive-button" data-id=${id}>
        add to Watched
      </button>
      <button class="modal__btn-queue interactive-button" data-id=${id}>add to queue</button>
      <button class='modal_btn-watched interactive-button modal_btn-watch-trailer' data-id=${film_id}>watch trailer</button>
    </div>
    </div>

    `;
  innerModal.innerHTML = markup;

  const addToWatchedBtn = document.querySelector('.modal__btn-watched');
  const addToQueueBtn = document.querySelector('.modal__btn-queue');
  const watchTrailerBtn = document.querySelector('.modal_btn-watch-trailer');

  addToQueueBtn.addEventListener('click', addToQueue);
  addToWatchedBtn.addEventListener('click', addToWatched);
  watchTrailerBtn.addEventListener('click', watchTrailer);
}
