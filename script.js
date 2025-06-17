document.addEventListener('DOMContentLoaded', function () {
    // Observador de interseção para animações
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observar todos os elementos com fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Configurar efeitos hover para cards
    function setupCardHoverEffects() {
        const cards = document.querySelectorAll('.feature-card, .testimonial-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });
    }
    setupCardHoverEffects();

    // Suavizar rolagem para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação sequencial para os cards de features
    function animateFeatureCards() {
        const cards = document.querySelectorAll('.feature-card');
        const delayBetweenCards = 200; // 200ms entre cada card

        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * delayBetweenCards);
        });
    }

    // Observador específico para os cards de features
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('features')) {
                animateFeatureCards();
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const featuresContainer = document.querySelector('.features');
    if (featuresContainer) {
        featureObserver.observe(featuresContainer);
    }
});