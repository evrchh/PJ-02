let images = [
  { url: 'rostov.png', title: 'Rostov', option: 'rostov' },
  { url: 'sochi.png', title: 'Sochi', option: 'sochi' },
  { url: 'rostov2.png', title: 'Rostov', option: 'rostov__second' }
];

function initSlider () {
    const imgContainer = document.querySelector('.gallery__images');
    const nav = document.querySelector('.nav__arrows');
    const listLinks = document.querySelectorAll('.gallery__list .list__link');
    const listLines = document.querySelectorAll('.gallery__list .nav__line');

  initImages();
  initArrows();
  initDots();
  initListLinks();

  function initImages () {
    images.forEach((image, index) => {
      const div = document.createElement('div');
      div.className = `image${index === 0 ? ' active' : ''}`;
      div.style.backgroundImage = `url(${image.url})`;
      div.dataset.index = index;
      imgContainer.appendChild(div);
    });
  }

  function initArrows () {
    nav.querySelectorAll('.nav__arrow').forEach(arrow => {
      arrow.addEventListener('click', (e) => {
        e.preventDefault();
        const cur = +imgContainer.querySelector('.image.active').dataset.index;
        const next = arrow.classList.contains('left')
          ? (cur === 0 ? images.length - 1 : cur - 1)
          : (cur === images.length - 1 ? 0 : cur + 1);
        moveSlider(next);
      });
    });
  }

  function initDots () {
    const dots = nav.querySelectorAll('.nav__dot');
    dots.forEach((dot, i) => {
      if (i === 0) dot.classList.add('nav__active');
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        moveSlider(i);
      });
    });
  }

  function initListLinks() {
        listLinks.forEach((link, i) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                moveSlider(i);
            });
        });
    }

  function moveSlider (num) {
    const curImg = imgContainer.querySelector('.image.active');
    const nextImg = imgContainer.querySelector(`.image[data-index="${num}"]`);
    if (curImg) curImg.classList.remove('active');
    if (nextImg) nextImg.classList.add('active');

    const curDot = document.querySelector('.nav__dot.nav__active');
    const nextDot = document.querySelector(`.nav__dot[data-index="${num}"]`);
    if (curDot) curDot.classList.remove('nav__active');
    if (nextDot) nextDot.classList.add('nav__active');

    document.querySelectorAll('.main__option__item').forEach(item => {
        item.style.display = 'none';
    });
    document.querySelectorAll(`.main__option__item.${images[num].option}`).forEach(item => {
        item.style.display = 'flex';
    });

    listLinks.forEach(link => link.classList.remove('list_active'));
    listLines.forEach(line => line.classList.remove('active__line'));

    if(listLinks[num]) listLinks[num].classList.add('list_active');
    if(listLines[num]) listLines[num].classList.add('active__line');
  }
}

document.addEventListener('DOMContentLoaded', initSlider);