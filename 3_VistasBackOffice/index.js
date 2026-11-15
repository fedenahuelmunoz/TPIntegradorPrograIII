const urlBase = "http://localhost:3000";
        const contenedorProductos = document.getElementById("contenedor-productos");

        async function obtenerProductos() {
            try{
                const response = await fetch(`${urlBase}/api/products`);
                console.log(response);

                const data = await response.json();
                const products = data.payload;

                renderizarProductos(products);
            }catch(error){
                console.error("Error al obtener los productos", error);
            }
        }
        function renderizarProductos(array){
            let htmlProductos = "";

            array.forEach(products  => {
                htmlProductos += `
                    <div class="card-producto">
                        <img class="card-img" src="${products.image}" alt="${products.name}">
                        <h4>${products.id}</h4>
                        <h4>${products.category}</h4>
                    </div>    
                `;    
            });
            contenedorProductos.innerHTML =htmlProductos;
        }
        obtenerProductos();