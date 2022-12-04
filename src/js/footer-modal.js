const footerCloseModalBtn = document.querySelector('.footer-closeModalBtn-js');
const footerLink = document.querySelector('.footer-link-js');
const footerBackdrop = document.querySelector('.footer-backdrop');

footerCloseModalBtn.addEventListener('click', onCloseFooterModal);
footerLink.addEventListener('click', onOpenFooterModal);
footerBackdrop.addEventListener('click', onClickFooterBackdrop);

function onOpenFooterModal(event) {
  event.preventDefault();
  footerBackdrop.classList.remove('is-hidden');
  document.addEventListener('keydown', onEscPress);
}

function onCloseFooterModal(event) {
  footerBackdrop.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscPress);
}

function onClickFooterBackdrop(event) {
  if (event.target === event.currentTarget) {
    onCloseFooterModal();
  }
}

function onEscPress(event) {
  if (event.code === 'Escape') {
    onCloseFooterModal();
  }
}
