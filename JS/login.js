// Espera a que toda la página cargue antes de ejecutar el código
$(document).ready(function () {

    // Selecciona los campos del formulario por su ID
    const correo = $("#correo");          
    const contrasena = $("#contrasena");  

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Función reutilizable para validar campos
    function validarCampo(campo, condicion, mensaje) {

        // Si la condición es verdadera, significa que hay error
        if (condicion) {
            campo.addClass("is-invalid"); 
            campo.next(".invalid-feedback").text(mensaje); 
            return false; 
        } else {
            campo.removeClass("is-invalid"); 
            campo.next(".invalid-feedback").text(""); 
            return true;
        }
    }

    // Validación en tiempo real del campo correo
    correo.on("input", function () {

        if (correo.val().trim() === "") {
            validarCampo(correo, true, "Ingrese un correo electrónico.");
        } else {
            // Verifica si el correo tiene formato válido
            validarCampo(correo, !regexCorreo.test(correo.val().trim()), "Ingrese un correo válido (ejemplo: usuario@correo.com).");
        }
    });

    contrasena.on("input", function () {

        validarCampo(contrasena, contrasena.val().trim().length < 8, "La contraseña debe tener al menos 8 caracteres.");
    });

    // Evento que se ejecuta cuando se envía el formulario
    $("#login-form").on("submit", function (e) {

        e.preventDefault(); 

        let valido = true; // Variable  verificar si todo es válido

        // Validación del correo vacío
        if (!validarCampo(correo, correo.val().trim() === "", "Ingrese un correo electrónico.")) valido = false;

        // Validación del formato del correo
        if (!valido || !validarCampo(correo, !regexCorreo.test(correo.val().trim()), "Ingrese un correo válido (ejemplo: usuario@correo.com).")) valido = false;

        if (!validarCampo(contrasena, contrasena.val().trim() === "", "Ingrese una contraseña.")) valido = false;

    
        if (!valido || !validarCampo(contrasena, contrasena.val().trim().length < 8, "La contraseña debe tener al menos 8 caracteres.")) valido = false;

        // Si algún campo es inválido
        if (!valido) {
            alert("Por favor, complete todos los campos correctamente.");
            return; 
        }

        // Si todo está correcto
        alert("Inicio de sesión exitoso");

        // Limpia el formulario
        $("#login-form")[0].reset();
    });

});