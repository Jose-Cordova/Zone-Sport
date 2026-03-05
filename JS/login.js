$(document).ready(function () {

    const correo = $("#correo");
    const contrasena = $("#contrasena");

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validarCampo(campo, condicion, mensaje) {
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

    // Validaciones en tiempo real
    correo.on("input", function () {
        if (correo.val().trim() === "") {
            validarCampo(correo, true, "Ingrese un correo electrónico.");
        } else {
            validarCampo(correo, !regexCorreo.test(correo.val().trim()), "Ingrese un correo válido (ejemplo: usuario@correo.com).");
        }
    });

    contrasena.on("input", function () {
        validarCampo(contrasena, contrasena.val().trim().length < 8, "La contraseña debe tener al menos 8 caracteres.");
    });

    // Envío del formulario
    $("#login-form").on("submit", function (e) {
        e.preventDefault();

        let valido = true;

        if (!validarCampo(correo, correo.val().trim() === "", "Ingrese un correo electrónico.")) valido = false;
        if (!valido || !validarCampo(correo, !regexCorreo.test(correo.val().trim()), "Ingrese un correo válido (ejemplo: usuario@correo.com).")) valido = false;

        if (!validarCampo(contrasena, contrasena.val().trim() === "", "Ingrese una contraseña.")) valido = false;
        if (!valido || !validarCampo(contrasena, contrasena.val().trim().length < 8, "La contraseña debe tener al menos 8 caracteres.")) valido = false;

        if (!valido) {
            alert("Por favor, complete todos los campos correctamente.");
            return; //  Detiene el envío
        }

        //  Todo válido
        alert("Inicio de sesión exitoso");
        $("#login-form")[0].reset();
    });

});