import { refs } from './refs';

export function hideSpinner() {
  return setTimeout(() => {
    refs.spinner.classList.add('sk-chase-hidden');
  }, 500);
}

export async function showSpinner() {
  refs.spinner.classList.remove('sk-chase-hidden');
}
