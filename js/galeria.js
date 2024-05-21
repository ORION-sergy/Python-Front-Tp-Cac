/* EVENTO ESPERA DE CARGA AL DEL DOM PARA INICIAR LOS SCRIPTS */
document.addEventListener("DOMContentLoaded",function(){
    /* RESCATA EN VARIABLES LOS ELEMENTOS A TRABAJAR */
    const images = document.querySelectorAll(".imgGrid");
    const lightbox = document.getElementById("lightbox");
    const lightboxImagen = document.getElementById("lightboxImagen");
    const arrLeft = document.querySelector(".arrow-left");
    const arrRight = document.querySelector(".arrow-right");
    const cerrarLightbox = document.getElementById("cerrarLightbox");
    /* INICIALIZO VARIABLE EN 0 PARA LUEGO INCREMENTAR O DISMINUIR SU VALOR */
    let imgIndex = 0;
    /* FUNCION ABRIR LIGHTBOX */
    function abrirLightbox(url) {
        lightboxImagen.src = url;
        lightbox.style.display = "block";
    }
    /* ITERA SOBRE LOS ELEMENTOS CON CLASE IMGGRID CREANDO FUNCIONES Y EVENTOS PARA CADA UNO DE ELLOS */
    images.forEach((item, index) => {
        item.addEventListener('click', event => {
            const url = event.target.src; // RESCATA EL SRC DE LA IMAGEN
            imgIndex = index;
            abrirLightbox(url);
        });
    });
    // EVENTO CERRAR LIGHTBOX PARA BOTON
    cerrarLightbox.addEventListener("click", function() {
        lightbox.style.display = "none";
    });
    // CERRAR LIGHTBOX CLICKEANDO AFUERA DE LA IMAGEN
    lightbox.addEventListener("click", function(event) {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
    // CERRAR LIGHTBOX CON TECLA "ESC"
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            lightbox.style.display = "none";
        }
    });
    // FUNCIONALIDAD DE LAS FLECHA IZQUIERDA
    arrLeft.addEventListener("click", function(event) {
        event.stopPropagation();
        imgIndex = (imgIndex > 0) ? imgIndex - 1 : images.length - 1;
        lightboxImagen.src = images[imgIndex].src;
    });
    // FUNCIONALIDAD DE LAS FLECHA DERECHA
    arrRight.addEventListener("click", function(event) {
        event.stopPropagation();
        imgIndex = (imgIndex < images.length - 1) ? imgIndex + 1 : 0;
        lightboxImagen.src = images[imgIndex].src;
    });

    /* --CAMBIO DE IDIOMA-- */

    /* RESCATO CHECKBOX EN VARIABLE CHECK */
    var check = document.querySelector(".check");
    /* A ESA VAR LE AGREGO EVENTO CLICK LLAMANDO A FUNCION IDIOMA */
    check.addEventListener('click',idioma);
    /* FUNCION CON CONDICIONAL CAMBIA DE POSICION SI CHECKBOX ESTA CHEKEADO = TRUE O NO = FALSE */
    function idioma(){
        let id = check.checked;
        if(id == true){
            location.href = "../galeria.html";
        }else{
            location.href = "en/galeriaEn.html";
        }
    }

    /* MENU */
    
    const body = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const menuContainer = document.querySelector('.menu-container');
    const links = document.querySelectorAll('.smooth-scroll');
    const blurOverlay = document.querySelector('.menu-container::before');

    menuToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active'); // Alternar la clase 'active' en el menú desplegable
        menuContainer.classList.toggle('active'); // Alternar la clase 'active' en el contenedor del menú
        body.classList.toggle('menu-open'); // Agregar/eliminar clase al body para deshabilitar/permitir el scroll
    
        // Agrega la animación a los ítems del menú cuando se activa el menú desplegable
        if (navbarMenu.classList.contains('active')) {
            const menuItems = document.querySelectorAll('#nav-links li');
            menuItems.forEach((item, index) => {
                item.style.animation = `fadeInUp 0.5s ease forwards ${index / 7 + 0.3}s`;
            });
            // Desactiva los eventos del mouse en el fondo borroso
            blurOverlay.style.pointerEvents = 'none';
        } else {
            // Si se cierra el menú, reinicia la animación y la opacidad de los ítems
            const menuItems = document.querySelectorAll('#nav-links li');
            menuItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
                item.style.animation = '';
            });
            // Restaura los eventos del mouse en el fondo borroso
            blurOverlay.style.pointerEvents = 'auto';
        }
    });

    // Cerrar el menú al hacer clic fuera de él
    window.addEventListener('click', function(event) {
        if (navbarMenu.classList.contains('active') && !menuContainer.contains(event.target)) {
            navbarMenu.classList.remove('active');
            menuContainer.classList.remove('active');
            body.classList.remove('menu-open');
            // Restaura los eventos del mouse en el fondo borroso
            blurOverlay.style.pointerEvents = 'auto';
        }
    });

    // Cambiar a las páginas correspondientes cuando se hace clic en los enlaces
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            const targetUrl = this.getAttribute('href');
            if (targetUrl.charAt(0) === '#') {
                // Close the menu before smooth scroll
                navbarMenu.classList.remove('active');
                menuContainer.classList.remove('active');
                body.classList.remove('menu-open');
                // Smooth scroll to target element
                const targetElement = document.querySelector(targetUrl);
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000; // Duración del desplazamiento en milisegundos
                    let start = null;

                    window.requestAnimationFrame(step);

                    function step(timestamp) {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
                        if (progress < duration) window.requestAnimationFrame(step);
                    }

                    // Easing function
                    function easeInOutCubic(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t * t + b;
                        t -= 2;
                        return c / 2 * (t * t * t + 2) + b;
                    }
                }
            } else {
                // Redirect to target URL
                window.location.href = targetUrl;
            }
        });
    });

})