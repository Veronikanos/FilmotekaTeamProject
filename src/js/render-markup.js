export function renderSearchResult(movies) {
  const allMovies = movies.map(
    ({ poster_path, release_date, original_title, title, genre_ids }, idx) => {
      return `<div class="main-section__card" id="${idx}" data-id="${idx}">
            <img
              src="https://image.tmdb.org/t/p/w500${poster_path}"
              alt="${title}"
              class="main-section__image"
              loading="lazy"
            />
          <p class="main-section__name">
					${original_title} <br />
					<span class="main-section__description">${findGenres(genre_ids)}
					| ${parseInt(release_date)}</span>
				</p>
        </div>`;
    }
  );
  return allMovies;
}

function findGenres(ids) {
  const genres = JSON.parse(localStorage.getItem('allGenres'));
  let res = [];
  for (const item of ids) {
    let h = genres.find(genre => genre.id === Number(item));
    res.push(h.name);
  }
  return res.join(', ');
}
