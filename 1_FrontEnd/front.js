/*Código JS para darle intectividad a nuestro sitio web*/

/*Con querySelector buscamos el primer elemento con la clase modoOscuro: el botón del header*/
const pantalla = document.querySelector(".modoOscuro")

/*Escuchador de eventos para el boton con la clase modoOscuro*/
pantalla.addEventListener("click",function(){
    
    /*Accedemos al body de la página*/
    var element = document.body;

    element.classList.toggle("dark-mode"); // Le asigna la clase dark-mode al body o se la saca si ya lo tiene
    
    /*Seleccionamos el logo al que se le hace click para entrar en el modo oscuro*/
    const logoDarkMode = document.querySelector(".site-header #button"); // o el selector que uses
    
    if (document.body.classList.contains("dark-mode")) {
        // Si está en modo oscuro, se cambian las rutas de las imagenes (la del logo de la empresa y la del boton para modo oscuro)
        logoDarkMode.src = "img/modoOscuro.png"; // Nuevo boton de modo oscuro
    } else {
        // Si vuelve a modo claro, pones la imagen original
        logoDarkMode.src = "img/modoClaro.png"; //Boton original modo oscuro
}
});

/*Lógica para controlar las diapositivas del carrusel*/
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

/*Lógica para renderizar las tarjetas según las categorias de productos (notebooks y celulares)*/

const urlBase = "http://localhost:3000";

// Apuntamos a los dos contenedores específicos del HTML
const contenedorNotebooks = document.getElementById("notebooks-container");
const contenedorCelulares = document.getElementById("celulares-container");

async function obtenerProductos() {
    try {
        const response = await fetch(`${urlBase}/api/products`);
        console.log(response);

        const data = await response.json();
        const products = data.payload;

        // Filtramos los productos según su categoría
        const notebooks = products.filter(item => item.category.toLowerCase() === "notebook");
        const celulares = products.filter(item => item.category.toLowerCase() === "cellphone");

        // Renderizamos cada grupo en su contenedor correspondiente
        renderizarProductos(notebooks, contenedorNotebooks);
        renderizarProductos(celulares, contenedorCelulares);

    } catch (error) {
        console.error("Error al obtener los productos", error);
    }
}

function renderizarProductos(array, contenedorDestino) {
    let htmlProductos = "";

    array.forEach(products => {
        htmlProductos += `
            <div class="card-producto">
                <img class="card-img" src="${products.image}" alt="${products.name}">
                <div class="card-text">
                    <h3>Id: ${products.id}</h3>
                    <h4>${products.name}</h4>
                    <h3>${products.category}</h3>
                    <h3>$${products.price}</h3>
                    <button class="btn-agregar">Agregar al carrito</button>
                </div>
            </div>    
        `;    
    });

    contenedorDestino.innerHTML = htmlProductos;
}

obtenerProductos();