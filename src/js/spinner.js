export function hideSpinner() {
  return setTimeout(() => {
    const loader = document.querySelector('.sk-chase');
    loader.classList.add('sk-chase-hidden');
  }, 500);
}

export async function showSpinner() {
  const loader = document.querySelector('.sk-chase');
  loader.classList.remove('sk-chase-hidden');
}
