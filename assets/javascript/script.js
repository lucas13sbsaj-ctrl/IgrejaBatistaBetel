
window.onload = function() {

    const botaoMenu = document.querySelector(".menu_mobile");
    const menu = document.querySelector(".menu ul");

    const iconeMenu = document.querySelector(".icone-menu");
    const iconeFechar = document.querySelector(".icone-fechar");

    const header = document.querySelector("header");

    botaoMenu.addEventListener("click", function() {

        if (menu.style.display === "flex") {

            // Fecha o menu
            menu.style.display = "none";

            iconeMenu.style.display = "block";
            iconeFechar.style.display = "none";

            // Remove a cor do header
            header.classList.remove("menu-aberto");

        } else {

            // Abre o menu
            menu.style.display = "flex";

            iconeMenu.style.display = "none";
            iconeFechar.style.display = "block";

            // Adiciona a cor no header
            header.classList.add("menu-aberto");

        }

    });

};