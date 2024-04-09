//PROCESO DE TERMINACION DE LA COMPRA
(function init(){
    recuperarLocalStorage();
    console.log("Recuperado en End Shopping");
    console.log("All products: " , allProducts);
    //const ProductosCarrito = document.querySelector('.container-products');
    const filaProductos = document.querySelector('.fila-productos');
    //const Productos = document.querySelector('.productos');
    const totalValor = document.querySelector('.total')
    
    //Recuperamos los productos
    let lista_productos = [];
    lista_productos = JSON.parse(localStorage.getItem("cartProducts"));
    
    const showProductos = () => {
        
        //Limpiar el HTML
        filaProductos.innerHTML = ' ';
        
        let total = 0; 

        if (lista_productos.length != 0) {
            lista_productos.forEach(product => {
                const productContainer = document.createElement('div');
                productContainer.classList.add('productos');
                productContainer.innerHTML= 
                `
                    <div class="info-productos">
                        <span class="cantidad-producto-carrito"> ${product.quantity} </span>
                        <p class="titulo-producto-carrito">${product.title}</p>
                        <span class="precio-producto-carrito">${product.price}</span>
                    </div>
                `
                filaProductos.append(productContainer);
                total += product.quantity * parseFloat(product.price.slice(2).trim());
            });
    
            const solSymbol = 'S/ ';
            totalValor.innerText = `${solSymbol}${total}`;
        }

        else {
            console.log ("Lista de productos vacia");
        }
        
    }
    showProductos()

    const phoneNumber = '+51912477927';

    function construirMensaje() {
        let mensaje = "Hola, quisiera hacer este pedido:\n";

        allProducts.forEach((producto, index) => {
            mensaje += `${index + 1}. ${producto.quantity} x ${producto.title}\n`;
        });
        
        mensaje += `${solSymbol}${total}`;

        return encodeURIComponent(mensaje);
    }

    const btnWhatsApp = document.querySelector('.wsp-link');
    btnWhatsApp.addEventListener('click', function(event) {
        event.preventDefault();
        enviarPedidoPorWhatsApp();
    });

    function enviarPedidoPorWhatsApp() {
        const mensaje = construirMensaje();
        const url = `https://wa.me/${phoneNumber}?text=${mensaje}`;

        setTimeout(function() {
            window.open(url, '_blank');
        }, 1000);
    }

})()