const cardDivs = document.querySelector('.main-section__allcards');
const modal = document.querySelector('.modal');
const overflow = document.querySelector('.overflow');
const closeBtn = document.querySelector('.modal__close-btn');
const innerModal = document.querySelector('.modal__main');
const queue = [];
const watched = [];

function updateMoviesList() {
  const allMoviesListFromStorage = localStorage.getItem('currentFilmList');
  const allMoviesList = JSON.parse(allMoviesListFromStorage);
  return allMoviesList;
}

cardDivs.addEventListener('click', showModal);

function addToWatched(e) {
  const currentList = updateMoviesList();
  const clickedFilm = currentList[e.target.dataset.id];
  if (watched.find(film => film === clickedFilm)) {
    alert('Film already in the watched list!');
  } else {
    watched.push(clickedFilm);
    localStorage.setItem('watched', JSON.stringify(watched));
  }
}

function addToQueue(e) {
  const currentList = updateMoviesList();
  const clickedFilm = currentList[e.target.dataset.id];
  if (queue.find(film => film === clickedFilm)) {
    alert('Film already in the queue!');
  } else {
    queue.push(clickedFilm);
    localStorage.setItem('queue', JSON.stringify(queue));
  }
}

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
  } = currentList[id];
  const genres = JSON.parse(localStorage.getItem('allGenres'));
  const finalGenres = [];
  genre_ids.forEach(idx => {
    finalGenres.push(genres.find(genre => genre.id === idx).name);
  });
  const marcup = `<div class="modal__img">
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
    </div>
    </div>

    `;
  innerModal.innerHTML = marcup;
  const addToWatchedBtn = document.querySelector('.modal__btn-watched');
  const addToQueueBtn = document.querySelector('.modal__btn-queue');
  addToQueueBtn.addEventListener('click', addToQueue);
  addToWatchedBtn.addEventListener('click', addToWatched);
}
