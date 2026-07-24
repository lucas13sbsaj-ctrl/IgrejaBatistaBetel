
window.onload = function() { //Quando a janela do navegador terminar de carregar, execute essa função.

    const botaoMenu = document.querySelector(".menu_mobile"); //Procure no meu HTML o primeiro elemento que tenha a classe .menu_mobile e guarde ele na const botaoMenu
    const menuUl = document.querySelector(".menu ul");

    const iconeMenu = document.querySelector(".icone-menu");
    const iconeFechar = document.querySelector(".icone-fechar");

    const header = document.querySelector("header");

    botaoMenu.addEventListener("click", function() { //Fique observando o botaoMenu. Quando alguém clicar nele, execute essa função.

        if (menuUl.style.display === "flex") { //Se o display do menu for exatamente igual a flex...

            // Fecha o menu
            menuUl.style.display = "none";

            iconeMenu.style.display = "block";
            iconeFechar.style.display = "none";

            // Remove a cor do header
            header.classList.remove("menu-aberto");

        } else {

            // Abre o menu
            menuUl.style.display = "flex";

            iconeMenu.style.display = "none";
            iconeFechar.style.display = "block";

            // Adiciona a cor no header
            header.classList.add("menu-aberto");

        }

    });

};