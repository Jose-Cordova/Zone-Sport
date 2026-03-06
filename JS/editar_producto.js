document.addEventListener("DOMContentLoaded" , function(){

    const btnGuardarCambios = document.getElementById("btn_guardar_cambios");
    const btnCancelar = document.getElementById("btn_cancelar");

    btnGuardarCambios.addEventListener("click", function(e){
        e.preventDefault();

        const nombre = document.getElementById('input_nombre').value.trim();
        const descripcion = document.getElementById('input_descripcion').value.trim();
        const marca = document.getElementById('select_marca').value;
        const categoria = document.getElementById('select_categoria').value;
        const precio = document.getElementById('input_precio').value.trim();
        const stock = document.getElementById('input_stock').value.trim();
        const estado = document.getElementById('select-estado').value;

        const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9\s]+$/;

        /*valido que no haigan campos vacios*/
        if(nombre ===""  || descripcion === ""  || marca === "" || categoria === "" || precio === "" || stock === "" || estado === ""){
            alert("Todos los campos se deben de completar");
            return;
        }

        /*valido el nombre no lleve caraceteres especiales*/
        if(!regexNombre.test(nombre)){
            alert("el nombre no debe de tener caracteres especiales");
            return;
        }

        /*valido el campo del precio*/
        if(parseFloat(precio) <= 0){
            alert("El valor del precio tiene que se mayor a 0");
            return;
        }

          /*valido el campo  del stock*/
        if(parseFloat(stock) < 0 ){
            alert("La cantidad del stock no debe de estar en 0");
            return;
        }

        alert("El producto fue editado con éxito");
        window.location.href = "gestion_productos.html";
    });

    btnCancelar.addEventListener("click", function(){
        window.location.href = "gestion_productos.html"
    })
});