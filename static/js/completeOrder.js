el = document.querySelector(".complete-order")
el.onclick = () => {
    const isNumeric = n => !!Number(n);
    document.querySelector('.count').innerHTML.replace(/[^\d.]/g, '');
    count = document.querySelector('.count')

    if (Number(count.innerHTML) < 1) {
        count.innerHTML = 1
    }
    if (Number(count.innerHTML) > 99) {
        count.innerHTML = 99
    } else {
        if (!(isNumeric(Number(count.innerHTML)))) {
            count.innerHTML = 1
        }
    }
    fullPrice = document.querySelector('.order-price-span').innerHTML
    username = document.querySelector('.name-user-input').value
    phone = document.querySelector('.phone-user-input').value
    address = document.querySelector('.address-user-input').value
    method = document.querySelector('input[name="payment-method"]:checked').value

    var xhr = new XMLHttpRequest();
    let json = JSON.stringify({
      'username': username,
      'phone': phone,
      'address': address,
      'method': method,
    });
    xhr.open("POST", '/cart', false,);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json)

    if (xhr.status === 200) {
        var xhr2 = new XMLHttpRequest()
        xhr2.open(
          'GET',
          '/validationOrder',
          false,
        )
        xhr2.send()
        if (xhr2.status === 200) {
            console.log(JSON.parse(xhr2.responseText)['errors'])
            errors = JSON.parse(xhr2.responseText)['errors']
            if (errors.length == 0) {
                location.href = '/order'
            }
            else {
                document.getElementsByClassName('div-error')[0].style= "display: flex";

                if (errors.includes('address')) {
                    document.querySelector('.span-error').innerHTML = 'Поле для ввода Адреса заполнено неправильно!';
                }
                if (errors.includes('phone')) {
                    document.querySelector('.span-error').innerHTML = 'Поле для ввода Номера телефона заполнено неправильно!';
                }
                if (errors.includes('username') == true) {
                    document.querySelector('.span-error').innerHTML = 'Поле для ввода Фамилии и Имени заполнено неправильно!';
                }

            }
        }
    }
}