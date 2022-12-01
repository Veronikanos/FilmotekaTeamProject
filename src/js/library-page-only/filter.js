import Notiflix from 'notiflix';

const watchedButRef = document.querySelector('.watchedJS');
const queuedButRef = document.querySelector('.queueJS');

const cardsRenderDivRef = document.querySelector('.main-section__allcards');
import { renderSearchResult } from '../render-markup';

const DATA_KEY1 = 'watched';
const DATA_KEY2 = 'queue';

function renderWatched(event) {
  event.preventDefault();

  let dataToRender = JSON.parse(localStorage.getItem(DATA_KEY1));
  if (!dataToRender) {
    Notiflix.Notify.warning('No movies added!');
    return;
  }

  event.target.classList.remove('inactive');
  event.target.classList.add('active');

  queuedButRef.classList.remove('active');
  queuedButRef.classList.add('inactive');

  renderData(DATA_KEY1);
}
function renderQueue(event) {
  event.preventDefault();

  let dataToRender = JSON.parse(localStorage.getItem(DATA_KEY2));
  if (!dataToRender) {
    Notiflix.Notify.warning('No movies added!');
    return;
  }

  event.target.classList.remove('inactive');
  event.target.classList.add('active');

  watchedButRef.classList.remove('active');
  watchedButRef.classList.add('inactive');

  renderData(DATA_KEY2);
}

function renderData(DATA_KEY) {
  let dataToRender = JSON.parse(localStorage.getItem(DATA_KEY));
  if (!dataToRender) {
    Notiflix.Notify.warning('No movies added!');
    return;
  }
  const markup = renderSearchResult(dataToRender);
  cardsRenderDivRef.innerHTML = markup.join('');
}

watchedButRef.addEventListener('click', renderWatched);
queuedButRef.addEventListener('click', renderQueue);
