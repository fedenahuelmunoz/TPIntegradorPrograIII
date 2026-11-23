
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

async function obtenerProductosActivos(){
    try {
        const response = await fetch(`${urlBase}/api/products/active`); // Así obtenemos los productos activos
        console.log(response);

        const data = await response.json();
        productos = data.payloads || [];
        console.log("productos cargados:", productos);

        // Filtramos los productos según su categoría
        const notebooksActivas = productos.filter(item => item.category.toLowerCase() === "notebook");
        const celularesActivos = productos.filter(item => item.category.toLowerCase() === "cellphone");


        // Renderizamos cada grupo en su contenedor correspondiente
        renderizarProductos(notebooksActivas, contenedorNotebooks);
        renderizarProductos(celularesActivos, contenedorCelulares);

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
                    <h4>${products.name}</h4>
                    <h3>$${products.price}</h3>
                    <button class="btn-agregar" onclick="agregarCarrito(${products.id})">Agregar al carrito</button>
                </div>
            </div>    
        `;    
    });

    contenedorDestino.innerHTML = htmlProductos;
}
obtenerProductosActivos();
/*Código JS para darle intectividad a nuestro sitio web*/
let objetosCarrito = document.getElementById("carrito-container");
const totalCarrito = document.getElementById("total-carrito");
let carrito = [];
let productos = [];

function mostrarCarrito (){
    let carritoCompra = "";
    let precioTotal = 0;

    carrito.forEach((producto,indice) =>{
        carritoCompra +=`
            <div>

                <h3 >${producto.name} - $${producto.price} </h3>
                <button class="delete-btn" onclick="eliminar(${indice})">Eliminar</button>
            </div>
            `;
        precioTotal += Number(producto.price);
            });

//Imprimir  HTML de producto
objetosCarrito.innerHTML = carritoCompra;
//Mostrar precio total y contador carrito
totalCarrito.innerHTML = `${precioTotal}`


if(carrito.length > 0) {
    document.getElementById("empty-cart").classList.remove("hidden");
    document.getElementById("empty-cart").classList.add("visible");

    document.getElementById("btn-imprimir").classList.remove("hidden");
    document.getElementById("btn-imprimir").classList.add("visible");
} else {
    document.getElementById("empty-cart").classList.remove("visible");
    document.getElementById("empty-cart").classList.add("hidden");
    document.getElementById("btn-imprimir").classList.remove("visible");
    document.getElementById("btn-imprimir").classList.add("hidden");

    objetosCarrito.innerHTML = '<p class="info-carrito">No hay productos en el carrito .</p>';
}
};



function agregarCarrito(id){
    console. log( `id del producto: ${id}` );
    const productoSeleccionado = productos.find(producto => producto.id == id);
    if (!productoSeleccionado) {
        console.warn("No se encontró el producto con id:", id);
        return;
    }
    carrito.push(productoSeleccionado);

mostrarCarrito();
}
function eliminar(indice) {
    carrito.splice(indice, 1);
    mostrarCarrito();
}
const nombreGuardado = sessionStorage.getItem("nombreUsuario");
const cliente = document.getElementById("nombre-cliente");

if (cliente && nombreGuardado) {
    cliente.textContent = nombreGuardado;
}