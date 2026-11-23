const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProductForm");

function mostrarMensaje(tipo, mensaje){
    //Tarea: darle formato al parrafo que indica el error
    contenedorProductos.innerHTML = `
        <p class="mensaje ${tipo}">${mensaje}</p>
    `;
}

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
    console.log(idProd); // Vemos por consola el valor de id extraido del <form> para parsarselo a la url en el fetch.
    
    if(!idProd){
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
            return mostrarMensaje("error", data.message);
        }

        const producto = data.payload[0]; // Traigo el primer objeto de mi array (de 1 solo objeto)

        renderizarProducto(producto);

    } catch (error) {
        // Estos errores son errores REALES de red, no capturan 404, 500, etc
        console.error("Error al obtener productos: ", error);
        return mostrarMensaje("error", "Error de conexión con el servidor");
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
                <button type="button" id="btn-eliminar">Eliminar producto</button> 
            </div>    
        </div>
    `;
    contenedorProductos.innerHTML = htmlProducto;

    // Seleccionamos el boton eliminar y le asignamos el evento click que haga que podamos hacer la peticion HTTP DELETE con fetch
    const btnEliminar = document.getElementById("btn-eliminar");
    btnEliminar.addEventListener("click", () => {

        const confirmacion = confirm("Queres eliminar este producto?");

        if (!confirmacion) {
            alert("Eliminacion cancelada");
        } else {
            eliminarProducto(producto.id);
        }

    }); 
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`${urlBase}/api/products/${id}`, {
            method: "DELETE"
        });

        console.log(response); // Respuesta cruda del servidor

        const data = await response.json(); // Ahora podemos acceder al valor de message

        if (!response.ok) {
            console.error(data.message);
            return mostrarMensaje("error", data.message);
        }

        console.log(data.message);
        return mostrarMensaje("exito", data.message);
        

    } catch (error) {
        console.error("Error al eliminar un producto: ", error);
        // return mostrarMensaje("error", "Error de conexión con el servidor") // Línea adicional para ver si hace falta feedback visual si se genera un error al eliminar un producto
    }
}