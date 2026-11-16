
/* ==========================================================
   IGREJA BATISTA BETEL
   PASTORES.JS

   Funcionalidade exclusiva:
   - Expandir e recolher biografias dos pastores
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const cards = document.querySelectorAll(
        ".pastor_cascata_card"
    );

    if (!cards.length) return;


    /* ======================================================
       01. ALTERAR ESTADO DO CARD
    ====================================================== */

    function definirEstado(card, expandido) {

        const botao = card.querySelector(
            ".cascata_toggle"
        );

        const biografia = card.querySelector(
            ".cascata_biografia"
        );

        if (!botao || !biografia) return;

        card.classList.toggle("ativo", expandido);

        botao.setAttribute(
            "aria-expanded",
            String(expandido)
        );

        biografia.setAttribute(
            "aria-hidden",
            String(!expandido)
        );

        biografia.inert = !expandido;

        const texto = botao.querySelector("span");

        if (texto) {
            texto.textContent = expandido
                ? "Recolher trajetória"
                : "Conhecer trajetória";
        }

    }


    /* ======================================================
       02. CONFIGURAÇÃO DOS CARDS
    ====================================================== */

    cards.forEach(card => {

        const botao = card.querySelector(
            ".cascata_toggle"
        );

        if (!botao) return;

        definirEstado(card, false);

        botao.addEventListener("click", () => {

            const estaAberto = card.classList.contains(
                "ativo"
            );

            // Fecha as outras biografias.
            cards.forEach(outroCard => {

                if (outroCard !== card) {
                    definirEstado(outroCard, false);
                }

            });

            // Alterna o card selecionado.
            definirEstado(card, !estaAberto);

        });

    });

});
