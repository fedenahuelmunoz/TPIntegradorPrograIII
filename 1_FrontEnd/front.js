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


/*Código JS para manejar el carrito de compras*/
let objetosCarrito = document.getElementById("carrito-container");
const totalCarrito = document.getElementById("total-carrito");
let carrito = []; // Es nuestro array de productos que el cliente agrega al carrito
let productos = [];

// Función para mostrar nuestro carrito de compras
function mostrarCarrito (){
    let carritoCompra = ""; // Aca va el HTML al agregarse productos al carrito
    let precioTotal = 0; // Precio inicial al iniciar la compra

    // Se recorre cada producto agregado al carrito para asignarle código HTML
    carrito.forEach((producto,indice) =>{
        carritoCompra +=`
            <div class="item-carrito">
                <h4>${producto.name} - $${producto.price} </h4>
                <button class="delete-btn" id="eliminar-producto" onclick="eliminar(${indice})">Eliminar</button>
            </div>
            `;
        precioTotal += Number(producto.price); // Sumamos el precio de cada producto agregado al carrito al precio total del cliente.
    
    });

    //Imprimir HTML de los productos en pantalla
    objetosCarrito.innerHTML = carritoCompra;

    //Mostrar precio total
    totalCarrito.innerHTML = `${precioTotal}`

    // Cuando no hay productos en el carrito no se muestran los botones de "Vaciar carrito" y de "Imprimir Ticket"
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

        // Se muestra esto en pantalla en caso de que no haya ningun producto agregado al carrito.
        objetosCarrito.innerHTML = '<p class="info-carrito">No hay productos en el carrito .</p>';
    }
};

// Funcionalidad para agregar un producto al carrito
function agregarCarrito(id){
    console.log(`id del producto: ${id}`);
    const productoSeleccionado = productos.find(producto => producto.id == id);
    if (!productoSeleccionado) {
        console.error("No se encontró el producto con id:", id);
        return;
    }
    carrito.push(productoSeleccionado); // Con push se agrerga un producto al array carrito

    mostrarCarrito();
}

// Funcionalidad para eliminar un producto del carrito
function eliminar(indice) {
    carrito.splice(indice, 1);
    mostrarCarrito();
}

// Función para vaciar el carrito de productos
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}

const nombreGuardado = sessionStorage.getItem("nombreUsuario"); // Se busca en sessionStorage el nombre ingresado en el formulario de bienvenida del cliente
const cliente = document.getElementById("nombre-cliente"); // Seleccionamos el elemento HTML donde debe figurar el nombre del cliente

if (cliente && nombreGuardado) {
    cliente.textContent = nombreGuardado; // Permite cambiar el contenido de "Invitado" al nombre verdadero del cliente en la página principal
}

// Funcionalidades para registrar la venta e imprimir el ticket

const boton_imprimir = document.querySelector("#btn-imprimir");

boton_imprimir.addEventListener("click",imprimirTicket);

const fecha = new Date();

const fechaFormato = fecha.toISOString().slice(0, 19).replace("T"," "); // Esta fecha ya está estandarizada para que la acepte mysql

function imprimirTicket(){

    let precioTotal = 0;

    console.table(carrito);

    const idProductos = [];

    const {jsPDF} = window.jspdf;

    const doc = new jsPDF();
    let  x = 15;
    let y = 55;
    let z = 180;
    doc.text("Ticket de compra",80,10);
    doc.text(`Cliente: ${nombreGuardado}`,x,25);
    doc.text(`Fecha : ${fechaFormato}`,x,35);
    doc.text("Detalle de la compra: ",x, 45)
    carrito.forEach(producto => {
        idProductos.push(producto.id);
        doc.text(`-${producto.name}`,x,y);
        doc.text(`$${producto.price}`,z,y);
        y+= 15;
        precioTotal += Number(producto.price); // Sumamos el precio de cada producto agregado al carrito al precio total del cliente.
    });
        doc.text("-------------------------------------------------",x,y)
        doc.text(`Precio total: $${precioTotal}`,135,y+20);
        doc.save("ticket.pdf");
}

/*
// Ininicializamos en cero el total de la compra
let totalVenta = 0;

// Inicializamos un array vacio donde acumularemos los id's (no repetidos) de los productos en el carrito
let listaIdProductosEnCarrito= [];

// Recorremos el carrito y vamos asignandole el precio de cada producto agregado por el cliente
carrito.forEach(producto => {
    totalVenta += Number(producto.price);
    listaIdProductosEnCarrito.push(producto.id); 
})


// Filtramos de id's repetidos el array listaIdProductosCarrito para que no haya problemas al hacer una inserción en la BBDD en la tabla product_sales
listaIdProductosEnCarrito = [...new Set(listaIdProductosEnCarrito)];
*/

// Función para registrar una venta
async function registrarVenta(total, idProductos, fechaVenta, userName) {
    const data = {
        date: fechaVenta, // Esta fecha debe ya estar formateada para mysql
        total_price: total, // Monto total que se ve en el ticket
        user_name: userName, // Nombre del usario guardado en sessionStorage
        products: idProductos // Array de id's de los productos del carrito sin repetir
    }

    // Ahora hacemos la petición HTTP para registrar la venta.
    const response = await fetch ("http://localhost:3000/api/sales", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if(response.ok){
        console.log(response);
        alert(result.message);
        // Reiniciamos la aplicación una vez registrada la compra
        sessionStorage.removeItem("nombreUsuario");
        window.location.href ="login.html";
    } else {
        alert(result.message);
    }

    
}

// Función para preparar los datos de la venta
function confirmarVenta() {

    let totalVenta = 0;
    let listaIdProductosEnCarrito = [];

    // Recorremos el carrito para calcular el total y obtener los IDs
    carrito.forEach(producto => {
        totalVenta += Number(producto.price);
        listaIdProductosEnCarrito.push(producto.id);
    });

    // Eliminamos los IDs repetidos
    listaIdProductosEnCarrito = [...new Set(listaIdProductosEnCarrito)];

    console.log("Total de la venta:", totalVenta);
    console.log("Productos seleccionados:", listaIdProductosEnCarrito);

    // Enviamos los datos al Backend
    registrarVenta(totalVenta, listaIdProductosEnCarrito, fechaFormato, nombreGuardado);
}

boton_imprimir.addEventListener("click", confirmarVenta);