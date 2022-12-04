import { hideSpinner, showSpinner } from './spinner';
import axios from 'axios';

export default class MoviesApiService {
  constructor() {
    this.page = 1;
    this.query = '';
    this.API_KEY = '2d95e97f255e7635245c1980eab541d3';
    this.BASE_URL = 'https://api.themoviedb.org/3/';
  }

  async getGenres() {
    try {
      const { data } = await axios.get(
        `${this.BASE_URL}genre/movie/list?api_key=${this.API_KEY}&language=en-US`
      );
      return data.genres;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchTrending() {
    const searchParams = new URLSearchParams({
      page: this.page,
      include_adult: false,
      api_key: this.API_KEY,
    });

    try {
      showSpinner();
      const result = await axios.get(
        `${this.BASE_URL}trending/movie/week?${searchParams}`
      );
      localStorage.setItem(
        'currentFilmList',
        JSON.stringify(result.data.results)
      );
      localStorage.setItem(
        'totalResults',
        JSON.stringify(result.data.total_results)
      );
      hideSpinner();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMoviesByKeyword() {
    const searchParams = new URLSearchParams({
      page: this.page,
      include_adult: false,
      api_key: this.API_KEY,
      language: 'en-US',
      query: this.query,
    });

    try {
      showSpinner();
      const result = await axios.get(
        `${this.BASE_URL}search/movie?${searchParams}`
      );
      localStorage.setItem(
        'currentFilmList',
        JSON.stringify(result.data.results)
      );
      localStorage.setItem(
        'totalResults',
        JSON.stringify(result.data.total_results)
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
