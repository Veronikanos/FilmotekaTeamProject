const axios = require('axios').default;

export default class MoviesApiService {
  constructor() {
    this.page = 1;
    this.query = '';
    this.API_KEY = '2d95e97f255e7635245c1980eab541d3';
  }

  async fetchTrending() {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.API_KEY}`
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMoviesByKeyword() {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=en-US&query=${this.query}&page=${this.page}&include_adult=false`
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
