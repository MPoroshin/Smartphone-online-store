

document.querySelectorAll(".add-to-cart").forEach(
    el=>el.onclick = () => {
        data = el.childNodes[3];
        console.log(data.value);
        var xhr = new XMLHttpRequest();


        xhr.open("POST", '/');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        xhr.send("good_id=" + data.value);
        console.log(xhr.status);
    }
)

// Передаём name и surname в параметрах запроса





//document.addEventListener('click', function(e) {
 //   e = e || window.event;
 //   var target = e.target || e.srcElement,
 //       text = target.textContent || target.innerText;
 //   console.log(target)
//}, false);



//document.querySelectorAll(".add-to-cart").forEach(
    //el=>el.onclick = () => {
        //console.log(this.value)
    //}
//)



//document.querySelector(".add-to-cart").onclick = () => {
   // console.log(this.value)
//}


//var elements = document.querySelectorAll(".add-to-cart")
//console.log(elements);
//for (var i = 0; i < elements.childNodes.length; i++) {
    //if (elements.childNodes[i].className == "") {
     // notes = elements.childNodes[i];
    //  break;
    //}
//}

//document.querySelector('.add-to-cart').addEventListener('click',function(e){
  //if (e.target.classList.contains('good-id-input')) {
  //  console.log(e.target.value);
  //}

//})
//document.querySelectorAll(".add-to-cart").forEach(
    //el=>el.onclick = () => {
       // for (var i = 0; i < el.childNodes.length; i++) {
         //   console.log(el.childNodes[i].value);
          //  if (el.childNodes[i].className == "good-id-input") {
          //    console.log(el.childNodes[i].value);
            //  break;
           // }
       // }

   // }
//)








// document.querySelectorALL('.add-to-cart')