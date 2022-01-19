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

function preloadSummerImages() {
  seasons.forEach((element) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${element}/${i}.jpg`;
    }
  })

}

preloadSummerImages();

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

//Подготовка файлов с переводом

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




console.log(`Score: 75 / 75;\n 1. Вёрстка соответствует макету. Ширина экрана 768px +48/48;\n 2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15/15;\n 3. На ширине экрана 768рх и меньше реализовано адаптивное меню +22/22;`)
