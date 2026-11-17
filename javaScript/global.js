
/* ==========================================================
   IGREJA BATISTA BETEL
   GLOBAL.JS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* 01. HEADER */

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


    /* 02. MENU MOBILE */

    const menuToggle = document.querySelector("#menu-toggle");
    const menu = document.querySelector("#menu-principal");

    if (menuToggle && menu) {

        function fecharMenu() {
            menu.classList.remove("abrir");
            document.body.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        }

        function abrirMenu() {
            menu.classList.add("abrir");
            document.body.classList.add("menu-open");

            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Fechar menu");

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


    /* 03. MODAL DE AVISOS */

    const btnAvisos = document.querySelector("#btn-avisos");
    const modal = document.querySelector("#modal-avisos");

    const btnFechar = document.querySelector("#btn-fechar-modal");
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
            btnAvisos.setAttribute("aria-expanded", "true");

            document.body.classList.add("modal-open");

            (btnFechar || modal).focus();
        }

        function fecharModal() {
            const destinoFoco = focoAnterior || btnAvisos;

            if (typeof destinoFoco.focus === "function") {
                destinoFoco.focus();
            }

            modal.classList.remove("ativo");
            modal.setAttribute("aria-hidden", "true");
            modal.inert = true;

            btnAvisos.setAttribute("aria-expanded", "false");

            document.body.classList.remove("modal-open");
        }

        btnAvisos.addEventListener("click", abrirModal);

        btnFechar?.addEventListener("click", fecharModal);
        btnEntendi?.addEventListener("click", fecharModal);

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


    /* 04. ANO AUTOMÁTICO DO RODAPÉ */

    const anoAtual = document.querySelector("#ano-atual");

    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    // ==========================================
// CARROSSEL — NOSSOS PASTORES
// ==========================================

if (document.querySelector(".pastores-swiper") && typeof Swiper !== "undefined") {

    const carrosselPastores = new Swiper(".pastores-swiper", {

        slidesPerView: 1.15,
        spaceBetween: 16,

        speed: 650,

        loop: true,

        grabCursor: true,

        navigation: {
            nextEl: ".pastores-next",
            prevEl: ".pastores-prev"
        },

        breakpoints: {

            650: {
                slidesPerView: 2,
                spaceBetween: 22
            },

            1000: {
                slidesPerView: 3,
                spaceBetween: 28
            }

        }

    });

}

});


// ==========================================
// EFEITO POP-OUT — PASTORES
// ==========================================

const elementosPopOut = document.querySelectorAll(".pop-out");

if ("IntersectionObserver" in window) {

    const popOutObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visivel");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    elementosPopOut.forEach((elemento) => {
        popOutObserver.observe(elemento);
    });

} else {

    elementosPopOut.forEach((elemento) => {
        elemento.classList.add("visivel");
    });

}
