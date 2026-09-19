// --- MENU MOBILE ---
const menuBotao = document.querySelector('.menu_abrir');
const nav = document.querySelector('nav');

menuBotao.onclick = function() {
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
    }
};

// --- CARROSSEL (CLIQUE NAS BOLINHAS) ---
const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('img');
const navLinks = document.querySelectorAll('.slider-nav a');
const totalSlides = slides.length;
let currentIndex = 0;
let intervaloCarrossel = null;

// Função para atualizar qual bolinha está acesa
function atualizarBolinha(index) {
    navLinks.forEach((link, i) => {
        if (i === index) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Inicia com a primeira bolinha acesa
atualizarBolinha(0);

function proximoSlide() {
    currentIndex = (currentIndex + 1) % totalSlides; // Avança e volta para o 0 quando chega no final
    
    slides[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
    });
    
    atualizarBolinha(currentIndex);
}

// Funções para controlar o autoplay condicional
function iniciarAutoplay() {
    if (!intervaloCarrossel) {
        intervaloCarrossel = setInterval(proximoSlide, 3000);
    }
}

function pausarAutoplay() {
    clearInterval(intervaloCarrossel);
    intervaloCarrossel = null;
}

// Pausa o autoplay quando o mouse estiver em cima do carrossel
const wrapper = document.querySelector('.slider-wrapper');

wrapper.addEventListener('mouseenter', pausarAutoplay);
wrapper.addEventListener('mouseleave', () => {
    // Só reinicia se a seção dos pastores estiver visível na tela
    if (document.querySelector('.section_pastor').classList.contains('visivel')) {
        iniciarAutoplay();
    }
});

// Faz as bolinhas funcionarem ao clicar manualmente
navLinks.forEach((link, index) => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Evita que a página dê o pulo vertical
        currentIndex = index;
        
        slides[currentIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',   // Evita scroll vertical desnecessário
            inline: 'start'     // Alinha horizontalmente
        });
        
        atualizarBolinha(currentIndex);
    });
});

// --- CARROSSEL AUTOMÁTICO INTELIGENTE (APENAS NA SEÇÃO DOS PASTORES) ---
const secaoPastor = document.querySelector('.section_pastor');

const observerSecao = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // A seção apareceu na tela: liga o carrossel automático
            secaoPastor.classList.add('visivel');
            iniciarAutoplay();
        } else {
            // A seção saiu da tela: desliga o carrossel para economizar
            secaoPastor.classList.remove('visivel');
            pausarAutoplay();
        }
    });
}, {
    threshold: 0.3 // Dispara quando pelo menos 30% da seção estiver visível
});

observerSecao.observe(secaoPastor);

// Sincroniza as bolinhas caso o usuário arraste manualmente com o dedo (mobile)
const observerSlides = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(slides).indexOf(entry.target);
            if (index !== -1) {
                currentIndex = index;
                atualizarBolinha(currentIndex);
            }
        }
    });
}, {
    root: slider,
    threshold: 0.5
});

slides.forEach(slide => observerSlides.observe(slide));


// --- ANIMAÇÃO DA PROGRAMAÇÃO SEMANAL AO ROLAR A TELA ---
const secaoProgramacao = document.querySelector('.section_programacao');

const observerProgramacao = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Verifica se a seção realmente entrou na tela
        if (entry.isIntersecting) {
            secaoProgramacao.classList.add('visivel');
            
            // Para de observar depois que animou (assim a animação acontece só uma vez)
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3 // Exige que pelo menos 30% da seção apareça antes de disparar
});

if (secaoProgramacao) {
    observerProgramacao.observe(secaoProgramacao);
}

// --- MENU DE NAVEGAÇÃO SUAVE E ATIVO ---
const menuLinks = document.querySelectorAll('header nav ul li a');

menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Verifica se o link é uma âncora interna (começa com #)
        const targetId = this.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Rrola suavemente até a seção
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Remove a classe 'active' de todos e coloca apenas no clicado
                menuLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// --- DUPLICAÇÃO AUTOMÁTICA DO TICKER APÓS O CARREGAMENTO COMPLETO ---
window.addEventListener('load', () => {
    const tickerTrack = document.getElementById('tickerTrack');
    if (tickerTrack) {
        // Limpa qualquer duplicação anterior para evitar duplicar em dobro
        // e injeta o conteúdo exato novamente para fechar os 50%
        const conteudoOriginal = tickerTrack.innerHTML;
        tickerTrack.innerHTML = conteudoOriginal + conteudoOriginal;
    }
});