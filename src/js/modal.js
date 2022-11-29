const cardDivs = document.querySelector('.main-section__allcards');
const modal = document.querySelector('.modal');
const overflow = document.querySelector('.overflow');
const closeBtn = document.querySelector('.modal__close-btn');

cardDivs.addEventListener('click', showModal);

function showModal(e) {
  if (e.currentTarget.nodeName === 'DIV') {
    modal.classList.remove('visually-hidden');
    overflow.classList.remove('visually-hidden');
    cardDivs.removeEventListener('click', showModal);
    document.addEventListener('keydown', closeModalonEsc);
    closeBtn.addEventListener('click', closeModal);
    overflow.addEventListener('click', closeModalOverflow);
  }
}

function closeModalOverflow(e) {
  if (e.currentTarget === e.target) closeModal();
}

function closeModalonEsc(e) {
  if (e.code === 'Escape') closeModal();
}

function closeModal() {
  modal.classList.add('visually-hidden');
  overflow.classList.add('visually-hidden');
  document.removeEventListener('keydown', closeModal);
  closeBtn.removeEventListener('click', closeModal);
  overflow.removeEventListener('click', closeModalOverflow);
}
