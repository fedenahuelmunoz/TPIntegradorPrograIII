const pantalla = document.querySelector(".modoOscuro")
pantalla.addEventListener("click",function(){
    var element = document.body;
    element.classList.toggle("dark-mode");
    const logo = document.querySelector(".header-nav img"); // o el selector que uses
    
    if (document.body.classList.contains("dark-mode")) {
        // Si está en modo oscuro, cambias la ruta de la imagen
        logo.src = "img/modoOscuro.png";
    } else {
        // Si vuelve a modo claro, pones la imagen original
        logo.src = "img/modoClaro.png";
}
});



let slideIndex = 1;
showSlides(slideIndex);

//Controlar next y prev
function  plusSlides(n){
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n){
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if ( n> slides.length){slideIndex = 1}
    if (n<1){slideIndex = slides.length}
    for (i = 0; i< slides.length; i++){
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display  = "block";
}