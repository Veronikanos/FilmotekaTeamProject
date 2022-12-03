import { watchTrailer } from '../trailer';
import { refs } from '../refs';
import Notiflix from 'notiflix';
import { renderModal } from '../render-modal';

const { allCardsSection, modal, overflow, closeBtn, innerModal, cursor, body } =
  refs;

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

    const top = window.scrollY;
    body.style.position = 'fixed';
    body.style.top = `-${top}px`;
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

  const top = body.style.top;
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, parseInt(top || '0') * -1);
}

function createModal(id) {
  const currentList = updateMoviesList();
  const rendered = renderModal(currentList, id, watched, queue);
  innerModal.innerHTML = rendered[0];
  addListeners(rendered[1], rendered[2]);
}

function addListeners(isInQueue, isInWatched) {
  const watchedBtn = document.querySelector('.modal__btn-watched');
  const queueBtn = document.querySelector('.modal__btn-queue');
  const watchTrailerBtn = document.querySelector('.modal__btn-watch-trailer');

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
