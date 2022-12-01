//window.onload = function() {
    //

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
   // child = canvas.querySelector('.cart-position');
    //console.log(child)
   //  {
       // canvas.style= "display: none";
        //clearCart.style= "display: flex";
