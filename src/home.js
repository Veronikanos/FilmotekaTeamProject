const axios = require('axios').default;

const API_KEY = '2d95e97f255e7635245c1980eab541d3';
const allCardsSection = document.querySelector('.main-section__allcards');

onLoadedHomePage();

async function onLoadedHomePage() {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    console.log(result.data.results);
    const res = createMarkupTrendingFilms(result.data.results);
    allCardsSection.insertAdjacentHTML('beforeend', res.join(''));
  } catch (error) {
    console.log(error);
  }
}

function createMarkupTrendingFilms(movies) {
  const allMovies = movies.map(
    ({ poster_path, release_date, original_title, title }) => {
      return `
			<div class="main-section__card">
				<img
					src="https://image.tmdb.org/t/p/w500${poster_path}"
					alt="${title}"
					class="main-section__image"
					loading="lazy"
				/>
				<p class="main-section__name">
					${original_title} <br />
					<span class="main-section__description">Drama, Action 
					| ${parseInt(release_date)}</span>
				</p>
			</div>
	`;
    }
  );
  return allMovies;
}
