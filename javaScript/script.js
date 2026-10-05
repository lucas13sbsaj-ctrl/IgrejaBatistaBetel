// --- MENU MOBILE COM TRANSIÇÃO SUAVE E FECHAMENTO AO CLICAR FORA ---
const menuBotao = document.querySelector('.menu_abrir');
const navMobile = document.querySelector('.menu_mobile');

if (menuBotao && navMobile) {
    // Abrir/Fechar ao clicar no botão do menu
    menuBotao.onclick = function(e) {
        e.stopPropagation(); // Impede que o clique suba para o documento
        menuBotao.classList.add('trocando');

        setTimeout(() => {
            navMobile.classList.toggle('abrir');

            if (navMobile.classList.contains('abrir')) {
                menuBotao.src = 'assets/icones/fechar.svg';
            } else {
                menuBotao.src = 'assets/icones/menu_mobile.svg';
            }

            menuBotao.classList.remove('trocando');
        }, 150);
    };

    // Fecha o menu automaticamente ao clicar em qualquer link da lista
    const menuLinksMobile = document.querySelectorAll('.menu_mobile ul li a');
    menuLinksMobile.forEach(link => {
        link.addEventListener('click', function() {
            menuBotao.classList.add('trocando');
            
            setTimeout(() => {
                navMobile.classList.remove('abrir');
                menuBotao.src = 'assets/icones/menu_mobile.svg';
                menuBotao.classList.remove('trocando');
            }, 150);
        });
    });

    // FECHA O MENU AO CLICAR FORA DELA
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMobile.contains(event.target);
        const isClickOnButton = menuBotao.contains(event.target);

        // Se o menu estiver aberto e o clique foi fora do menu e fora do botão
        if (navMobile.classList.contains('abrir') && !isClickInsideMenu && !isClickOnButton) {
            menuBotao.classList.add('trocando');
            
            setTimeout(() => {
                navMobile.classList.remove('abrir');
                menuBotao.src = 'assets/icones/menu_mobile.svg';
                menuBotao.classList.remove('trocando');
            }, 150);
        }
    });
}


// --- CARROSSEL (CLIQUE NAS BOLINHAS) ---
const slider = document.querySelector('.slider');
if (slider) {
    const slides = slider.querySelectorAll('img');
    const navLinks = document.querySelectorAll('.slider-nav a');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let intervaloCarrossel = null;

    function atualizarBolinha(index) {
        navLinks.forEach((link, i) => {
            if (i === index) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    if (navLinks.length > 0) {
        atualizarBolinha(0);
    }

    function proximoSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        slides[currentIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        });
        atualizarBolinha(currentIndex);
    }

    function iniciarAutoplay() {
        if (!intervaloCarrossel) {
            intervaloCarrossel = setInterval(proximoSlide, 3000);
        }
    }

    function pausarAutoplay() {
        clearInterval(intervaloCarrossel);
        intervaloCarrossel = null;
    }

    const wrapper = document.querySelector('.slider-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', pausarAutoplay);
        wrapper.addEventListener('mouseleave', () => {
            const secaoPastor = document.querySelector('.section_pastor');
            if (secaoPastor && secaoPastor.classList.contains('visivel')) {
                iniciarAutoplay();
            }
        });
    }

    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = index;
            slides[currentIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
            atualizarBolinha(currentIndex);
        });
    });

    const secaoPastor = document.querySelector('.section_pastor');
    if (secaoPastor) {
        const observerSecao = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    secaoPastor.classList.add('visivel');
                    iniciarAutoplay();
                } else {
                    secaoPastor.classList.remove('visivel');
                    pausarAutoplay();
                }
            });
        }, { threshold: 0.3 });

        observerSecao.observe(secaoPastor);
    }

    const observerSlides = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(slides).indexOf(entry.target);
                if (index !== -1) {
                    currentIndex = index;
                    atualizarBolinha(currentIndex);
                }
            }
        });
    }, { root: slider, threshold: 0.5 });

    slides.forEach(slide => observerSlides.observe(slide));
}


// --- ANIMAÇÃO DA PROGRAMAÇÃO SEMANAL AO ROLAR A TELA ---
const secaoProgramacao = document.querySelector('.section_programacao');
if (secaoProgramacao) {
    const observerProgramacao = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                secaoProgramacao.classList.add('visivel');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observerProgramacao.observe(secaoProgramacao);
}


