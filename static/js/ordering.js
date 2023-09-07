function Main() {
    let finalPrice = 0
    document.querySelectorAll(".cart-position").forEach(
        el => {
            count = el.querySelector('.count').innerHTML
            price = el.querySelector('.price').innerHTML
            finalPrice += (Number(count) * Number(price))
        }
    )
    document.querySelector('.order-price-span').innerHTML = finalPrice.toLocaleString();
}

Main()
