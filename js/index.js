//ELEMENTS
console.log("adaASDASADASDASDAD#R#RWEFSDFdad");
const navToggle = document.querySelector(".header__nav-toggle");
const nav = document.querySelector(".header__nav");
const footerInput = document.querySelector(".footer__form-input");

//STATE

let isMenuDropped = false;

document.addEventListener('click', (e) => {
  console.log('CLICK IN DOCUMENT')
  if (isMenuDropped & e.target != nav) {
    toggeMenu();
  }
});

navToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu();
});

function toggleMenu() {
  isMenuDropped = !isMenuDropped;
  navToggle.classList.toggle("clicked");
  nav.classList.toggle("visible");
}

input.addEventListener('focus', () => {
  dynamics.animate(input, {
    width: au
  }, {
    type: dynamics.spring,
    frequency: 200,
    friction: 200,
    duration: 1500
  })
})
