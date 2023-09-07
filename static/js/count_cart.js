


document.querySelectorAll(".plus-count").forEach(
    el=>el.onclick = () => {
        data = el.parentNode.querySelector('.count');



        var val = Number(data.innerHTML);
        if (data.innerHTML < 99) {
            var val = Number(data.innerHTML);
            data.innerHTML = val + 1;
        } else {data.innerHTML = 99}
        value = el.querySelector('.good-id-input')
        var xhr = new XMLHttpRequest();
        let json = JSON.stringify({
          'count-cart': Number(data.innerHTML),
          'good-id': value.value
        });
        xhr.open("POST", '/cart');
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json)
        Main()
    }
)

document.querySelectorAll(".minus-count").forEach(
    el=>el.onclick = () => {
        data = el.parentNode.querySelector('.count');
        if (Number(data.innerHTML) > 1) {
            var val = Number(data.innerHTML);
            data.innerHTML = val - 1;
        } else {data.innerHTML = 1}

        value = el.querySelector('.good-id-input')
        var xhr = new XMLHttpRequest();
        let json = JSON.stringify({
          'count-cart': Number(data.innerHTML),
          'good-id': value.value
        });
        xhr.open("POST", '/cart');
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json)
        Main()
    }
)


