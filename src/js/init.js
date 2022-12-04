import MoviesApiService from './api-service';
import { onLoadedHomePage } from './first-loading';

export const moviesApiService = new MoviesApiService();

onLoadedHomePage();
