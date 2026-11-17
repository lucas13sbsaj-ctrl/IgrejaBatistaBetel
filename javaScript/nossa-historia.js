
document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       01. CARROSSÉIS
    ====================================================== */

    function iniciarCarrossel(seletor, paginacao, breakpoints) {

        const elemento = document.querySelector(seletor);
        const elementoPaginacao = document.querySelector(paginacao);

        if (!elemento || !elementoPaginacao) return;

        if (typeof Swiper === "undefined") {
            console.error("Swiper não foi carregado.");
            return;
        }

        return new Swiper(elemento, {

            slidesPerView: 1,
            spaceBetween: 16,
            speed: 550,

            grabCursor: true,
            watchOverflow: true,

            observer: true,
            observeParents: true,

            pagination: {
                el: elementoPaginacao,
                clickable: true,
                bulletClass: "historia-bullet",
                bulletActiveClass: "historia-bullet-active"
            },

            keyboard: {
                enabled: true,
                onlyInViewport: true
            },

            a11y: {
                enabled: true
            },

            breakpoints: breakpoints

        });
    }


    // Missão, Visão e Valores

    iniciarCarrossel(
        ".mvv-swiper",
        ".mvv-pagination",
        {
            650: {
                slidesPerView: 2,
                spaceBetween: 18
            },

            1000: {
                slidesPerView: 3,
                spaceBetween: 24
            }
        }
    );


    // Ganhar, Consolidar, Treinar e Enviar

    iniciarCarrossel(
        ".pilares-swiper",
        ".pilares-pagination",
        {
            650: {
                slidesPerView: 2,
                spaceBetween: 18
            },

            1100: {
                slidesPerView: 4,
                spaceBetween: 18
            }
        }
    );


    // Redes

    iniciarCarrossel(
        ".redes-swiper",
        ".redes-pagination",
        {
            650: {
                slidesPerView: 2,
                spaceBetween: 18
            },

            1100: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    );


    // Ministérios

    iniciarCarrossel(
        ".ministerios-swiper",
        ".ministerios-pagination",
        {
            650: {
                slidesPerView: 2,
                spaceBetween: 18
            },

            1100: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    );


    // Departamentos

    iniciarCarrossel(
        ".departamentos-swiper",
        ".departamentos-pagination",
        {
            650: {
                slidesPerView: 2,
                spaceBetween: 18
            },

            1100: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    );


    /* ======================================================
       02. MODAL DOS QUATRO PILARES
    ====================================================== */

    const modal = document.getElementById("modalDetalhes");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalTexto = document.getElementById("modalTexto");

    const botaoFechar = modal?.querySelector(".pilar-modal-fechar");
    const botoesPilares = document.querySelectorAll("[data-pilar]");

    const pilares = {

        ganhar: {
            titulo: "Ganhar",
            texto: "Compartilhar as boas-novas de Jesus Cristo, anunciando o Evangelho e convidando pessoas a conhecerem o amor e a salvação encontrados nEle."
        },

        consolidar: {
            titulo: "Consolidar",
            texto: "Acolher, acompanhar e fortalecer aqueles que estão iniciando ou aprofundando sua caminhada cristã, incentivando a comunhão e o crescimento espiritual."
        },

        treinar: {
            titulo: "Treinar",
            texto: "Promover o amadurecimento cristão por meio do ensino da Palavra de Deus, do discipulado e da preparação de pessoas para servir com responsabilidade."
        },

        enviar: {
            titulo: "Enviar",
            texto: "Incentivar e preparar discípulos para compartilhar o Evangelho, servir ao próximo e cumprir a missão de Cristo em diferentes ambientes."
        }

    };

    if (!modal || !modalTitulo || !modalTexto || !botaoFechar) {
        return;
    }

    let botaoAnterior = null;


    function abrirModal(pilar, botao) {

        const conteudo = pilares[pilar];

        if (!conteudo) return;

        botaoAnterior = botao;

        modalTitulo.textContent = conteudo.titulo;
        modalTexto.textContent = conteudo.texto;

        modal.inert = false;
        modal.setAttribute("aria-hidden", "false");
        modal.classList.add("ativo");

        document.body.classList.add("pilar-modal-aberto");

        botaoFechar.focus();
    }


    function fecharModal() {

        if (!modal.classList.contains("ativo")) return;

        botaoAnterior?.focus();

        modal.classList.remove("ativo");
        modal.setAttribute("aria-hidden", "true");
        modal.inert = true;

        document.body.classList.remove("pilar-modal-aberto");
    }


    botoesPilares.forEach(botao => {

        botao.addEventListener("click", () => {
            abrirModal(botao.dataset.pilar, botao);
        });

    });


    botaoFechar.addEventListener("click", fecharModal);


    modal.addEventListener("click", evento => {

        if (evento.target === modal) {
            fecharModal();
        }

    });


    document.addEventListener("keydown", evento => {

        if (!modal.classList.contains("ativo")) return;

        if (evento.key === "Escape") {
            fecharModal();
            return;
        }

        if (evento.key !== "Tab") return;

        const elementos = Array.from(
            modal.querySelectorAll(
                'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
            )
        );

        if (!elementos.length) return;

        const primeiro = elementos[0];
        const ultimo = elementos[elementos.length - 1];

        if (evento.shiftKey && document.activeElement === primeiro) {
            evento.preventDefault();
            ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
            evento.preventDefault();
            primeiro.focus();
        }

    });

});
