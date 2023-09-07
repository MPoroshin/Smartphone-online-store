let arr = []
document.querySelectorAll('.price-input-filter').forEach(
    el => {
        arr.push(Number(el.value))
    }
)

let maxPrice = Math.max.apply(null, arr)
let minPrice = Math.min.apply(null, arr)

document.querySelector('.after-price').value = minPrice
document.querySelector('.before-price').value = maxPrice

function prices() {
    document.querySelector('.after-price').value.replace(/[^\d.]/g, '');
    document.querySelector('.before-price').value.replace(/[^\d.]/g, '');
    minPrice = Number(document.querySelector('.after-price').value)
    maxPrice = Number(document.querySelector('.before-price').value)

    document.querySelector('.after-price').value = minPrice
    document.querySelector('.before-price').value = maxPrice

    document.querySelectorAll('.price-input-filter').forEach(
        el => {

            if ((Number(el.value) > maxPrice) || (Number(el.value) < minPrice)) {
                el.parentNode.style['display'] = 'none'
            } else {
                el.parentNode.style['display'] = 'inline-block'
            }
        }
    )
}

document.querySelector('.after-price').addEventListener('input', prices)
document.querySelector('.before-price').addEventListener('input', prices)