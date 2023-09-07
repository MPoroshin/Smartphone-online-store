




function load() {
    canvas = document.querySelector('.cart-canvas')
    console.log(canvas)
    clearCart = document.querySelector('.div-empty-cart')
    child = canvas.querySelector('.cart-position');
    if (child == null) {
        canvas.style = "display: none";
        clearCart.style= "display: flex";

    } else {
        canvas.style = "display: flex";
        clearCart.style= "display: none";

    }
}
load()
