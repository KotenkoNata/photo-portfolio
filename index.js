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

console.log(`Score: 100 / 100;\n 1. Вёрстка валидная +10/+10;\n 2. Вёрстка семантическая +20/20;\n 3. Вёрстка соответствует макету +48/48; \n 4. Требования к css + 12/12; \n 5. Интерактивность, реализуемая через css +20/20; \n`)