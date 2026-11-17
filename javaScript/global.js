
/* ==========================================================
   IGREJA BATISTA BETEL
   GLOBAL.JS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* ======================================================
       01. HEADER
    ====================================================== */

    const header = document.querySelector("#header");

    function atualizarHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }

    atualizarHeader();

    window.addEventListener(
        "scroll",
        atualizarHeader,
        { passive: true }
    );


    /* ======================================================
       02. MENU MOBILE
    ====================================================== */

    const menuToggle = document.querySelector("#menu-toggle");
    const menu = document.querySelector("#menu-principal");

    if (menuToggle && menu) {

        let menuAberto = false;

        function atualizarMenu(aberto) {

            menuAberto = aberto;

            menu.classList.toggle("abrir", aberto);

            // Controla a animação hambúrguer -> X
            menuToggle.classList.toggle("ativo", aberto);

            document.body.classList.toggle(
                "menu-open",
                aberto
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(aberto)
            );

            menuToggle.setAttribute(
                "aria-label",
                aberto ? "Fechar menu" : "Abrir menu"
            );

        }

        function abrirMenu() {
            atualizarMenu(true);
        }

        function fecharMenu() {

            if (!menuAberto) return;

            atualizarMenu(false);

        }

        menuToggle.addEventListener("click", evento => {

            evento.preventDefault();
            evento.stopPropagation();

            if (menuAberto) {
                fecharMenu();
            } else {
                abrirMenu();
            }

        });


        // Fecha ao clicar em um link

        menu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                fecharMenu();
            });

        });


        // Fecha ao clicar fora do menu

        document.addEventListener("click", evento => {

            if (!menuAberto) return;

            const clicouNoMenu = menu.contains(evento.target);

            const clicouNoBotao = menuToggle.contains(
                evento.target
            );

            if (!clicouNoMenu && !clicouNoBotao) {
                fecharMenu();
            }

        });


        // Fecha com a tecla Escape

        document.addEventListener("keydown", evento => {

            if (evento.key !== "Escape" || !menuAberto) {
                return;
            }

            fecharMenu();
            menuToggle.focus();

        });


        // Fecha ao retornar para desktop

        window.addEventListener("resize", () => {

            if (window.innerWidth > 840) {
                fecharMenu();
            }

        });

    }


    /* ======================================================
       03. MODAL DE AVISOS
    ====================================================== */

    const btnAvisos = document.querySelector("#btn-avisos");

    const modal = document.querySelector("#modal-avisos");

    const btnFechar = document.querySelector(
        "#btn-fechar-modal"
    );

    const btnEntendi = document.querySelector("#btn-entendi");

    if (btnAvisos && modal) {

        let focoAnterior = null;

        modal.classList.remove("ativo");

        modal.setAttribute("aria-hidden", "true");

        modal.inert = true;


        function abrirModal() {

            focoAnterior = document.activeElement;

            modal.inert = false;

            modal.classList.add("ativo");

            modal.setAttribute("aria-hidden", "false");

            btnAvisos.setAttribute(
                "aria-expanded",
                "true"
            );

            document.body.classList.add("modal-open");

            const primeiroFoco = btnFechar || modal;

            primeiroFoco.focus();

        }


        function fecharModal() {

            const destinoFoco = focoAnterior || btnAvisos;

            if (typeof destinoFoco.focus === "function") {
                destinoFoco.focus();
            }

            modal.classList.remove("ativo");

            modal.setAttribute("aria-hidden", "true");

            modal.inert = true;

            btnAvisos.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove("modal-open");

        }


        btnAvisos.addEventListener("click", abrirModal);

        btnFechar?.addEventListener("click", fecharModal);

        btnEntendi?.addEventListener("click", fecharModal);


        // Fecha clicando fora do conteúdo

        modal.addEventListener("click", evento => {

            if (evento.target === modal) {
                fecharModal();
            }

        });


        // Acessibilidade do modal

        document.addEventListener("keydown", evento => {

            if (!modal.classList.contains("ativo")) {
                return;
            }

            if (evento.key === "Escape") {

                fecharModal();
                return;

            }

            if (evento.key !== "Tab") return;

            const elementos = Array.from(
                modal.querySelectorAll(
                    'a[href], button:not([disabled]), ' +
                    'input:not([disabled]), ' +
                    '[tabindex]:not([tabindex="-1"])'
                )
            ).filter(elemento => {
                return elemento.getClientRects().length > 0;
            });

            if (!elementos.length) {

                evento.preventDefault();
                modal.focus();
                return;

            }

            const primeiro = elementos[0];
            const ultimo = elementos[elementos.length - 1];

            if (
                evento.shiftKey &&
                document.activeElement === primeiro
            ) {

                evento.preventDefault();
                ultimo.focus();

            } else if (
                !evento.shiftKey &&
                document.activeElement === ultimo
            ) {

                evento.preventDefault();
                primeiro.focus();

            }

        });

    }


    /* ======================================================
       04. ANO AUTOMÁTICO DO RODAPÉ
    ====================================================== */

    const anoAtual = document.querySelector("#ano-atual");

    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }


    /* ======================================================
       05. CARROSSEL — NOSSOS PASTORES
    ====================================================== */

    const pastoresSwiper = document.querySelector(
        ".pastores-swiper"
    );

    if (
        pastoresSwiper &&
        typeof Swiper !== "undefined"
    ) {

        const secaoPastores = pastoresSwiper.closest(
            ".pastores-carrossel"
        );

        const contadorAtual = secaoPastores?.querySelector(
            ".pastores-atual"
        );

        const contadorTotal = secaoPastores?.querySelector(
            ".pastores-total"
        );

        const barraProgresso = secaoPastores?.querySelector(
            ".pastores-progresso-barra"
        );

        const totalSlides = pastoresSwiper.querySelectorAll(
            ".swiper-slide"
        ).length;


        // Formata 1 como 01, 2 como 02...

        function formatarNumero(numero) {
            return String(numero).padStart(2, "0");
        }


        // Atualiza o contador e a barra

        function atualizarProgresso(swiper) {

            if (!totalSlides) return;

            const indiceAtual = Math.min(
                swiper.activeIndex,
                totalSlides - 1
            );

            const atual = indiceAtual + 1;

            if (contadorAtual) {

                contadorAtual.textContent =
                    formatarNumero(atual);

            }

            if (contadorTotal) {

                contadorTotal.textContent =
                    formatarNumero(totalSlides);

            }

            if (barraProgresso) {

                // Progresso real do deslocamento
                // 0 = início / 1 = final

                const progresso = Number.isFinite(
                    swiper.progress
                )
                    ? Math.max(
                        0,
                        Math.min(1, swiper.progress)
                    )
                    : 0;

                barraProgresso.style.transform =
                    `scaleX(${progresso})`;

            }

        }


        // Inicializa o carrossel

        try {

            new Swiper(pastoresSwiper, {

                slidesPerView: 1.15,

                spaceBetween: 16,

                speed: 650,

                // Não retorna ao primeiro slide
                loop: false,

                grabCursor: true,

                simulateTouch: true,

                watchOverflow: true,

                // Navegação pelas setas

                navigation: {

                    nextEl: secaoPastores?.querySelector(
                        ".pastores-next"
                    ),

                    prevEl: secaoPastores?.querySelector(
                        ".pastores-prev"
                    )

                },


                // Responsividade

                breakpoints: {

                    650: {

                        slidesPerView: 2,

                        spaceBetween: 22

                    },

                    1000: {

                        slidesPerView: 3,

                        spaceBetween: 28

                    }

                },


                // Eventos

                on: {

                    init(swiper) {

                        atualizarProgresso(swiper);

                    },

                    slideChange(swiper) {

                        atualizarProgresso(swiper);

                    },

                    progress(swiper) {

                        atualizarProgresso(swiper);

                    },

                    resize(swiper) {

                        atualizarProgresso(swiper);

                    }

                }

            });

        } catch (erro) {

            console.error(
                "Erro no carrossel dos pastores:",
                erro
            );

        }

    }


    /* ======================================================
       06. SCROLL REVEAL GLOBAL
    ====================================================== */

    const revealElements = document.querySelectorAll(
        ".scroll-reveal"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {

        document.documentElement.classList.add(
            "reveal-ready"
        );

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(elemento => {

            revealObserver.observe(elemento);

        });

    }


    /* ======================================================
       07. EFEITO POP-OUT
    ====================================================== */

    const elementosPopOut = document.querySelectorAll(
        ".pop-out"
    );

    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {

        const popOutObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visivel"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        elementosPopOut.forEach(elemento => {

            popOutObserver.observe(elemento);

        });

    } else {

        // Fallback para navegadores sem suporte
        // e usuários com movimento reduzido

        elementosPopOut.forEach(elemento => {

            elemento.classList.add("visivel");

        });

    }

});
