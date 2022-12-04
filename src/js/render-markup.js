import emptyPhoto from '../images/empty-photo/empty-poster.jpg';

export function renderSearchResult(movies) {
  const allMovies = movies.map(
    (
      {
        poster_path,
        release_date,
        original_title,
        title,
        genre_ids,
        vote_average,
      },
      idx
    ) => {
      let { poster, releaseYear } = checkDataBeforeRender(
        poster_path,
        release_date
      );

      return `<div class="main-section__card" id="${idx}" data-id="${idx}" data-rating="${vote_average}">
            <img
              src="${poster}"
              alt="${title || original_title || 'poster image'}"
              class="main-section__image"
              loading="lazy"
            />
          <p class="main-section__name">
					${title || original_title || 'No Title'} <br />
					<span class="main-section__description">${findGenres(genre_ids) || 'No Genre'}
					| ${releaseYear}</span>
				</p>
        </div>`;
    }
  );
  return allMovies;
}

function checkDataBeforeRender(poster_path, releaseDate) {
  let poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
  let releaseYear;

  if (!poster_path) {
    poster = `${emptyPhoto}`;
  }
  if (!releaseDate) {
    releaseYear = 'No release year';
  } else {
    releaseYear = parseInt(releaseDate);
  }
  return { poster, releaseYear };
}

function findGenres(ids) {
  const genres = JSON.parse(localStorage.getItem('allGenres'));
  let res = [];
  for (const item of ids) {
    let h = genres.find(genre => genre.id === Number(item));
    h.name !== 'Science Fiction' ? res.push(h.name) : res.push('Sci-Fi');
  }
  const formattedGenres =
    res.length > 2 ? `${res[0]}, ${res[1]}, Other` : res.join(', ');
  return formattedGenres;
}
