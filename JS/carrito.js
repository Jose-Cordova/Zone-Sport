document.addEventListener("DOMContentLoaded", () => {

    const totalElemento = document.getElementById("total");
    const btnPagar = document.getElementById("btnPagar");

    function actualizarTotal() {
        let total = 0;

        document.querySelectorAll(".producto").forEach(producto => {
            const precio = Number(producto.dataset.precio);
            const cantidad = Number(producto.querySelector(".cantidad").textContent);
            total += precio * cantidad;
        });

        totalElemento.textContent = "$" + total.toFixed(2);

        
        if (total === 0) {
            btnPagar.classList.add("disabled");
            btnPagar.style.pointerEvents = "none";
            btnPagar.style.opacity = "0.6";
        } else {
            btnPagar.classList.remove("disabled");
            btnPagar.style.pointerEvents = "auto";
            btnPagar.style.opacity = "1";
        }
    }

    document.addEventListener("click", (e) => {

        if (e.target.classList.contains("mas") || e.target.classList.contains("menos")) {

            const producto = e.target.closest(".producto");
            const cantidadSpan = producto.querySelector(".cantidad");
            let cantidad = Number(cantidadSpan.textContent);

            if (e.target.classList.contains("mas")) {
                cantidad++;
            } else if (e.target.classList.contains("menos") && cantidad > 0) {
                cantidad--;
            }

            cantidadSpan.textContent = cantidad;
            actualizarTotal();
        }
    });

    actualizarTotal();
});