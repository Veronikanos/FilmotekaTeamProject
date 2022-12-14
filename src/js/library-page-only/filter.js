import Notiflix from 'notiflix';

const watchedButRef = document.querySelector('.watchedJS');
const queuedButRef = document.querySelector('.queueJS');

const cardsRenderDivRef = document.querySelector('.main-section__allcards');
import { renderSearchResult } from '../render-markup';

const DATA_KEY1 = 'watched';
const DATA_KEY2 = 'queue';

export function renderWatched() {
  watchedButRef.classList.add('active');
  queuedButRef.classList.remove('active');

  if (!localStorage.getItem(DATA_KEY1)) {
    // cardsRenderDivRef.innerHTML = `Its empty here, add movies you've already watched.`;
    Notiflix.Notify.warning('No movies added!');
    return;
  }
  renderData(DATA_KEY1);
}

export function renderQueue() {
  queuedButRef.classList.add('active');
  watchedButRef.classList.remove('active');

  if (!localStorage.getItem(DATA_KEY2)) {
    // cardsRenderDivRef.innerHTML = `It's empty here, add the movies you want to watch.`;
    Notiflix.Notify.warning('No movies added!');
    return;
  }

  renderData(DATA_KEY2);
}

function renderData(DATA_KEY) {
  let dataToRender = JSON.parse(localStorage.getItem(DATA_KEY));
  console.log(dataToRender);
  if (!dataToRender.length) {
    cardsRenderDivRef.innerHTML =
      'You have not added anything to this list yet.';
    Notiflix.Notify.warning('No movies added!');
    return;
  }
  const markup = renderSearchResult(dataToRender);
  cardsRenderDivRef.innerHTML = markup.join('');

  const cards = document.querySelectorAll('.main-section__card');
  cards.forEach(e => {
    if (e.dataset.rating !== '0') {
      e.lastElementChild.insertAdjacentHTML(
        'beforeend',
        `<span class="rating-span">${
          Math.round(e.dataset.rating * 10) / 10
        }</span>`
      );
    }
  });
}

function renderDataDefault() {
  renderData(DATA_KEY1);
  watchedButRef.classList.remove('inactive');
  watchedButRef.classList.add('active');
}

renderDataDefault();

watchedButRef.addEventListener('click', renderWatched);
queuedButRef.addEventListener('click', renderQueue);
