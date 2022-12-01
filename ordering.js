

function Main() {
    let finalPrice = 0
document.querySelectorAll(".cart-position").forEach(
    el => {
        count = el.querySelector('.count').innerHTML
        price = el.querySelector('.price').innerHTML
        finalPrice += (Number(count) * Number(price))
    }
)
document.querySelector('.order-price-span').innerHTML = finalPrice
}

Main()


        //data = el.parentNode.querySelector('.count');
        //var val = +data.innerHTML;

       // data.innerHTML = val + 1;
       // value = el.querySelector('.good-id-input')
       // var xhr = new XMLHttpRequest();
        //let json = JSON.stringify({
         // 'count-cart': data.innerHTML,
          //'good-id': value.value

