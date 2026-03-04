const email = document.getElementById("email");
const password = document.getElementById("password");
const formSubmit = document.querySelector(".btn-custom");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^.{6,}$/;

formSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    const errorElements = document.querySelectorAll(".error");
    errorElements.forEach(el => el.textContent = "");

    let isValid = true;

    if (!emailRegex.test(email.value)) {
        document.getElementById("email-error").textContent = "Ingrese un correo válido.";
        isValid = false;
    }

    if (!passwordRegex.test(password.value)) {
        document.getElementById("password-error").textContent = "La contraseña debe tener mínimo 6 caracteres.";
        isValid = false;
    }

    if (isValid) {
        alert("Inicio de sesión exitoso");
        const inputs = document.querySelectorAll(".form-control");
        inputs.forEach(input => input.value = "");
    }
});