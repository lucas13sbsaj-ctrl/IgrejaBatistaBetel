function openModal(templateId) {
    const modalContainer = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const template = document.getElementById(templateId);

    if (template && modalBody) {
        // Limpa o conteúdo anterior e clona o novo template
        modalBody.innerHTML = '';
        modalBody.appendChild(template.content.cloneNode(true));
        
        // Exibe o modal
        modalContainer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita a rolagem da página ao fundo
    }
}

function closeModal(event) {
    const modalContainer = document.getElementById('modal-container');
    if (event.target === modalContainer) {
        closeModalDirect();
    }
}

function closeModalDirect() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restaura a rolagem da página
}

// Suporte para fechar apertando a tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModalDirect();
    }
});