const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorForm = document.getElementById("contenedor-form");
const getProductForm = document.getElementById("getProductForm");

// Optimización: validación previa de los datos en el cliente.
function validarFormulario(data) {
    const errores = [];

    if (!data.name || !data.price || !data.image || !data.category) {
        errores.push("Faltan campos requeridos");
    }

    // Validamos el campo name
    if (data.name.length < 2) {
        errores.push("El nombre del producto debe tener al menos dos caracteres");
    }

    // Validamos el campo price
    if (data.price <= 0) {
        errores.push("El precio debe ser un número entero mayor a cero");
    }

    return errores;
}

function mostrarMensaje(tipo, mensaje) {
    //Tarea: darle formato al parrafo que indica el error
    contenedorProductos.innerHTML = `
        <p class="mensaje ${tipo}">${mensaje}</p>
    `;
}

function mostrarListaErrores(array) {
    let htmlErrores = "";
    array.forEach(error => {
        htmlErrores += `<p class="mensaje error">${error}</p>`;
    });

    contenedorProductos.innerHTML = htmlErrores;
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
            </div>
            <button id="btn-modificar">Modificar</button>    
        </div>
    `;
    contenedorProductos.innerHTML = htmlProducto;

    const btnModificar = document.getElementById("btn-modificar");
    btnModificar.addEventListener("click", () => {

        const confirmacion = confirm("Querés modificar este producto?");

        if (!confirmacion) {
            alert("Modificacion cancelada");
        } else {
            renderizarFormularioPut(producto);
        }
    });
}

function renderizarFormularioPut(producto) {
    console.table(producto);
    
    let htmlForm = `
    <!-- Formulario PUT product -->
    <h3>Modificar producto</h3>
    
    <form id="modifyProductForm">
        
        <input type="hidden" name="id" id="idProd" value="${producto.id}">
        
        <label for="categoryProd">Categoria</label>
        <select name="category" id="categoryProd" required>
            <option value="notebook">Notebook</option>
            <option value="cellphone">Celular</option>
        </select>
            
        <label for="imageProd">Imagen</label>
        <input type="text" name="image" id="imageProd" value="${producto.image}" required>

        <label for="nameProd">Nombre</label>
        <input type="text" name="name" id="nameProd" value="${producto.name}" required>

        <label for="priceProd">Precio</label>
        <input type="number" name="price" id="priceProd" min="1" value="${producto.price}" required>

        <label for="activeProd">Estatus</label>
        <select name="active" id="activeProd" required>
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
        </select>

        <input type="submit" value="Modificar producto">

    </form>
    `;

    contenedorForm.innerHTML = htmlForm;

    const modifyProductForm = document.getElementById("modifyProductForm");

    modifyProductForm.addEventListener("submit", async event => {

        event.preventDefault(); // Evitamos el envio por defecto del <form>
        
        // Obtenemos la info del formulario en un objeto FormData
        const formData = new FormData(event.target);

        // Transformamos el objeto FormData en un objeto literal JS
        const formObj = Object.fromEntries(formData.entries());

        // Optimización: parseamos algunos valores del formObj
        formObj.price = Number(formObj.price); // Mandamos price como número
        formObj.name = formObj.name.trim(); // Al campo name le quitamos los espacios

        // Como los datos ahora están más limpios, los puedo pasar a la función validadora del cliente.
        const errores = validarFormulario(formObj);

        // Verificamos que no haya datos errroneos antes de enviar algo al servidor
        if (errores.length > 0) {
            console.error(errores);
            return mostrarListaErrores(errores);
        }

        try {
            const response = await fetch(`${urlBase}/api/products`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj)
            });

            const data = await response.json(); // El parseo es una operacion asincrona

            
            // Procesamos respuestas 400 o 500
            if(!response.ok){
                contenedorForm.innerHTML = "";
                console.error(data.message);
                return mostrarMensaje("error", data.message);
            }
            
            contenedorForm.innerHTML = "";
            
            console.log(data.message);
            mostrarMensaje("exito", data.message);



        } catch (error) {
            console.error("Ocurrio un error al modificar un producto: ", error);
        }
    });
}