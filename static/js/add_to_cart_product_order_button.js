document.querySelectorAll(".button-order").forEach(
    el=>el.onclick = () => {
        data = el.childNodes[3];
        console.log(data.value);
        var xhr = new XMLHttpRequest();


        xhr.open("POST", '/');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        xhr.send("good_id=" + data.value);
        console.log(xhr.status);
        xhr.onreadystatechange = function() {window.location.href = '/cart';}


    }
)