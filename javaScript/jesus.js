
/* ==========================================================
   IGREJA BATISTA BETEL
   JESUS.JS

   Formulário de contato via WhatsApp
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const formulario = document.querySelector("#whatsappForm");

    const campoNome = document.querySelector("#nome");
    const campoAssunto = document.querySelector("#assunto");
    const campoMensagem = document.querySelector("#mensagem");

    const feedback = document.querySelector("#form-feedback");

    // Confirme se este é o WhatsApp oficial da igreja.
    const numeroWhatsApp = "5575999206686";

    if (
        !formulario ||
        !campoNome ||
        !campoAssunto ||
        !campoMensagem
    ) {
        return;
    }


    /* ======================================================
       ENVIO DO FORMULÁRIO
    ====================================================== */

    formulario.addEventListener("submit", evento => {

        evento.preventDefault();

        const nome = campoNome.value.trim();
        const assunto = campoAssunto.value;
        const mensagem = campoMensagem.value.trim();


        /* VALIDAÇÃO */

        if (!nome || !assunto || !mensagem) {

            if (feedback) {
                feedback.textContent =
                    "Por favor, preencha todos os campos.";
            }

            return;
        }


        /* MONTAGEM DA MENSAGEM */

        const textoWhatsApp = [
            "Olá! Paz do Senhor!",
            "",
            `Meu nome é *${nome}*.`,
            "",
            `*Assunto:* ${assunto}`,
            "",
            "*Mensagem:*",
            mensagem
        ].join("\n");


        /* LINK DO WHATSAPP */

        const url = new URL(
            `https://wa.me/${numeroWhatsApp}`
        );

        url.searchParams.set(
            "text",
            textoWhatsApp
        );


        /* ABRIR WHATSAPP */

        if (feedback) {
            feedback.textContent = "";
        }

        const novaAba = window.open(
            url.toString(),
            "_blank"
        );

        if (novaAba) {
            novaAba.opener = null;
        } else if (feedback) {
            feedback.textContent =
                "Não foi possível abrir o WhatsApp. " +
                "Verifique se o navegador bloqueou a nova aba.";
        }

    });

});
