const watchedButRef = document.querySelector('.watchedJS');
const queuedButRef = document.querySelector('.queueJS');

const cardsRenderDivRef = document.querySelector('.main-section__allcards');
import { renderSearchResult } from '../render-markup';

const DATA_KEY1 = 'watched';
const DATA_KEY2 = 'queue';

function renderWatched(event) {
  event.preventDefault();
  renderData(DATA_KEY1);
}
function renderQueue(event) {
  event.preventDefault();
  renderData(DATA_KEY2);
}

function renderData(DATA_KEY) {
  let dataToRender = JSON.parse(localStorage.getItem(DATA_KEY));
  const markup = renderSearchResult(dataToRender);
  cardsRenderDivRef.innerHTML = markup.join('');
}

watchedButRef.addEventListener('click', renderWatched);
queuedButRef.addEventListener('click', renderQueue);
