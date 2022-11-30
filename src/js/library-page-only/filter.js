const watchedButRef = document.querySelector('.watchedJS');
const queuedButRef = document.querySelector('.queueJS');

const cardsRenderDivRef = document.querySelector('.main-section__allcards');
import { renderSearchResult } from '../render-markup';

const DATA_KEY1 = 'watched';
const DATA_KEY2 = 'queue';

const renderData = () => {
  let dataToRender = JSON.parse(localStorage.getItem(DATA_KEY1));
  const markup = renderSearchResult(dataToRender);
  console.log('markup:', markup);
  cardsRenderDivRef.insertAdjacentHTML('beforeend', markup.join(''));
  const inputNames = Object.keys(dataToRender);
  console.log(inputNames);
};
renderData();
