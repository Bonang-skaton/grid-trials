// Toggle class aktiv hmburger menu
const navbarNav = document.querySelector('.navbar-nav');

// ketika hamburger menu di klik muncul sidebar
document.querySelector('#hamburger-menu').onclick = (e) => {
  navbarNav.classList.toggle('active');
  e.preventDefault();
};

// toggly class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
shoppingCart.classList.toggle('active');
e.preventDefault();
}

// klik di luar sidebar untuk menghilangkan sidebar
const hm = document.querySelector('#hamburger-menu');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});