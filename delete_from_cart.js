document.querySelectorAll(".button-delete").forEach(
    el=>el.onclick = () => {

        data = el.childNodes[3];
        var xhr = new XMLHttpRequest();

        let json = JSON.stringify({
          'cart-good-id': data.value,
        });
        xhr.open("POST", '/cart');
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json)



        parent = el.parentNode.parentNode.parentNode
        el.parentNode.parentNode.remove();
        child = parent.querySelector('.cart-position');
        Main()
        if (child == null) {
            parent.remove();
            document.getElementsByClassName('div-empty-cart')[0].style= "display: flex";
        }

        Anim()

    }
)

