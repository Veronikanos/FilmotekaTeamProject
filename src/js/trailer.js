import axios from 'axios';

export async function watchTrailer(e) {
  console.log(e.target.dataset.id);
  const trailers = await fetchTrailer(e.target.dataset.id);
  console.log(trailers.data.results[0]);
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
