var bar = null;
var nav = null;


window.onload = function() {
    const bar = document.getElementById("bar");
    const nav= document.getElementById("navbar");
    const close = document.getElementById("close");
    if (bar != null) {
        bar.addEventListener('click', () => {
            nav.classList.add('active');
        })
    }

    if (close != null) {
        close.addEventListener('click', () => {
            nav.classList.remove('active');
        })
    }
}

