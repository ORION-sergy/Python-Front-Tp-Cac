document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const menuContainer = document.querySelector('.menu-container');
    const links = document.querySelectorAll('.smooth-scroll');

    menuToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active'); // Alternar la clase 'active' en el menú desplegable
        menuContainer.classList.toggle('active'); // Alternar la clase 'active' en el contenedor del menú
    
        // Agrega la animación a los ítems del menú cuando se activa el menú desplegable
        if (navbarMenu.classList.contains('active')) {
            const menuItems = document.querySelectorAll('#nav-links li');
            menuItems.forEach((item, index) => {
                item.style.animation = `fadeInUp 0.5s ease forwards ${index / 7 + 0.3}s`;
            });
        } else {
            // Si se cierra el menú, reinicia la animación y la opacidad de los ítems
            const menuItems = document.querySelectorAll('#nav-links li');
            menuItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
                item.style.animation = '';
            });
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

});
