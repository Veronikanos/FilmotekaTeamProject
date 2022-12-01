export function renderSearchResult(movies) {
  console.log(movies);
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
              alt="${title || original_title || ''}"
              class="main-section__image"
              loading="lazy"
            />
          <p class="main-section__name" ">
					${title || original_title || ''} <br />
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
    poster = `https://media.istockphoto.com/id/1193046540/vector/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-background-no-website.jpg?s=612x612&w=0&k=20&c=4wx1UzigP0g9vJv9D_DmOxdAT_DtX5peZdoS4hi2Fqg=`;
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
    res.push(h.name);
  }
  const formattedGenres =
    res.length > 2 ? `${res[0]}, ${res[1]}, Other` : res.join(', ');
  return formattedGenres;
}
