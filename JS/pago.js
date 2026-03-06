//Datos del cliente
const datosCliente = {
    nombre: "Mario Alejandro Ramírez Córdova",
    telefono: "+50360453775",
    direccion: "Colonia Escalón, Calle El Mirador, Casa #123, San Salvador"
};

document.addEventListener('DOMContentLoaded', () => {
    //Funcion para imprimir los datos en el modal
    const imprimirDatos = () => {
        document.getElementById('input_modal_nombre').value = datosCliente.nombre;
        document.getElementById('input_modal_direccion').value = datosCliente.direccion;
        document.getElementById('input_modal_telefono').value = datosCliente.telefono;
    }
    imprimirDatos();
    //Funcion que valida los campos si estan correctos
    const validarCampo = (expresion, input, campo) => {
        const grupo = document.getElementById(`grupo__${campo}`);
        if (expresion.test(input.value)) {
            grupo.classList.remove('grupo-incorrecto');
            camposPago[campo] = true; // El campo está bien
        } else {
            grupo.classList.add('grupo-incorrecto');
            camposPago[campo] = false; // El campo está mal
        }
    };
    //Campos de pago
    const camposPago = {
        tarjeta: false,
        mes: false,
        anio: false,
        cvv: false
    };

    //Expresiones regulares para validar
    const expresiones = {
        tarjeta: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
        mes: /^(0[1-9]|1[0-2])$/,          
        anio: /^(2[4-9]|[3-9]\d)$/, 
        cvv: /^\d{3}$/      
    };
    //Seleccionamos todos los campos de entrada específicos de la tarjeta
    document.querySelectorAll('#grupo__tarjeta input, #grupo__cvv input, #grupo__mes input, #grupo__anio input').forEach((input) => {
        // Se dispara cada vez que el usuario escribe
        input.addEventListener('keyup', (e) => {
            const nombreCampo = e.target.name;
            //Logica para el fromato de la tarjeta
            if (nombreCampo === "tarjeta") {
                let valor = e.target.value.replace(/\D/g, '');
                e.target.value = valor.match(/.{1,4}/g)?.join('-') || valor;
                validarCampo(expresiones.tarjeta, e.target, 'tarjeta');
            } else {
                validarCampo(expresiones[nombreCampo], e.target, nombreCampo);
            }
        });
    });
    //Capturamos los elementos de la interfaz para mostrar mensajes
    const btnPagar = document.getElementById('btn_pagar');
    const mensajeContenedor = document.getElementById('pago__mensaje');
    const mensajeTexto = document.getElementById('pago__mensaje-texto');

    btnPagar.addEventListener('click', (e) => {
        e.preventDefault();
        //Verificamos que todos los campos de pago esten correctos
        if (camposPago.tarjeta && camposPago.mes && camposPago.anio && camposPago.cvv) {
            mensajeTexto.innerText = "¡Pago procesado con éxito! Gracias por tu compra.";
            mensajeContenedor.classList.add('pago__mensaje-exito');
            mensajeContenedor.classList.add('pago__mensaje-activo');
            
            setTimeout(() => {
                mensajeContenedor.classList.remove('pago__mensaje-activo');
            }, 5000);
        } else {
            mensajeTexto.innerText = "Error: Por favor, revisa que los campos esten correctos.";
            mensajeContenedor.classList.remove('pago__mensaje-exito'); 
            mensajeContenedor.classList.add('pago__mensaje-activo');

            setTimeout(() => {
                mensajeContenedor.classList.remove('pago__mensaje-activo');
            }, 4000);
        }
    });
});