// ==========================================
// 1. Base de datos simulada
// ==========================================
const productos = [
    {
        id: 1,
        nombre: 'MOCKUP CAMISETA DE FUTBOL VAQUERIA FC',
        descripcion: 'Mockup de camiseta oficial de fútbol del Vaquería FC, diseñado para representar la identidad y el carácter del equipo.',
        precio: 160.00,
        imagen: 'imagenes/imagenes_productos/camiseta.webp',
        categoria: 'ropa',
        marca: 'ADIDAS',
        stock: 0
    },
    {
        id: 2,
        nombre: 'Balón de futbol AC Milán numero #5',
        descripcion: 'Balón oficial del AC Milán de Puma con colores icónicos y escudo.',
        precio: 80.00,
        imagen: 'imagenes/imagenes_productos/balon.webp',
        categoria: 'balones',
        marca: 'MIKASA',
        stock: 8
    },
    {
        id: 3,
        nombre: 'Zapatillas FASHION SPORT',
        descripcion: 'Zapatillas deportivas ligeras y transpirables, diseñadas para brindar máximo confort.',
        precio: 190.00,
        imagen: 'imagenes/imagenes_productos/zapatiilas.webp',
        categoria: 'zapatillas',
        marca: 'PUMA',
        stock: 9
    },
    {
        id: 4,
        nombre: 'Guantes "ATHPIK"',
        descripcion: 'Guantes de arquero diseñados para máxima protección y agarre superior en cada atajada.',
        precio: 60.00,
        imagen: 'imagenes/imagenes_productos/guantes.webp',
        categoria: 'accesorios',
        marca: 'MIKASA',
        stock: 20
    }
];

window.addEventListener('load', () => {
    // Cargamos los productos
    const contenedorProductos = document.getElementById('contenedor_productos');
    function cargarProductos(listaProductos) {
        // Vaciamos el contenedor por si acaso
        contenedorProductos.innerHTML = '';
        // Recorremos el arreglo de productos
        listaProductos.forEach(producto => {
            const col = document.createElement('div');
            col.classList.add('col');

            col.innerHTML = `
                <div class="card h-100 card_producto"> 
                    <img src="${producto.imagen}" class="card-img-top p-2" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        
                        <small class="fw-bold text-uppercase mb-1" style="color: #0887b2ff;">${producto.marca}</small>
                        
                        <h6 class="card-title fw-bold titulo_producto">${producto.nombre}</h6>
                        <p class="card-text pequeño flex-grow-1">${producto.descripcion}</p>
                        
                        <p class="card-text pequeño">
                            <small class="${producto.stock <= 5 ? 'text-danger fw-bold' : 'text-muted'}">
                                Stock disponible: ${producto.stock}
                            </small>
                        </p>
                        
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <span class="fw-bold fs-5">$${producto.precio.toFixed(2)}</span>
                            
                            <button class="btn btn-sm btn_carrito_producto btn-añadir-carrito" 
                                    data-id="${producto.id}"
                                    ${producto.stock === 0 ? 'disabled' : ''}>
                                <img src="imagenes/iconos/carrito_compras.png" width="20" height="20">
                                ${producto.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            contenedorProductos.appendChild(col);
        });
    }

    // Ejecutamos la función para mostrar por primera vez el catálogo
    cargarProductos(productos);

    // Barra de búsqueda
    const inputBuscar = document.getElementById('input_buscar');
    inputBuscar.addEventListener('input', (e) => {
        const texto = e.target.value.toLowerCase();
        const filtrar = productos.filter(p => 
            p.nombre.toLowerCase().includes(texto)
        );
        cargarProductos(filtrar);
    });

    // Filtrado por categoría
    const inicio = document.getElementById('link_inicio');
    const balones = document.getElementById('cat_balones');
    const zapatillas = document.getElementById('cat_zapatillas');
    const ropa = document.getElementById('cat_ropa');

    // Evento para inicio (muestra todos los productos)
    inicio.addEventListener('click', (e) => {
        e.preventDefault();
        cargarProductos(productos);
    });

    // Función para filtrar categorías
    function filtrarCategorias(categoria) {
        const filtrar = productos.filter(p => p.categoria === categoria);
        cargarProductos(filtrar);
    }

    // Eventos de botones de categoría
    balones?.addEventListener('click', (e) => { 
        e.preventDefault(); 
        filtrarCategorias('balones'); 
    });
    zapatillas?.addEventListener('click', (e) => {
        e.preventDefault(); 
        filtrarCategorias('zapatillas'); 
    });
    ropa?.addEventListener('click', (e) => { 
        e.preventDefault(); 
        filtrarCategorias('ropa'); 
    });

     // Filtrado por marcas
    const adidas = document.getElementById('marca_adida');
    const nike = document.getElementById('marca_nike');
    const puma = document.getElementById('marca_puma');
    const mikasa = document.getElementById('marca_mikasa');

    // Función para filtrar marcas
    function filtrarMarcas(marca) {
        const filtrar = productos.filter(p => p.marca === marca);
        cargarProductos(filtrar);
    }
    
    // Eventos de botones de marcas
    adidas?.addEventListener('click', (e) => { 
        e.preventDefault(); 
        filtrarMarcas('ADIDAS'); 
    });
    nike?.addEventListener('click', (e) => { 
        e.preventDefault(); 
        filtrarMarcas('NIKE'); 
    });
    puma?.addEventListener('click', (e) => { 
        e.preventDefault(); 
        filtrarMarcas('PUMA'); 
    });
    mikasa?.addEventListener('click', (e) => { 
        e.preventDefault(); 
        filtrarMarcas('MIKASA'); 
    });

    //Boton añadir al carrito
    // Escuchamos los clics dentro de todo el contenedor de productos
    contenedorProductos.addEventListener('click', (e) => {
        // Verificamos si el clic fue en el botón o en la imagen dentro del botón
        const botonCarrito = e.target.closest('.btn-añadir-carrito');
        // Si no hicimos clic en el botón, o si el botón está deshabilitado (sin stock), no hacemos nada
        if (!botonCarrito || botonCarrito.disabled) return;
        // Obtenemos el ID del producto desde el atributo data-id del botón
        const idProducto = parseInt(botonCarrito.getAttribute('data-id'));
        // Buscamos cuál fue el producto al que le dimos clic
        const productoSeleccionado = productos.find(p => p.id === idProducto);
        if (productoSeleccionado) {
            // Llamamos a la función que crea el mensaje
            agregarCarrito(productoSeleccionado.nombre);
        }
    });

    // Funcion mensajeCarrito llamativa
    function agregarCarrito(nombreProducto) {
        // Creamos un "div"
        const mensajeCarrito = document.createElement('div');
        
        // Le ponemos el mensaje
        mensajeCarrito.innerHTML = `<img src="imagenes/iconos/carrito_compras.png" width="20" height="20" style="margin-right: 8px;">Se agregó <strong>${nombreProducto}</strong> al carrito.`;
        Object.assign(mensajeCarrito.style, {
            position: 'fixed',
            bottom: '100px',          
            right: '20px',           
            backgroundColor: '#068b32ff',
            color: '#fff',        
            padding: '20px 25px',
            borderRadius: '10px',   
            boxShadow: '0 5px 15px rgba(17, 0, 255, 0.3)', 
            fontSize: '16px',
            zIndex: '9999',          
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            opacity: '0',            
            transform: 'translateY(20px)'
        });

        // Se muestra la el mensaje en la pagina
        document.body.appendChild(mensajeCarrito);

        // Animacion de entrada
        setTimeout(() => {
            mensajeCarrito.style.opacity = '1';
            mensajeCarrito.style.transform = 'translateY(0)';
        }, 10);

        // Se desaparece despues de 3 segundo
        setTimeout(() => {
            mensajeCarrito.style.opacity = '0';
            mensajeCarrito.style.transform = 'translateY(20px)';
            
            // Se borra despues de aver echo la animacion
            setTimeout(() => mensajeCarrito.remove(), 400); 
        }, 3000);
    }

    //Funcionalidad de campanita
    const notificaciones = document.getElementById('btn_notificacion'); 
    if (notificaciones) {
        notificaciones.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarmensajeCarritoCampana();
        });
    }

    //Funcion para mostrar las notificaciones de la campanita
    function mostrarmensajeCarritoCampana() {
        const mensajeNotificacion = document.createElement('div');
        // Mensaje por defecto
        mensajeNotificacion.innerHTML = `<img src="imagenes/iconos/notificacion.png" width="20" height="20" style="margin-right: 8px;"><strong>Sin novedades:</strong> No tienes notificaciones nuevas por el momento.`;
        Object.assign(mensajeNotificacion.style, {
            position: 'fixed',
            top: '70px',             
            right: '20px',           
            backgroundColor: '#957f0eff',
            color: '#fff',           
            padding: '15px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            fontSize: '15px',
            zIndex: '9999',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            opacity: '0',
            transform: 'translateY(-15px)'
        });

        document.body.appendChild(mensajeNotificacion);

        // Animación de entrada
        setTimeout(() => {
            mensajeNotificacion.style.opacity = '1';
            mensajeNotificacion.style.transform = 'translateY(0)';
        }, 10);

        // Desaparece después de 4 segundos
        setTimeout(() => {
            mensajeNotificacion.style.opacity = '0';
            mensajeNotificacion.style.transform = 'translateY(-15px)';
            
            setTimeout(() => mensajeNotificacion.remove(), 300); 
        }, 4000);
    }  
});