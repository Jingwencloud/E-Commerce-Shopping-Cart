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

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);

    }

    var addCarts = document.getElementsByClassName('cart');
    for (var i = 0; i < addCarts.length; i++) {
        var cart = addCarts[i];
        cart.addEventListener('click', addCartClicked);
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value == 0) {
        input.value = 1;
    }
    updateTotal();
}

function addCartClicked(event) {
    var itemToAdd = event.target;
    var product = itemToAdd.parentElement;
    var title = product.getElementsByClassName('desc')[0].getElementsByTagName('h5')[0].innerText;
    var price = product.getElementsByClassName('desc')[0].getElementsByTagName('h5')[1].innerText;
    var productImg = product.getElementsByTagName('img')[0].src;
    console.log(title);
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    var cartItemProducts = cartItems.getElementsByClassName('cart-box');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            // item is already inside cart, increment item quantity
            var itemToAdd = cartItemProducts[i];
            const newVal = parseInt(itemToAdd.getElementsByClassName('cart-quantity')[0].value) + 1;
            itemToAdd.getElementsByClassName('cart-quantity')[0].value = newVal;
            return;
        }
    }

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="fa-solid fa-trash cart-remove"></i>`;
    
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

function updateTotal() {
    var cartContent = document.querySelector('.cart-content');
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    total = total.toFixed(2);
    document.querySelector('.total-price').innerText = "$" + total;
}

