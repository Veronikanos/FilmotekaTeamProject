const axios = require('axios').default;

const API_KEY = '2d95e97f255e7635245c1980eab541d3';

export async function getGenres() {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    return data.genres;
  } catch (error) {
    console.log(error);
  }
}
