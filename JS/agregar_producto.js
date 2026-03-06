document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById('form_agregar_producto');
    const btnCancelar = document.getElementById("btn_cancelar");



    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('input_nombre').value.trim();
        const descripcion = document.getElementById('input_descripcion').value.trim();
        const marca = document.getElementById('select_marca').value;
        const categoria = document.getElementById('select_categoria').value;
        const precio = document.getElementById('input_precio').value.trim();
        const stock = document.getElementById('input_stock').value.trim();
        const estado = document.getElementById('select_estado').value;

        const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9\s]{3,100}$/;

        if (nombre === "" || descripcion === "" || marca === "" || categoria === "" || precio === "" || stock === "" || estado === "") {
            alert("Todos los campos se deben de llenar");
            return;
        }

        if (!regexNombre.test(nombre)) {
            alert("El nombre no debe tener caracteres especiales");
            return;
        }

        if (descripcion.length < 10) {
            alert("La descripción debe tener al menos 10 caracteres");
            return;
        }

        const precioNum = parseFloat(precio);
        if (isNaN(precioNum) || precioNum <= 0) {
            alert("El precio debe ser un número mayor a 0");
            return;
        }

        const stockNum = parseFloat(stock);
        if (isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
            alert("El stock debe ser un número entero no negativo");
            return;
        }
        const imagen = document.getElementById('input_imagen').files[0];
        if (!imagen) {
            alert("Debes seleccionar una imagen para el producto");
            return;
        }
        alert("El producto fue creado con éxito");

        window.location.href = "gestion_productos.html";
    });

    btnCancelar.addEventListener("click", function () {
        window.location.href = "gestion_productos.html";
    });

});