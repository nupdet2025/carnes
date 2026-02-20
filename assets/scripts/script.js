// Seleção de elementos
const header = document.getElementById('main-header');
const btn = document.getElementById('toggle-fullscreen');
const iframeContainer = document.getElementById('iframe-section');

// --- LÓGICA DO HEADER (SOME/APARECE) ---
let lastScroll = 0;
const scrollThreshold = 5;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Se estiver em modo fullscreen, não esconde o header (evita bugs visuais)
    if (document.fullscreenElement) return;

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('header-up');
    }

    else if (lastScroll - currentScroll > scrollThreshold) {
        header.classList.remove('header-up');
    }

    lastScroll = Math.max(currentScroll, 0);
}, { passive: true });


// --- LÓGICA DO FULLSCREEN DO IFRAME ---
btn.addEventListener('click', () => {
    if (!document.fullscreenElement) {

        if (iframeContainer.requestFullscreen) {
            iframeContainer.requestFullscreen();
        } else if (iframeContainer.webkitRequestFullscreen) {
            iframeContainer.webkitRequestFullscreen();
        } else if (iframeContainer.msRequestFullscreen) {
            iframeContainer.msRequestFullscreen();
        }

        btn.textContent = "Sair da Tela Cheia";
        btn.classList.add('btn-floating');
    } else {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }

        btn.textContent = "Ver em Tela Cheia";
        btn.classList.remove('btn-floating');
    }
});

// Listener para detectar se o usuário apertou "ESC" ou saiu do modo full pelo navegador
const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
        btn.textContent = "Ver em Tela Cheia";
        btn.classList.remove('btn-floating');
        header.classList.remove('header-up');
    }
};

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

// --- CONTROLE DE LOOPING PARA OS VIDEOS ---

document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector('.video-background video');
    const banner = document.querySelector('.banner-container');
    if (!video || !banner) return;
    video.loop = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && window.scrollY < 100) {
                
                video.classList.add('video-fade-out');

                setTimeout(() => {
                    video.currentTime = 0;
                    video.play().catch(e => console.log("Play condicional"));
                    video.classList.remove('video-fade-out');
                }, 200);
            }
        });
    }, {
        threshold: 0.9 
    });

    observer.observe(banner);
});