
/* ==========================================================
   IGREJA BATISTA BETEL
   GLOBAL.JS

   Funcionalidades compartilhadas:
   - Header ao rolar a página
   - Menu mobile
   - Modal de avisos
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* ======================================================
       01. HEADER AO ROLAR
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

        function fecharMenu() {
            menu.classList.remove("abrir");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        }

        function abrirMenu() {
            menu.classList.add("abrir");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Fechar menu"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
        }

        menuToggle.addEventListener("click", () => {

            if (menu.classList.contains("abrir")) {
                fecharMenu();
            } else {
                abrirMenu();
            }

        });

        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", fecharMenu);
        });

        document.addEventListener("click", evento => {

            if (
                !menu.contains(evento.target) &&
                !menuToggle.contains(evento.target)
            ) {
                fecharMenu();
            }

        });

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

    const btnFechar = document.querySelector("#btn-fechar-modal");
    const btnEntendi = document.querySelector("#btn-entendi");

    if (!btnAvisos || !modal) return;

    let focoAnterior = null;


    /* ======================================================
       04. ESTADO INICIAL
    ====================================================== */

    // Garante que o modal comece fechado.

    modal.classList.remove("ativo");

    modal.setAttribute("aria-hidden", "true");
    modal.inert = true;

    btnAvisos.setAttribute("aria-expanded", "false");

    document.body.classList.remove("modal-open");


    /* ======================================================
       05. ABRIR MODAL
    ====================================================== */

    function abrirModal() {

        focoAnterior = document.activeElement;

        // Primeiro permite interação com o modal.
        modal.inert = false;

        // Exibe o modal.
        modal.classList.add("ativo");

        modal.setAttribute("aria-hidden", "false");

        btnAvisos.setAttribute("aria-expanded", "true");

        // Impede rolagem da página.
        document.body.classList.add("modal-open");

        // Direciona o foco ao botão de fechar.
        btnFechar?.focus();

    }


    /* ======================================================
       06. FECHAR MODAL
    ====================================================== */

    function fecharModal() {

        // Devolve o foco antes de ocultar o modal.
        if (
            focoAnterior &&
            typeof focoAnterior.focus === "function"
        ) {
            focoAnterior.focus();
        } else {
            btnAvisos.focus();
        }

        modal.classList.remove("ativo");

        modal.setAttribute("aria-hidden", "true");
        modal.inert = true;

        btnAvisos.setAttribute("aria-expanded", "false");

        document.body.classList.remove("modal-open");

    }


    /* ======================================================
       07. EVENTOS DO MODAL
    ====================================================== */

    btnAvisos.addEventListener("click", abrirModal);

    btnFechar?.addEventListener("click", fecharModal);

    btnEntendi?.addEventListener("click", fecharModal);


    // Fecha ao clicar fora da caixa de avisos.

    modal.addEventListener("click", evento => {

        if (evento.target === modal) {
            fecharModal();
        }

    });


    // Fecha com Escape e mantém Tab dentro do modal.

    document.addEventListener("keydown", evento => {

        if (!modal.classList.contains("ativo")) {
            return;
        }

        if (evento.key === "Escape") {
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
