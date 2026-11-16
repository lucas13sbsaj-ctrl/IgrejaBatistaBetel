
/* =========================================================
   IGREJA BATISTA BETEL
   HOME.JS — INTERAÇÕES DA PÁGINA INICIAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       01. CONFIGURAÇÕES GERAIS
    ===================================================== */

    const reduzirMovimento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const comportamentoRolagem = () =>
        reduzirMovimento.matches ? "instant" : "smooth";


    /* =====================================================
       02. HEADER — ALTERAÇÃO AO ROLAR
    ===================================================== */

    const header = document.querySelector("#header");

    function atualizarHeader() {
        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );
    }

    if (header) {
        atualizarHeader();

        window.addEventListener(
            "scroll",
            atualizarHeader,
            { passive: true }
        );
    }


    /* =====================================================
       03. MENU MOBILE
    ===================================================== */

    const menuToggle = document.querySelector("#menu-toggle");
    const menuPrincipal = document.querySelector("#menu-principal");
    const menuIcone = menuToggle?.querySelector("i");

    function menuEstaAberto() {
        return menuPrincipal?.classList.contains("abrir") ?? false;
    }

    function alterarMenu(abrir) {
        if (!menuToggle || !menuPrincipal) return;

        menuPrincipal.classList.toggle("abrir", abrir);

        header?.classList.toggle("menu-active", abrir);

        document.body.classList.toggle("menu-open", abrir);

        menuToggle.setAttribute(
            "aria-expanded",
            String(abrir)
        );

        menuToggle.setAttribute(
            "aria-label",
            abrir ? "Fechar menu" : "Abrir menu"
        );

        if (menuIcone) {
            menuIcone.classList.toggle("fa-bars", !abrir);
            menuIcone.classList.toggle("fa-xmark", abrir);
        }
    }

    menuToggle?.addEventListener("click", () => {
        alterarMenu(!menuEstaAberto());
    });

    // Fecha o menu ao clicar em um link.
    menuPrincipal?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            alterarMenu(false);
        });
    });

    // Fecha ao clicar fora do menu.
    document.addEventListener("click", evento => {
        if (!menuEstaAberto()) return;

        const clicouNoMenu = menuPrincipal?.contains(evento.target);
        const clicouNoBotao = menuToggle?.contains(evento.target);

        if (!clicouNoMenu && !clicouNoBotao) {
            alterarMenu(false);
        }
    });

    // Fecha quando a tela passa para o layout desktop.
    const mediaDesktop = window.matchMedia("(min-width: 841px)");

    function verificarLayoutDesktop(evento) {
        if (evento.matches) {
            alterarMenu(false);
        }
    }

    mediaDesktop.addEventListener(
        "change",
        verificarLayoutDesktop
    );


    /* =====================================================
       04. LINK ATIVO DO MENU
    ===================================================== */

    const linksMenu = [
        ...document.querySelectorAll(
            '#menu-principal a[href^="#"]'
        )
    ];

    const secoesMenu = linksMenu
        .map(link => {
            const id = link.getAttribute("href");

            if (!id || id === "#") return null;

            return document.querySelector(id);
        })
        .filter(Boolean);

    function atualizarLinkAtivo() {
        if (!secoesMenu.length) return;

        const posicaoReferencia =
            window.scrollY +
            (header?.offsetHeight ?? 0) +
            window.innerHeight * 0.3;

        let secaoAtual = secoesMenu[0];

        secoesMenu.forEach(secao => {
            if (secao.offsetTop <= posicaoReferencia) {
                secaoAtual = secao;
            }
        });

        linksMenu.forEach(link => {
            const ativo =
                link.getAttribute("href") ===
                `#${secaoAtual.id}`;

            link.classList.toggle("active", ativo);

            if (ativo) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    atualizarLinkAtivo();

    window.addEventListener(
        "scroll",
        atualizarLinkAtivo,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        atualizarLinkAtivo,
        { passive: true }
    );


    /* =====================================================
       05. CARROSSÉIS — FUNÇÃO REUTILIZÁVEL

       Funciona para:
       - Nossa História
       - Liderança Pastoral

       Basta utilizar data-carousel no HTML.
    ===================================================== */

    function iniciarCarrossel(carousel) {

        const track = carousel.querySelector(
            ".carousel-track"
        );

        const slides = [
            ...carousel.querySelectorAll(
                ".carousel-slide"
            )
        ];

        const dotsContainer = carousel.querySelector(
            ".carousel-dots"
        );

        const btnAnterior = carousel.querySelector(
            ".carousel-prev"
        );

        const btnProximo = carousel.querySelector(
            ".carousel-next"
        );

        if (!track || !slides.length) return;

        let indiceAtual = 0;
        let intervaloAutomatico = null;
        let temporizadorScroll = null;

        const quantidadeSlides = slides.length;

        const autoplay =
            carousel.dataset.autoplay === "true";

        const intervalo = Math.max(
            1000,
            Number(carousel.dataset.interval) || 5000
        );

        /* ---------------------------------------------
           CRIAR INDICADORES
        --------------------------------------------- */

        const indicadores = [];

        if (dotsContainer) {

            dotsContainer.innerHTML = "";

            slides.forEach((slide, indice) => {

                const indicador =
                    document.createElement("button");

                indicador.type = "button";
                indicador.className = "carousel-dot";

                indicador.setAttribute(
                    "aria-label",
                    `Ir para o slide ${indice + 1} de ${quantidadeSlides}`
                );

                indicador.setAttribute(
                    "aria-current",
                    String(indice === 0)
                );

                indicador.addEventListener("click", () => {
                    irParaSlide(indice);
                    reiniciarAutoplay();
                });

                dotsContainer.appendChild(indicador);
                indicadores.push(indicador);
            });
        }


        /* ---------------------------------------------
           ATUALIZAR INDICADORES
        --------------------------------------------- */

        function atualizarIndicadores() {

            indicadores.forEach((indicador, indice) => {
                indicador.setAttribute(
                    "aria-current",
                    String(indice === indiceAtual)
                );
            });
        }


        /* ---------------------------------------------
           IDENTIFICAR POSIÇÃO DO SLIDE
        --------------------------------------------- */

        function posicaoSlide(indice) {
            return slides[indice].offsetLeft -
                   slides[0].offsetLeft;
        }


        /* ---------------------------------------------
           NAVEGAR PARA UM SLIDE
        --------------------------------------------- */

        function irParaSlide(indice) {

            indiceAtual =
                (indice + quantidadeSlides) %
                quantidadeSlides;

            track.scrollTo({
                left: posicaoSlide(indiceAtual),
                behavior: comportamentoRolagem()
            });

            atualizarIndicadores();
        }


        /* ---------------------------------------------
           BOTÃO ANTERIOR
        --------------------------------------------- */

        btnAnterior?.addEventListener("click", () => {
            irParaSlide(indiceAtual - 1);
            reiniciarAutoplay();
        });


        /* ---------------------------------------------
           BOTÃO PRÓXIMO
        --------------------------------------------- */

        btnProximo?.addEventListener("click", () => {
            irParaSlide(indiceAtual + 1);
            reiniciarAutoplay();
        });


        /* ---------------------------------------------
           ATUALIZAR INDICADOR AO ARRASTAR
        --------------------------------------------- */

        function sincronizarIndiceComScroll() {

            const posicaoAtual = track.scrollLeft;

            let indiceMaisProximo = 0;
            let menorDistancia = Infinity;

            slides.forEach((slide, indice) => {

                const distancia = Math.abs(
                    posicaoAtual - posicaoSlide(indice)
                );

                if (distancia < menorDistancia) {
                    menorDistancia = distancia;
                    indiceMaisProximo = indice;
                }
            });

            indiceAtual = indiceMaisProximo;
            atualizarIndicadores();
        }

        track.addEventListener(
            "scroll",
            () => {

                clearTimeout(temporizadorScroll);

                temporizadorScroll = setTimeout(
                    sincronizarIndiceComScroll,
                    100
                );
            },
            { passive: true }
        );


        /* ---------------------------------------------
           AUTOPLAY
        --------------------------------------------- */

        function pararAutoplay() {

            if (intervaloAutomatico !== null) {
                clearInterval(intervaloAutomatico);
                intervaloAutomatico = null;
            }
        }

        function iniciarAutoplay() {

            if (
                !autoplay ||
                quantidadeSlides <= 1 ||
                reduzirMovimento.matches ||
                document.hidden
            ) {
                return;
            }

            pararAutoplay();

            intervaloAutomatico = setInterval(() => {
                irParaSlide(indiceAtual + 1);
            }, intervalo);
        }

        function reiniciarAutoplay() {
            pararAutoplay();
            iniciarAutoplay();
        }


        /* ---------------------------------------------
           PAUSAR DURANTE INTERAÇÃO
        --------------------------------------------- */

        carousel.addEventListener(
            "mouseenter",
            pararAutoplay
        );

        carousel.addEventListener(
            "mouseleave",
            iniciarAutoplay
        );

        carousel.addEventListener(
            "focusin",
            pararAutoplay
        );

        carousel.addEventListener(
            "focusout",
            evento => {

                if (!carousel.contains(evento.relatedTarget)) {
                    iniciarAutoplay();
                }
            }
        );

        // Pausa o autoplay quando a aba não está visível.
        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {
                    pararAutoplay();
                } else {
                    iniciarAutoplay();
                }
            }
        );

        // Respeita mudanças na preferência de movimento.
        reduzirMovimento.addEventListener(
            "change",
            () => {

                if (reduzirMovimento.matches) {
                    pararAutoplay();
                } else {
                    iniciarAutoplay();
                }
            }
        );


        /* ---------------------------------------------
           RESPONSIVIDADE
        --------------------------------------------- */

        let temporizadorResize;

        window.addEventListener("resize", () => {

            clearTimeout(temporizadorResize);

            temporizadorResize = setTimeout(() => {
                irParaSlide(indiceAtual);
            }, 150);

        }, { passive: true });


        /* ---------------------------------------------
           INICIALIZAÇÃO
        --------------------------------------------- */

        if (quantidadeSlides <= 1) {
            btnAnterior?.setAttribute("hidden", "");
            btnProximo?.setAttribute("hidden", "");
            dotsContainer?.setAttribute("hidden", "");
        }

        atualizarIndicadores();
        iniciarAutoplay();
    }


    /* =====================================================
       06. INICIALIZAR TODOS OS CARROSSÉIS
    ===================================================== */

    document.querySelectorAll(
        "[data-carousel]"
    ).forEach(iniciarCarrossel);


    /* =====================================================
       07. PROGRAMAÇÃO SEMANAL — NAVEGAÇÃO
    ===================================================== */

    const programas = document.querySelector(".programas");

    const btnProgramaAnterior = document.querySelector(
        ".scroll-left"
    );

    const btnProgramaProximo = document.querySelector(
        ".scroll-right"
    );

    if (programas) {

        function distanciaRolagem() {

            const card = programas.querySelector(".info_culto");

            if (!card) {
                return programas.clientWidth * 0.8;
            }

            const estilos = getComputedStyle(programas);

            const gap =
                parseFloat(estilos.columnGap) || 0;

            return card.getBoundingClientRect().width + gap;
        }

        function rolarProgramacao(direcao) {

            programas.scrollBy({
                left: distanciaRolagem() * direcao,
                behavior: comportamentoRolagem()
            });
        }

        btnProgramaAnterior?.addEventListener(
            "click",
            () => rolarProgramacao(-1)
        );

        btnProgramaProximo?.addEventListener(
            "click",
            () => rolarProgramacao(1)
        );


        /* ---------------------------------------------
           DESABILITAR SETAS NOS LIMITES
        --------------------------------------------- */

        function atualizarSetasProgramacao() {

            const limiteMaximo =
                programas.scrollWidth -
                programas.clientWidth;

            const posicaoAtual = programas.scrollLeft;

            if (btnProgramaAnterior) {
                btnProgramaAnterior.disabled =
                    posicaoAtual <= 2;
            }

            if (btnProgramaProximo) {
                btnProgramaProximo.disabled =
                    posicaoAtual >= limiteMaximo - 2;
            }
        }

        programas.addEventListener(
            "scroll",
            atualizarSetasProgramacao,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            atualizarSetasProgramacao,
            { passive: true }
        );

        atualizarSetasProgramacao();
    }


    /* =====================================================
       08. MODAL DE AVISOS
    ===================================================== */

    const btnAvisos = document.querySelector("#btn-avisos");

    const modalAvisos = document.querySelector("#modal-avisos");

    const btnFecharModal = document.querySelector(
        "#btn-fechar-modal"
    );

    const btnEntendi = document.querySelector("#btn-entendi");

    let elementoFocadoAnteriormente = null;


    /* ---------------------------------------------
       ABRIR MODAL
    --------------------------------------------- */

    function abrirModal() {

        if (!modalAvisos) return;

        // Fecha o menu mobile caso esteja aberto.
        alterarMenu(false);

        elementoFocadoAnteriormente = document.activeElement;

        modalAvisos.inert = false;

        modalAvisos.classList.add("active");

        modalAvisos.setAttribute(
            "aria-hidden",
            "false"
        );

        btnAvisos?.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("modal-open");

        btnFecharModal?.focus();
    }


    /* ---------------------------------------------
       FECHAR MODAL
    --------------------------------------------- */

    function fecharModal() {

        if (!modalAvisos) return;

        modalAvisos.classList.remove("active");

        modalAvisos.setAttribute(
            "aria-hidden",
            "true"
        );

        btnAvisos?.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("modal-open");

        // Impede interação com o modal fechado.
        modalAvisos.inert = true;

        elementoFocadoAnteriormente?.focus();
    }


    /* ---------------------------------------------
       EVENTOS DOS BOTÕES
    --------------------------------------------- */

    btnAvisos?.addEventListener(
        "click",
        abrirModal
    );

    btnFecharModal?.addEventListener(
        "click",
        fecharModal
    );

    btnEntendi?.addEventListener(
        "click",
        fecharModal
    );


    /* ---------------------------------------------
       FECHAR AO CLICAR FORA
    --------------------------------------------- */

    modalAvisos?.addEventListener("click", evento => {

        if (evento.target === modalAvisos) {
            fecharModal();
        }
    });


    /* ---------------------------------------------
       TECLA ESC E CONTROLE DE FOCO
    --------------------------------------------- */

    document.addEventListener("keydown", evento => {

        // Fecha o menu pelo ESC.
        if (
            evento.key === "Escape" &&
            menuEstaAberto()
        ) {
            alterarMenu(false);
            menuToggle?.focus();
        }

        if (
            !modalAvisos?.classList.contains("active")
        ) {
            return;
        }

        if (evento.key === "Escape") {
            fecharModal();
            return;
        }

        if (evento.key !== "Tab") return;

        const elementosFocaveis = [
            ...modalAvisos.querySelectorAll(
                'button:not([disabled]), ' +
                'a[href], ' +
                'input:not([disabled]), ' +
                'select:not([disabled]), ' +
                'textarea:not([disabled]), ' +
                '[tabindex]:not([tabindex="-1"])'
            )
        ];

        if (!elementosFocaveis.length) {
            evento.preventDefault();
            return;
        }

        const primeiro = elementosFocaveis[0];

        const ultimo = elementosFocaveis[
            elementosFocaveis.length - 1
        ];

        if (
            evento.shiftKey &&
            document.activeElement === primeiro
        ) {
            evento.preventDefault();
            ultimo.focus();
        }

        else if (
            !evento.shiftKey &&
            document.activeElement === ultimo
        ) {
            evento.preventDefault();
            primeiro.focus();
        }
    });


    /* =====================================================
       09. ROLAGEM SUAVE DOS LINKS INTERNOS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", evento => {

            const destinoId = link.getAttribute("href");

            if (!destinoId || destinoId === "#") return;

            const destino = document.querySelector(destinoId);

            if (!destino) return;

            evento.preventDefault();

            destino.scrollIntoView({
                behavior: comportamentoRolagem(),
                block: "start"
            });

            // Atualiza a URL sem recarregar a página.
            if (window.location.hash !== destinoId) {
                history.pushState(null, "", destinoId);
            }
        });
    });


    /* =====================================================
       10. INICIALIZAÇÃO FINAL
    ===================================================== */

    atualizarHeader();
    atualizarLinkAtivo();

});
