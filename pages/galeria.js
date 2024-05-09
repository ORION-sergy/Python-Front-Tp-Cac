document.addEventListener('DOMContentLoaded',function(){

    var check = document.querySelector(".check");

    //ABRE IMAGEN EN LIGHTBOX 
    function abrirLightbox(url) {
        lightboxImagen.src = url;
        lightbox.style.display = "block";
    }
    //ITERA CADA ELEMENTO .IMGGRID Y LE ASIGNA EVENTO CLICK PARA QUE EJECUTE FUNC ABRIRLIGHTBOX
    document.querySelectorAll('.imgGrid').forEach(item => {
        item.addEventListener('click', event => {
            const url = event.target.src; // RESCATA URL DE LA IMAGEN
            abrirLightbox(url);
        });
    });
    // EVENTO CERRAR LIGHTBOX PARA BOTON
    cerrarLightbox.addEventListener("click", function() {
        lightbox.style.display = "none";
    });
    //CERRAR LIGHTBOX CLICKEANDO AFUERA DE LA IMAGEN
    lightbox.addEventListener("click", function() {
        lightbox.style.display = "none";
    });
    // CERRAR LIGHTBOX CON TECLA "ESC"
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            lightbox.style.display = "none";
        }
    });
    /* CAMBIO DE IDIOMA */
    check.addEventListener('click',idioma);
    function idioma(){
        let id = check.checked;
        if(id == true){
            location.href = "../galeria.html";
        }else{
            location.href = "en/galeriaEn.html";
        }
    }
})