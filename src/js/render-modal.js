import { watched, queue } from './library-page-only/modal';
export function renderModal(list, id) {
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
  } = list[id];
  const genres = JSON.parse(localStorage.getItem('allGenres'));
  const finalGenres = [];
  genre_ids.forEach(idx => {
    finalGenres.push(genres.find(genre => genre.id === idx).name);
  });

  const foundInWatched = watched.find(film => film.id === film_id);
  const foundInQueue = queue.find(film => film.id === film_id);

  const isInQueue = !!foundInQueue;
  const isInWatched = !!foundInWatched;

  const queueBtnMarkup = isInQueue
    ? `<button class="modal__btn-queue interactive-button" data-id=${id}>remove from queue</button>`
    : `<button class="modal__btn-queue interactive-button" data-id=${id}>add to queue</button>`;

  const watchedBtnMarkup = isInWatched
    ? `<button class="modal__btn-watched interactive-button" data-id=${id}>
        remove from Watched
      </button>`
    : `<button class="modal__btn-watched interactive-button" data-id=${id}>
        add to Watched
      </button>`;

  const voteCount =
    vote_count && vote_average
      ? `<li class="modal__item">
          <div class="modal__item-first">Vote / Votes</div>
          <div class="modal__item-votes">
            <span class="modal__item-bg modal__item--accent">${vote_average.toFixed(
              1
            )}</span> /
            <span class="modal__item-bg modal__item--grey">${vote_count}</span>
          </div>
        </li>`
      : '';
  const popularityMarkup = popularity
    ? `<li class="modal__item">
          <div class="modal__item-first">Popularity</div>
          <div>${popularity.toFixed(1)}</div>
        </li>`
    : '';
  const genresMarkup = finalGenres.length
    ? `<li class="modal__item">
          <div class="modal__item-first">Genre</div>
          <div>${finalGenres.join(', ')}</div>
        </li>`
    : '';
  const originalTitleMarkup = original_title
    ? `<li class="modal__item">
          <div class="modal__item-first">Original Title</div>
          <div class="modal__item-title">${original_title}</div>
        </li>`
    : '';
  const overviewMarkup = overview
    ? `<div class="modal__about-info">
        <p class="modal__about-headline">About</p>
        <p class="modal__about-text">
          ${overview}
        </p>
      </div>`
    : '';
  const photoMarkup = poster_path
    ? `<div class="modal__img">
      <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" />
    </div>`
    : '';

  return [
    `${photoMarkup}
    <div class="modal__about">
      <div class="modal__headline">${title}</div>
      <ul class="modal__list">
        ${voteCount}
        ${popularityMarkup}
        ${originalTitleMarkup}
        ${genresMarkup}
      </ul> 
      ${overviewMarkup}
          <div class="modal__buttons">
      ${watchedBtnMarkup}
      ${queueBtnMarkup}
      <button class='modal_btn-watched interactive-button modal_btn-watch-trailer' data-id=${film_id}>watch trailer</button>
    </div>
    </div>
    `,
    isInQueue,
    isInWatched,
  ];
}
