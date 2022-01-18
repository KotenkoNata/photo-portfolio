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
  if(event.target.classList.contains('portfolio-button')) {
    let season = event.target.dataset.season;
    portfolioImages.forEach((img, index, ) => img.src = `assets/img/${season}/${index + 1}.jpg`)

  }
}

portfolioBtns.addEventListener('click',changeImage);




console.log(`Score: 75 / 75;\n 1. Вёрстка соответствует макету. Ширина экрана 768px +48/48;\n 2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15/15;\n 3. На ширине экрана 768рх и меньше реализовано адаптивное меню +22/22;`)
