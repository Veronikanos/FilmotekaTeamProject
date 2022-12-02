import { refs } from './refs';

const { cursor, cursorinner } = refs;
const a = document.querySelectorAll('a');

document.addEventListener('mousemove', function (e) {
  const x = e.clientX;
  const y = e.clientY;
  cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
});

document.addEventListener('mousemove', function (e) {
  const x = e.clientX;
  const y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function () {
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover');
});

document.addEventListener('mouseup', function () {
  cursor.classList.remove('click');
  cursorinner.classList.remove('cursorinnerhover');
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});

const header = document.querySelector('.header');
header.addEventListener('mouseover', () => {
  cursor.classList.add('dark-bcg');
});
header.addEventListener('mouseleave', () => {
  cursor.classList.remove('dark-bcg');
});
