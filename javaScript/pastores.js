
/* ==========================================================
   IGREJA BATISTA BETEL
   PASTORES.JS

   Interações exclusivas da página Pastores
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* ======================================================
       01. ELEMENTOS
    ====================================================== */

    const pastorCards = document.querySelectorAll(
        ".pastor-card"
    );

    if (!pastorCards.length) return;


    /* ======================================================
       02. FECHAR BIOGRAFIA
    ====================================================== */

    function fecharBiografia(card) {

        const botao = card.querySelector(".pastor-toggle");
        const biografia = card.querySelector(".pastor-biografia");

        if (!botao || !biografia) return;

        card.classList.remove("ativo");

        botao.setAttribute("aria-expanded", "false");

        biografia.setAttribute("aria-hidden", "true");
        biografia.inert = true;

        const texto = botao.querySelector("span");

        if (texto) {
            texto.textContent = "Conhecer trajetória";
        }

    }


    /* ======================================================
       03. ABRIR BIOGRAFIA
    ====================================================== */

    function abrirBiografia(card) {

        const botao = card.querySelector(".pastor-toggle");
        const biografia = card.querySelector(".pastor-biografia");

        if (!botao || !biografia) return;

        // Fecha outras biografias
        pastorCards.forEach(outroCard => {

            if (outroCard !== card) {
                fecharBiografia(outroCard);
            }

        });

        card.classList.add("ativo");

        botao.setAttribute("aria-expanded", "true");

        biografia.setAttribute("aria-hidden", "false");
        biografia.inert = false;

        const texto = botao.querySelector("span");

        if (texto) {
            texto.textContent = "Recolher trajetória";
        }

    }


    /* ======================================================
       04. EVENTOS
    ====================================================== */

    pastorCards.forEach(card => {

        const botao = card.querySelector(".pastor-toggle");
        const biografia = card.querySelector(".pastor-biografia");

        if (!botao || !biografia) return;

        fecharBiografia(card);

        botao.addEventListener("click", () => {

            const estaAberto = card.classList.contains("ativo");

            if (estaAberto) {
                fecharBiografia(card);
            } else {
                abrirBiografia(card);
            }

        });

    });

});
