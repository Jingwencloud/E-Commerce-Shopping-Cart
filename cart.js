let cartIcon = document.querySelector(".nav-cart");
let mobileCartIcon = document.querySelector(".mobile-nav-cart");
let cart = document.getElementById("cartcontent");
let cartCloseIcon = document.querySelector("#close-cart");
const nav = document.getElementById("navbar");

if(mobileCartIcon != null) {
    mobileCartIcon.addEventListener('click', openCartPage);
}

cartIcon.addEventListener('click', openCartPage);
cartCloseIcon.addEventListener('click', closeCartPage);

function openCartPage() {
    if (window.innerWidth <= 810) {
        // have to close the side bar menu first
        nav.classList.remove('active');
    }
    cart.classList.add('active');
}

function closeCartPage() {
    cartCloseIcon.addEventListener('click', () => {
        cart.classList.remove('active');
    });
}

