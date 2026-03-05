$(function () {
    const nombre = $("#nombre");
    const apellido = $("#apellido");
    const correo = $("#correo");
    const contrasena = $("#contrasena");
    const confirmar = $("#confirmar");
    const terminos = $("#terminos");

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexNombreApellido = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    function validarCampo(campo, regex, mensaje) {
        if (!campo.val().trim() || !regex.test(campo.val().trim())) {
            campo.addClass("is-invalid");
            campo.next(".invalid-feedback").text(mensaje);
            return false;
        } else {
            campo.removeClass("is-invalid");
            campo.next(".invalid-feedback").text("");
            return true;
        }
    }

    nombre.on("input", function () {
        validarCampo(nombre, regexNombreApellido, "Ingrese un nombre válido (solo letras).");
    });

    apellido.on("input", function () {
        validarCampo(apellido, regexNombreApellido, "Ingrese un apellido válido (solo letras).");
    });

    correo.on("input", function () {
        validarCampo(correo, regexCorreo, "Ingrese un correo válido (ejemplo: usuario@correo.com).");
    });

    contrasena.on("input", function () {
        if (contrasena.val().trim().length < 8) {
            contrasena.addClass("is-invalid");
            contrasena.next(".invalid-feedback").text("La contraseña debe tener al menos 8 caracteres.");
        } else {
            contrasena.removeClass("is-invalid");
            contrasena.next(".invalid-feedback").text("");
        }
    });

    confirmar.on("input", function () {
        if (confirmar.val().trim() !== contrasena.val()) {
            confirmar.addClass("is-invalid");
            confirmar.next(".invalid-feedback").text("Las contraseñas no coinciden.");
        } else {
            confirmar.removeClass("is-invalid");
            confirmar.next(".invalid-feedback").text("");
        }
    });

    terminos.on("change", function () {
        if (!terminos.is(":checked")) {
            terminos.addClass("is-invalid");
            terminos.next(".invalid-feedback").text("Debe aceptar los términos.");
        } else {
            terminos.removeClass("is-invalid");
            terminos.next(".invalid-feedback").text("");
        }
    });

    $("#registro-form").submit(function (e) {
        e.preventDefault();

        let valido = true;

        // Validar cada campo y acumular resultado
        if (!validarCampo(nombre, regexNombreApellido, "Ingrese un nombre válido (solo letras).")) valido = false;
        if (!validarCampo(apellido, regexNombreApellido, "Ingrese un apellido válido (solo letras).")) valido = false;
        if (!validarCampo(correo, regexCorreo, "Ingrese un correo válido (ejemplo: usuario@correo.com).")) valido = false;

        if (contrasena.val().trim().length < 8) {
            contrasena.addClass("is-invalid");
            contrasena.next(".invalid-feedback").text("La contraseña debe tener al menos 8 caracteres.");
            valido = false;
        } else {
            contrasena.removeClass("is-invalid");
        }

        if (confirmar.val().trim() !== contrasena.val()) {
            confirmar.addClass("is-invalid");
            confirmar.next(".invalid-feedback").text("Las contraseñas no coinciden.");
            valido = false;
        } else {
            confirmar.removeClass("is-invalid");
        }

        if (!terminos.is(":checked")) {
            terminos.addClass("is-invalid");
            terminos.next(".invalid-feedback").text("Debe aceptar los términos.");
            valido = false;
        } else {
            terminos.removeClass("is-invalid");
        }

        if (!valido) {
            alert("Por favor, complete todos los campos correctamente.");
            return; 
        }

        
        alert("Registro exitoso");
        $("#registro-form")[0].reset();
    });
});