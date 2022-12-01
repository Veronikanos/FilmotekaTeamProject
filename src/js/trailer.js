import axios from 'axios';
import { showModal } from './modal';

const trailerOverflow = document.querySelector('#trailerOverflow');
const trailerModal = document.querySelector('#trailerModal');
const trailerDiv = document.querySelector('#trailerDiv');
const modal = document.querySelector('.modal');
const overflow = document.querySelector('.overflow');
const trailerCloseBtn = document.querySelector('#trailerClose');
const cardDivs = document.querySelector('.main-section__allcards');

export async function watchTrailer(e) {
  document.addEventListener('keydown', closeTrailerOnEsc);
  overflow.addEventListener('click', closeTrailerOverflow);
  modal.classList.add('visually-hidden');
  overflow.classList.add('visually-hidden');
  trailerModal.classList.remove('visually-hidden');
  trailerOverflow.classList.remove('visually-hidden');
  trailerCloseBtn.addEventListener('click', closeTrailer);
  const trailers = await fetchTrailer(e.target.dataset.id);
  renderTrailer(trailers.data.results[0].key);
  console.log(trailers.data.results[0].key);
}

function renderTrailer(key) {
  trailerDiv.innerHTML = `
  <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;
}

function closeTrailerOverflow(e) {
  if (e.currentTarget === e.target) closeTrailer();
}

function closeTrailerOnEsc(e) {
  if (e.code === 'Escape') closeTrailer();
}

function closeTrailer() {
  trailerModal.classList.add('visually-hidden');
  trailerOverflow.classList.add('visually-hidden');
  trailerCloseBtn.removeEventListener('click', closeTrailer);
  cardDivs.addEventListener('click', showModal);
  trailerDiv.innerHTML = '';
}

async function fetchTrailer(id) {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=2d95e97f255e7635245c1980eab541d3`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
