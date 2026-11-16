
/* ==========================================================
   IGREJA BATISTA BETEL
   NOSSA-HISTORIA.JS

   Funcionalidade exclusiva:
   - Modal dos quatro pilares da Visão da IBB
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* ======================================================
       01. ELEMENTOS
    ====================================================== */

    const modal = document.querySelector("#modalDetalhes");

    const modalTitulo = document.querySelector("#modalTitulo");

    const modalTexto = document.querySelector("#modalTexto");

    const btnFechar = document.querySelector(".modal_fechar");

    const pilares = document.querySelectorAll(
        ".ibb_coluna_card[data-pilar]"
    );


    if (
        !modal ||
        !modalTitulo ||
        !modalTexto ||
        !btnFechar
    ) {
        return;
    }


    /* ======================================================
       02. CONTEÚDO DOS PILARES
    ====================================================== */

    const conteudos = {

        ganhar: {
            titulo: "Ganhar",
            texto:
                "Compartilhar o Evangelho de Jesus Cristo, " +
                "alcançando pessoas por meio do amor, " +
                "do testemunho cristão e da proclamação " +
                "da Palavra de Deus."
        },

        consolidar: {
            titulo: "Consolidar",
            texto:
                "Acolher e acompanhar aqueles que chegam " +
                "à igreja, fortalecendo sua caminhada " +
                "com Cristo por meio da comunhão, " +
                "do cuidado e do discipulado."
        },

        treinar: {
            titulo: "Treinar",
            texto:
                "Preparar e capacitar os membros da igreja " +
                "para servir com responsabilidade, " +
                "maturidade espiritual e conhecimento " +
                "da Palavra de Deus."
        },

        enviar: {
            titulo: "Enviar",
            texto:
                "Incentivar e enviar discípulos preparados " +
                "para compartilhar o Evangelho, " +
                "servir à comunidade e cumprir " +
                "a missão confiada por Jesus à Igreja."
        }

    };


    /* ======================================================
       03. CONTROLE DO MODAL
    ====================================================== */

    let focoAnterior = null;

    modal.classList.remove("ativo");

    modal.setAttribute("aria-hidden", "true");

    modal.inert = true;


    /* ======================================================
       04. ABRIR MODAL
    ====================================================== */

    function abrirModal(pilar) {

        const conteudo = conteudos[pilar];

        if (!conteudo) return;

        focoAnterior = document.activeElement;

        modalTitulo.textContent = conteudo.titulo;

        modalTexto.textContent = conteudo.texto;

        modal.inert = false;

        modal.classList.add("ativo");

        modal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        btnFechar.focus();

    }


    /* ======================================================
       05. FECHAR MODAL
    ====================================================== */

    function fecharModal() {

        if (!modal.classList.contains("ativo")) {
            return;
        }

        if (
            focoAnterior &&
            typeof focoAnterior.focus === "function"
        ) {
            focoAnterior.focus();
        }

        modal.classList.remove("ativo");

        modal.setAttribute("aria-hidden", "true");

        modal.inert = true;

        document.body.classList.remove("modal-open");

    }


    /* ======================================================
       06. CLIQUE NOS PILARES
    ====================================================== */

    pilares.forEach(pilar => {

        pilar.addEventListener("click", () => {

            const identificador = pilar.dataset.pilar;

            abrirModal(identificador);

        });

    });


    /* ======================================================
       07. BOTÃO DE FECHAR
    ====================================================== */

    btnFechar.addEventListener("click", fecharModal);


    /* ======================================================
       08. FECHAR AO CLICAR FORA
    ====================================================== */

    modal.addEventListener("click", evento => {

        if (evento.target === modal) {
            fecharModal();
        }

    });


    /* ======================================================
       09. TECLA ESCAPE E FOCO
    ====================================================== */

    document.addEventListener("keydown", evento => {

        if (!modal.classList.contains("ativo")) {
            return;
        }

        if (evento.key === "Escape") {

            evento.preventDefault();

            fecharModal();

            return;
        }

        if (evento.key !== "Tab") {
            return;
        }

        const elementos = Array.from(
            modal.querySelectorAll(
                'a[href], button:not([disabled]), ' +
                'input:not([disabled]), ' +
                'select:not([disabled]), ' +
                'textarea:not([disabled]), ' +
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

});
