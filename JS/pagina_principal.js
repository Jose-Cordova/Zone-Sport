// ==========================================
// 1. Base de datos simulada (Ajustada a tus marcas)
// ==========================================
const productos = [
    {
        id: 1,
        nombre: 'MOCKUP CAMISETA DE FUTBOL VAQUERIA FC',
        descripcion: 'Mockup de camiseta oficial de fútbol del Vaquería FC, diseñado para representar la identidad y el carácter del equipo.',
        precio: 160.00,
        imagen: 'imagenes/imagenes_productos/camiseta.webp',
        categoria: 'ropa',
        marca: 'Adidas', // Ajustado a tu menú
        stock: 12
    },
    {
        id: 2,
        nombre: 'Balón de futbol AC Milán numero #5',
        descripcion: 'Balón oficial del AC Milán de Puma con colores icónicos y escudo.',
        precio: 80.00,
        imagen: 'imagenes/imagenes_productos/balon.webp',
        categoria: 'balones',
        marca: 'PUMA', // Ajustado a tu menú
        stock: 8
    },
    {
        id: 3,
        nombre: 'Zapatillas FASHION SPORT',
        descripcion: 'Zapatillas deportivas ligeras y transpirables, diseñadas para brindar máximo confort.',
        precio: 190.00,
        imagen: 'imagenes/imagenes_productos/zapatiilas.webp',
        categoria: 'zapatillas',
        marca: 'NIKE', // Ajustado a tu menú
        stock: 9
    },
    {
        id: 4,
        nombre: 'Balón Profesional Voleibol', // Cambié este para que tenga sentido con Mikasa
        descripcion: 'Balón de uso profesional diseñado para torneos de alto rendimiento.',
        precio: 60.00,
        imagen: 'imagenes/imagenes_productos/guantes.webp', // Usa tu imagen correcta aquí
        categoria: 'balones', // Lo pasé a balones
        marca: 'Mikasa', // Ajustado a tu menú
        stock: 20
    }
];

window.addEventListener('load', () => {
    
    // Cargamos los productos
    const contenedorProductos = document.getElementById('contenedor_productos');

    function cargarProductos(listaProductos) {
        contenedorProductos.innerHTML = '';
        
        listaProductos.forEach(producto => {
            const col = document.createElement('div');
            col.classList.add('col');

            col.innerHTML = `
                <div class="card h-100 card_producto"> 
                    <img src="${producto.imagen}" class="card-img-top p-2" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <small class="text-uppercase text-primary fw-bold">${producto.marca}</small>
                        <h6 class="card-title fw-bold titulo_producto mt-1">${producto.nombre}</h6>
                        <p class="card-text pequeño flex-grow-1">${producto.descripcion}</p>
                        
                        <p class="card-text pequeño mb-1">
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

    // Mostrar catálogo inicial
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

    //Filtrado por categoria
    const linkInicio = document.getElementById('link_inicio');
    const catBalones = document.getElementById('cat_balones');
    const catZapatillas = document.getElementById('cat_zapatillas');
    const catRopa = document.getElementById('cat_ropa');

    linkInicio?.addEventListener('click', (e) => {
        e.preventDefault();
        cargarProductos(productos);
    });

    function filtrarCategorias(categoria) {
        const filtrados = productos.filter(p => p.categoria === categoria);
        cargarProductos(filtrados);
    }

    catBalones?.addEventListener('click', (e) => { e.preventDefault(); filtrarCategorias('balones'); });
    catZapatillas?.addEventListener('click', (e) => { e.preventDefault(); filtrarCategorias('zapatillas'); });
    catRopa?.addEventListener('click', (e) => { e.preventDefault(); filtrarCategorias('ropa'); });

    // ==========================================
    // NUEVOS FILTROS DE MARCAS (De tu imagen)
    // ==========================================
    // Asegúrate de que los ID coincidan con los que tienes en tu HTML
    const marcaAdidas = document.getElementById('marca_adidas');
    const marcaNike = document.getElementById('marca_nike');
    const marcaPuma = document.getElementById('marca_puma');
    const marcaMikasa = document.getElementById('marca_mikasa');

    // Función que hace la magia de filtrar por marca
    function filtrarMarcas(marcaSeleccionada) {
        // Filtramos usando toLowerCase() para evitar errores si está escrito en mayúsculas/minúsculas
        const filtrados = productos.filter(p => p.marca.toLowerCase() === marcaSeleccionada.toLowerCase());
        cargarProductos(filtrados);
    }

    // Eventos de click para cada botón de marca
    marcaAdidas?.addEventListener('click', (e) => { e.preventDefault(); filtrarMarcas('Adidas'); });
    marcaNike?.addEventListener('click', (e) => { e.preventDefault(); filtrarMarcas('NIKE'); });
    marcaPuma?.addEventListener('click', (e) => { e.preventDefault(); filtrarMarcas('PUMA'); });
    marcaMikasa?.addEventListener('click', (e) => { e.preventDefault(); filtrarMarcas('Mikasa'); });

});