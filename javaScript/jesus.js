
/* ==========================================================
   IGREJA BATISTA BETEL
   JESUS.JS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* ======================================================
       01. ANIMAÇÕES DE ENTRADA
    ====================================================== */

    const elementos = document.querySelectorAll(".jesus-reveal");

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        "IntersectionObserver" in window &&
        !movimentoReduzido
    ) {

        document.documentElement.classList.add(
            "jesus-js-reveal"
        );

        const observer = new IntersectionObserver(
            (entries, observador) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visivel");

                        observador.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        elementos.forEach(elemento => {
            observer.observe(elemento);
        });

    } else {

        elementos.forEach(elemento => {
            elemento.classList.add("visivel");
        });

    }


    /* ======================================================
       02. FORMULÁRIO DE CONTATO
    ====================================================== */

    const formulario = document.querySelector("#whatsappForm");

    const feedback = document.querySelector("#form-feedback");

    if (formulario) {

        formulario.addEventListener("submit", evento => {

            evento.preventDefault();

            if (!formulario.reportValidity()) return;

            const nome = document.querySelector("#nome").value.trim();

            const assunto = document.querySelector("#assunto").value;

            const mensagem = document.querySelector("#mensagem").value.trim();

            if (!nome || !assunto || !mensagem) {

                if (feedback) {
                    feedback.textContent =
                        "Preencha todos os campos antes de continuar.";
                }

                return;
            }

            const texto = [
                "Olá! Paz do Senhor!",
                "",
                "Estou entrando em contato através do site da Igreja Batista Betel.",
                "",
                `*Nome:* ${nome}`,
                `*Assunto:* ${assunto}`,
                "",
                "*Mensagem:*",
                mensagem
            ].join("\n");

            /*
               Abre o compartilhamento do WhatsApp
               com a mensagem preenchida.

               Quando houver um número oficial da igreja,
               podemos direcionar diretamente para ele.
            */

            const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;

            if (feedback) {
                feedback.textContent =
                    "Abrindo o WhatsApp para você escolher o contato e enviar sua mensagem.";
            }

            window.location.href = url;

        });

    }

});
