import { refs } from './refs';

const { body } = refs;

window.addEventListener('load', () => {
  body.classList.remove('preload');
});
