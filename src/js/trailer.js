import axios from 'axios';
import { showModal } from './modal';

const trailerOverflow = document.querySelector('#trailerOverflow');
const trailerModal = document.querySelector('#trailerModal');
const trailerDiv = document.querySelector('#trailerDiv');
const modal = document.querySelector('.modal');
const overflow = document.querySelector('.overflow');
const trailerCloseBtn = document.querySelector('#trailerClose');

export async function watchTrailer(e) {
  modal.classList.add('move-left');
  overflow.classList.add('move-left');
  trailerModal.classList.remove('move-right');
  trailerOverflow.classList.remove('move-right');

  document.addEventListener('keydown', closeTrailerOnEsc);
  overflow.addEventListener('click', closeTrailerOverflow);
  trailerCloseBtn.addEventListener('click', closeTrailer);

  const trailers = await fetchTrailer(e.target.dataset.id);
  renderTrailer(trailers.data.results[0].key);
}

function renderTrailer(key) {
  trailerDiv.innerHTML = `
  <iframe class="trailer__youtube" height="315" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;
}

function closeTrailerOverflow(e) {
  if (e.currentTarget === e.target) closeTrailer();
}

function closeTrailerOnEsc(e) {
  if (e.code === 'Escape') closeTrailer();
}

function closeTrailer() {
  trailerModal.classList.add('move-right');
  trailerOverflow.classList.add('move-right');
  modal.classList.remove('move-left');
  overflow.classList.remove('move-left');

  document.removeEventListener('keydown', closeTrailerOnEsc);
  overflow.removeEventListener('click', closeTrailerOverflow);
  trailerCloseBtn.removeEventListener('click', closeTrailer);

  trailerModal.addEventListener('transitionend', stopVideo);
}

function stopVideo() {
  trailerDiv.innerHTML = '';
  trailerModal.removeEventListener('transitionend', stopVideo);
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
