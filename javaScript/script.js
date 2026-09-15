const menuBotao = document.querySelector('.menu_abrir');
const nav = document.querySelector('nav');

menuBotao.onclick = function() {
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
    }
};