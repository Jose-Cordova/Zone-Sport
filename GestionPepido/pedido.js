//conecta el js con el html 
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
//expreciones regulares
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,150}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    direccion: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#'\-ºª/]{1,255}$/,
    telefono: /^\+[1-9]\d{1,14}$/ 
}

const campos = {
    fecha_pedido: false,
    nombre: false,
    correo: false,
    direccion: false,
    telefono: false
}
//funcion de tipo flecha que valida el formulario
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
        break;
        case "direccion":
            if(e.target.value === "") {
                limpiarEstilos('direccion');
                campos.direccion = true;
            } else {
                validarCampo(expresiones.direccion, e.target, 'direccion');
            }
        break;
        case "telefono":
            if(e.target.value === "") {
                limpiarEstilos('telefono');
                campos.telefono = true;
            } else {
                validarCampo(expresiones.telefono, e.target, 'telefono');
            }
        break;
        case "fecha_pedido":
            validarFecha(e.target);
        break;
    }
}
//valida con la constante con los inputs de el html y con los campos de los grupos
const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

// Validación de fecha
const validarFecha = (input) => {
    const grupoFecha = document.getElementById('grupo__fecha');
    if(input.value !== "") {
        grupoFecha.classList.remove('formulario__grupo-incorrecto');
        grupoFecha.classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo__fecha .formulario__input-error').classList.remove('formulario__input-error-activo');
        campos.fecha_pedido = true;
    } else {
        grupoFecha.classList.add('formulario__grupo-incorrecto');
        grupoFecha.classList.remove('formulario__grupo-correcto');
        document.querySelector('#grupo__fecha .formulario__input-error').classList.add('formulario__input-error-activo');
        campos.fecha_pedido = false;
    }
}
//limpia los campos cuando son modificados
const limpiarEstilos = (campo) => {
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto', 'formulario__grupo-correcto');
    const icono = document.querySelector(`#grupo__${campo} i`);
    if(icono) icono.classList.remove('fa-check-circle', 'fa-times-circle');
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
}

inputs.forEach((input) => {
    //valida cuando se labanta una tecla
    input.addEventListener('keyup', validarFormulario);
    //valida cuando se toca afuera del formulario
    input.addEventListener('blur', validarFormulario);
    //valida cuando el valor se modifica
    input.addEventListener('change', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if(campos.nombre && campos.correo && campos.direccion && campos.telefono && campos.fecha_pedido){
        //reset se encarga de limpiar el formulario
        formulario.reset();
        //elimina el mensage de alerta
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        // Redirección a la página de pago
        window.location.href = '../formularios/frm_pago.html'; 
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});