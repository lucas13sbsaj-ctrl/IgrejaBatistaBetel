// --- CONTROLE DE EXPANSÃO E RETRAÇÃO DOS PASTORES NO MOBILE ---
document.addEventListener("DOMContentLoaded", function() {
    const pastorCards = document.querySelectorAll('.pastor_cascata_card');

    if (pastorCards.length > 0) {
        pastorCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Funciona perfeitamente em telas de celular e tablet ( <= 900px )
                if (window.innerWidth <= 900) {
                    const jaEstaAtivo = this.classList.contains('ativo-mobile');

                    // Fecha todos os cards abertos
                    pastorCards.forEach(c => c.classList.remove('ativo-mobile'));

                    // Se não estava ativo, abre. Se já estava, continua fechado (fazendo o efeito de fechar ao re-clicar)
                    if (!jaEstaAtivo) {
                        this.classList.add('ativo-mobile');
                    }
                }
            });
        });
    }
});