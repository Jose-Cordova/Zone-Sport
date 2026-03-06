$(function () {
     // Selecciona los campos del formulario por su ID
    const nombre = $("#nombre");
    const apellido = $("#apellido");
    const correo = $("#correo");
    const contrasena = $("#contrasena");
    const confirmar = $("#confirmar");
    const terminos = $("#terminos");
    // expresiones regulares
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexNombreApellido = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    // Función reutilizable para validar campos
    function validarCampo(campo, regex, mensaje) {
        // Si la condición es verdadera, significa que hay error
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
    // Valida mientras el usuario escribe en el campo
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
      // Evento que se ejecuta cuando se envía el formulario
    $("#registro-form").submit(function (e) {
        e.preventDefault();

        let valido = true;// Variable para verificar si todo es válido


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
        //verifica si no coinciden muestra error.
        if (confirmar.val().trim() !== contrasena.val()) {
            confirmar.addClass("is-invalid");
            confirmar.next(".invalid-feedback").text("Las contraseñas no coinciden.");
            valido = false;
        } else {
            confirmar.removeClass("is-invalid");
        }

        if (!terminos.is(":checked")) {       //actvio
            terminos.addClass("is-invalid");
            terminos.next(".invalid-feedback").text("Debe aceptar los términos.");
            valido = false;
        } else {
            terminos.removeClass("is-invalid");
        }
        // Si algún campo es inválido
        if (!valido) {
            alert("Por favor, complete todos los campos correctamente.");
            return; 
        }

         
        alert("Registro exitoso");
        // Limpia el formulario
        $("#registro-form")[0].reset();
    });
});