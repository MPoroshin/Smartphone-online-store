document.querySelectorAll('.price').forEach(
    el => {
        string = Number(el.innerHTML).toLocaleString()
        el.innerHTML = string
    }
)