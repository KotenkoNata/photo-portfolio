let menuBtn = document.querySelector('.header-burger');
let menu = document.querySelector('.burger-menu');

menuBtn.addEventListener('click', function(){
  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
})



console.log(`Score: 100 / 100;\n 1. Вёрстка валидная +10/+10;\n 2. Вёрстка семантическая +20/20;\n 3. Вёрстка соответствует макету +48/48; \n 4. Требования к css + 12/12; \n 5. Интерактивность, реализуемая через css +20/20; \n`)