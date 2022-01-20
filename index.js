import { i18Obj } from './translate.js';

let lang = 'en';
let theme;

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
    lang = language;
    const allElements = document.querySelectorAll('[data-i18]');
    allElements.forEach(element => {
      element.textContent = i18Obj[language][element.dataset.i18];
    })
}

languageButtons.forEach(el => {
  el.addEventListener('click',getTranslate)
})

//Change theme of the page

const pageElements = [ "hero", "background-container", "contacts", "hero-button", "section-title", "portfolio-title","portfolio-button", "portfolioBtn","portfolioBtn1","portfolioBtn2", "video-title", "price-title","contact-title","contact-input","contact-tel","contact-text", "contactBtn"]

const refs = {
  lightBtn: document.querySelector('[data-color="light"]'),
  darkBtn: document.querySelector('[data-color="dark"]'),
};

const valueOfLocalStorage = localStorage.getItem('theme');

refs.lightBtn.addEventListener('click', function (event) {
  // if (valueOfLocalStorage === "light") {
    theme = 'light';
    localStorage.setItem('theme', theme);
    refs.lightBtn.classList.add('invisible');
    document.body.classList.add('theme-light')

    pageElements.forEach((element) => {
      const a = document.querySelector(`.${element}`);
      a.classList.add('light-background');
    })

    refs.darkBtn.classList.toggle('invisible');
  // }
})




refs.darkBtn.addEventListener('click', function (event) {
  // if (valueOfLocalStorage === "dark") {
    theme = 'dark';
    localStorage.setItem('theme', theme);
    refs.darkBtn.classList.add('invisible');

    pageElements.forEach((element) => {
      const a = document.querySelector(`.${element}`);
      a.classList.remove('light-background');
    })

    document.body.classList.toggle('theme-light')
    refs.lightBtn.classList.toggle('invisible');
  // }
})

// function changeTheme(event) {
//   console.log(localStorage.getItem('Theme'))
//   if (localStorage.getItem('Theme') === 'dark') {
//     console.log('dark')
//     document.body.classList.remove('theme-dark');
//     document.body.classList.add('theme-light');
//     localStorage.setItem('Theme', 'light');
//   } else {
//     console.log('light')
//     document.body.classList.remove('theme-light');
//     document.body.classList.add('theme-dark');
//     localStorage.setItem('Theme', 'dark');
//   }
// }

//Дополнительный функционал: данные хранятся в local storage

// function setLocalStorage() {
//   localStorage.setItem('lang', lang);
//   localStorage.setItem('theme', theme);
// }
// window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getTranslate(lang);
  }
  if(localStorage.getItem('theme')) {
    const theme = localStorage.getItem('theme');
    getTranslate(theme);
  }
}
window.addEventListener('load', getLocalStorage)
window.addEventListener('load', getLocalStorage)







