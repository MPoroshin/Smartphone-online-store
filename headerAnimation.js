fun = function fun(event) {
  header = document.getElementsByClassName('header')
  let posTop = window.pageYOffset;

  if (Number(posTop) < 60) {
    header[0].style= "height: 65px;";
  } else {
    header[0].style= "height: 40px;";
  }
}



function Anim() {
console.log(window.pageYOffset)
if (document.documentElement.clientWidth != window.innerWidth) {
        document.addEventListener('wheel', fun)
        document.addEventListener('scroll', fun)

    } else {
        document.removeEventListener('wheel', fun)
        document.removeEventListener('scroll', fun)
        header = document.getElementsByClassName('header')
        header[0].style= "height: 65px;";
    }
}

Anim()