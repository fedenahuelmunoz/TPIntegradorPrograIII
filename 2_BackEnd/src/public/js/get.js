const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProductForm");

function mostrarError(mensaje){
    //Tarea: darle formato al parrafo que indica el error
    contenedorProductos.innerHTML = `
        <p class="mensaje error">${mensaje}</p>
    `;
}

// Al hacer click en Consultar, hacemos un callback asincrono para pegarle a http://localhost:3000/api/products/x
getProductForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitamos el envio por defecto del formulario

    // console.log(event.target);

    // Extraemos el valor del campo con id idProd
    const idProd = event.target.idProd.value.trim();
    console.log(idProd); // Vemos por consola el valor de id extraido del <form> para parsarselo a la url en el fetch

    if (!idProd){
        return mostrarError("Ingresa un id válido");
    }

    try {
        const response = await fetch(`${urlBase}/api/products/${idProd}`);
        console.log(response);

        // Accemos al JSON dentro del cuerpo de la respuesta y lo convertimos a objeto JS
        const data = await response.json();
        

        // Procesamos respuestas 400 o 500
        if(!response.ok){
            console.error(data.message);
            return mostrarError(data.message);
        }

        const producto = data.payload[0]; // Traigo el primer objeto de mi array (de 1 solo objeto)

        renderizarProducto(producto);

    } catch (error) {
        // Estos errores son errores REALES de red, no capturan 404, 500, etc
        console.error("Error al obtener productos: ", error);
        return mostrarError("Error de conexión con el servidor");
    }
});

function renderizarProducto(producto) {
    // Le asiganmos la etiqueta de "activo" o "inactivo" al producto de acuerdo al número que tenga en el campo active.
    let estado = "inactivo";
    if (Number(producto.active) === 1){
        estado = "activo";
    }

    let htmlProducto = `
        <div class="card-producto">
            <img src="${producto.image}" alt="${producto.name}" class="card-img">
            <div class="card-text">
                <h4>Id: ${producto.id} </h4>
                <h4>Nombre: ${producto.name}</h4>
                <h4>Precio: $${producto.price}</h4>
                <h4>Estado: ${estado}</h4> 
            </div>    
        </div>
    `;
    contenedorProductos.innerHTML = htmlProducto;
}
