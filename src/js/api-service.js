import { hideSpinner, showSpinner } from './spinner';

const axios = require('axios').default;

export default class MoviesApiService {
  constructor() {
    this.page = 1;
    this.query = '';
    this.API_KEY = '2d95e97f255e7635245c1980eab541d3';
  }

  async getGenres() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=en-US`
      );
      return data.genres;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchTrending() {
    try {
      showSpinner();
      const result = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.API_KEY}&page=${this.page}`
      );
      localStorage.setItem(
        'currentFilmList',
        JSON.stringify(result.data.results)
      );
      hideSpinner();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMoviesByKeyword() {
    try {
      showSpinner();
      const result = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=en-US&query=${this.query}&page=${this.page}&include_adult=false`
      );
      localStorage.setItem(
        'currentFilmList',
        JSON.stringify(result.data.results)
      );
      hideSpinner();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  set pageNum(newPage) {
    this.page = newPage;
  }

  get pageNum() {
    return this.page;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
