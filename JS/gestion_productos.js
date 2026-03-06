document.addEventListener('DOMContentLoaded', function () {

/*la parte del sidebar seleccinamos los links */
const links = document.querySelectorAll("#sidebar .nav-link")
const sections = document.querySelectorAll(".section-content")

/**/ 

links.forEach(link =>{
    link.addEventListener('click', function(e){
        e.preventDefault();

        links.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        const sectionId  = this.dataset.section;

        sections.forEach(section => {
            section.classList.remove('active');
        });

        const sectionShow = document.getElementById(sectionId);
        if(sectionShow){
            sectionShow.classList.add('active')
        }
    });
});

/*ste es la parte del boton donde se agrega el 
nuevo produycto*/
const btnNuevoPoducto = document.getElementById('btn-nuevo-producto');

if(btnNuevoPoducto){
    btnNuevoPoducto.addEventListener('click', function (){
        window.location.href = "agregar_producto.html";
    });
}
});