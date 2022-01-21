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

function changeClassActive(event){
  let current = event.target;
  allButtons.forEach(el => {
    if(el.classList.contains("activeBtn")){
      el.classList.remove("activeBtn")
    }
  })
  current.classList.add("activeBtn")
}

allButtons.forEach(el => {
  el.addEventListener('click', changeClassActive)
})

//Translate page

const languageButtons = document.querySelectorAll('[data-language]');

function getTranslate(event){
    let language = event.target.dataset.language;
    lang = language;
    localStorage.setItem('lang', lang);
    const allElements = document.querySelectorAll('[data-i18]');
    allElements.forEach(element => {
      element.textContent = i18Obj[language][element.dataset.i18];
    })
}

languageButtons.forEach(el => {
  el.addEventListener('click',getTranslate)
})

//Change theme of the page

const pageElements = [ "hero", "background-container","button-language","btn-language", "contacts", "hero-button", "section-title", "portfolio-title","portfolio-button", "portfolioBtn","portfolioBtn1","portfolioBtn2", "video-title", "price-title","price-button","priceBtn","priceBtn1","contact-title","contact-input","contact-tel","contact-text", "contactBtn"]

const refs = {
  lightBtn: document.querySelector('[data-color="light"]'),
  darkBtn: document.querySelector('[data-color="dark"]'),
};

refs.lightBtn.addEventListener('click', function () {
    theme = 'light';
    localStorage.setItem('theme', theme);
    refs.lightBtn.classList.add('invisible');
    document.body.classList.add('theme-light')

    pageElements.forEach((element) => {
      const a = document.querySelector(`.${element}`);
      a.classList.add('light-background');
    })

    refs.darkBtn.classList.remove('invisible');
})

refs.darkBtn.addEventListener('click', function () {
    theme = 'dark';
    localStorage.setItem('theme', theme);
    refs.darkBtn.classList.add('invisible');

    pageElements.forEach((element) => {
      const a = document.querySelector(`.${element}`);
      a.classList.remove('light-background');
    })

    document.body.classList.remove('theme-light')
    refs.lightBtn.classList.remove('invisible');
})

function changeTheme(theme) {
  if (theme === 'light') {
    refs.lightBtn.classList.add('invisible');
    document.body.classList.add('theme-light')

    pageElements.forEach((element) => {
      const a = document.querySelector(`.${element}`);
      a.classList.add('light-background');
    })

    refs.darkBtn.classList.remove('invisible');
  }else{
    refs.darkBtn.classList.add('invisible');

    pageElements.forEach((element) => {
      const a = document.querySelector(`.${element}`);
      a.classList.remove('light-background');
    })

    document.body.classList.remove('theme-light')
    refs.lightBtn.classList.remove('invisible');
  }
}

function changeLanguage(){
  if(localStorage.getItem('lang') === "ru"){
    const allElements = document.querySelectorAll('[data-i18]');
    allElements.forEach(element => {
      element.textContent = i18Obj.ru[element.dataset.i18];
    })} else{
    const allElements = document.querySelectorAll('[data-i18]');
    allElements.forEach(element => {
      element.textContent = i18Obj.en[element.dataset.i18];
    })
  }
}

//Дополнительный функционал: данные хранятся в local storage

function getLocalStorage() {
  if(localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    changeLanguage(lang);
  }
  if(localStorage.getItem('theme')) {
    const theme = localStorage.getItem('theme');
    changeTheme(theme);
  }
}
window.addEventListener('load', getLocalStorage)

//

const buttonRipple = document.querySelector('.ripple');

console.log(buttonRipple)

buttonRipple.addEventListener('click', function (e) {
  const x = e.clientX
  const y = e.clientY

  const buttonTop = e.target.offsetTop
  const buttonLeft = e.target.offsetLeft


  const xInside = x - buttonLeft
  const yInside = y - buttonTop


  const circle = document.createElement('span')
  circle.classList.add('circle')
  circle.style.top = yInside + 'px'
  circle.style.left = xInside + 'px'

  this.appendChild(circle)

  setTimeout(() => circle.remove(), 500)
})







