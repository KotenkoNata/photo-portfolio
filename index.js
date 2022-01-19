import { i18Obj } from './translate.js';

(() => {
  const refs = {
    openModalBtn: document.querySelector(".header-burger"),
    menu: document.querySelector(".burger-menu"),
    menuItems: document.querySelectorAll(".burger-menu li"),
    body: document.querySelector('body'),
  };

  function toggleModal() {
    refs.openModalBtn.classList.toggle("active");
    refs.menu.classList.toggle("active");
    refs.body.classList.toggle('lock');
  }

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.menuItems.forEach(el => {
    el.addEventListener('click', toggleModal)
  })

})();

//Смена изображений в секции Portfolio

const portfolioBtns = document.querySelector('.portfolio-button-list');
const portfolioImages = document.querySelectorAll('.portfolio-image');

function changeImage(event) {
  if (event.target.classList.contains('portfolio-button')) {
    let season = event.target.dataset.season;
    portfolioImages.forEach((img, index,) => img.src = `assets/img/${season}/${index + 1}.jpg`)

  }
}

portfolioBtns.addEventListener('click', changeImage);

//Кеширование изображений

const seasons = ['winter', 'spring', 'summer', 'autumn'];

function preloadImages() {
  seasons.forEach((element) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${element}/${i}.jpg`;
    }
  })
}

preloadImages();

//Подсветка активной кнопки

const allButtons = document.querySelectorAll('.button');

function changeClassActive(className) {
  return function (event) {
    const element = event.target
    element.classList.toggle(className);
  }
}

allButtons.forEach(el => {
  el.classList.remove('activeBtn');
  el.addEventListener('click', changeClassActive("activeBtn"))

})

//Translate page

const languageButtons = document.querySelectorAll('[data-language]');

function getTranslate(event){
    let language = event.target.dataset.language;
    const allElements = document.querySelectorAll('[data-i18]');
    allElements.forEach(element => {
      element.textContent = i18Obj[language][element.dataset.i18];
    })
}

languageButtons.forEach(el => {
  el.addEventListener('click',getTranslate)
})

//Change theme of the page

const pageElements = [ "hero", "background-container", "contacts" ]

const themeBtn = document.querySelectorAll('.header-theme-button');

const refs = {
  lightBtn: document.querySelector('[data-color="light"]'),
  darkBtn: document.querySelector('[data-color="dark"]'),
};

console.log(refs.lightBtn, refs.darkBtn)

refs.lightBtn.addEventListener('click', function (event) {
  refs.lightBtn.classList.add('invisible');
  document.body.classList.add('theme-light')

  pageElements.forEach((element) => {
    const a = document.querySelector(`.${element}`);
    a.classList.add('light-background');
  })

  document.body.classList.toggle('theme-dark')
  refs.darkBtn.classList.toggle('invisible');
})

refs.darkBtn.addEventListener('click', function (event) {
  refs.darkBtn.classList.add('invisible');
  document.body.classList.add('theme-dark');

  pageElements.forEach((element) => {
    const a = document.querySelector(`.${element}`);
    a.classList.remove('light-background');
  })

  document.body.classList.toggle('theme-light')
  refs.lightBtn.classList.toggle('invisible');
})







