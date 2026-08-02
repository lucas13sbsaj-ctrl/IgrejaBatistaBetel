window.onload = function() {

    // =========================
    // MENU MOBILE
    // =========================

    const botaoMenu = document.querySelector(".menu_mobile");
    const menuUl = document.querySelector(".menu ul");

    const iconeMenu = document.querySelector(".icone-menu");
    const iconeFechar = document.querySelector(".icone-fechar");

    const header = document.querySelector("header");

    // Links do menu
    const linksMenu = document.querySelectorAll(".menu ul li a");


    // ABRIR E FECHAR MENU PELO BOTÃO
    botaoMenu.addEventListener("click", function() {

        if (menuUl.style.display === "flex") {

            // Fecha o menu
            menuUl.style.display = "none";

            iconeMenu.style.display = "block";
            iconeFechar.style.display = "none";

            header.classList.remove("menu-aberto");

        } else {

            // Abre o menu
            menuUl.style.display = "flex";

            iconeMenu.style.display = "none";
            iconeFechar.style.display = "block";

            header.classList.add("menu-aberto");

        }

    });


    // =========================
    // FECHAR MENU AO CLICAR EM UM LINK
    // =========================

    linksMenu.forEach((link) => {

        link.addEventListener("click", function() {

            // Fecha o menu
            menuUl.style.display = "";

            // Troca o ícone
            iconeMenu.style.display = "block";
            iconeFechar.style.display = "none";

            // Remove a classe do header
            header.classList.remove("menu-aberto");

        });

    });


    // =========================
    // ANIMAÇÃO DOS CULTOS
    // =========================

    const cultos = document.querySelectorAll(".info-culto");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("mostrar");

            }

        });

    });


    cultos.forEach((culto) => {

        observer.observe(culto);

    });
};


