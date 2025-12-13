document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    
    // Slider do Hero
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    // Formulário de contato
    const contactForm = document.querySelector('.contact-form');
    
    // Variáveis globais
    let currentSlide = 0;
    let slideInterval;
    
    // Inicialização
    init();
    
    function init() {
        setupMobileMenu();
        setupHeroSlider();
        setupScrollEffects();
        setupFormHandler();
        setupSmoothScrolling();
        setupAnimations();
        startAutoSlide();
        setupGalleryModal();
        setupParallax();
    }
    
    // Menu Mobile
    function setupMobileMenu() {
        hamburger.addEventListener('click', toggleMobileMenu);
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', closeMobileMenu);
        }
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
    
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Hero Slider
    function setupHeroSlider() {
        // Botões de navegação (se existirem)
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                changeSlide(currentSlide - 1);
                resetAutoSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                changeSlide(currentSlide + 1);
                resetAutoSlide();
            });
        }
        
        // Indicadores removidos para design mais clean
        
        // Touch/Swipe support
        let startX = 0;
        let startY = 0;
        
        const heroSlider = document.querySelector('.hero-slider');
        
        heroSlider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        heroSlider.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Se o movimento horizontal for maior que o vertical
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (Math.abs(diffX) > 50) { // Mínimo de 50px de movimento
                    if (diffX > 0) {
                        // Swipe left - próximo slide
                        changeSlide(currentSlide + 1);
                    } else {
                        // Swipe right - slide anterior
                        changeSlide(currentSlide - 1);
                    }
                    resetAutoSlide();
                }
            }
        });
    }
    
    function changeSlide(slideIndex) {
        // Remover classe active do slide atual
        if (slides[currentSlide]) {
            slides[currentSlide].classList.remove('active');
        }
        
        // Calcular novo índice
        if (slideIndex >= slides.length) {
            currentSlide = 0;
        } else if (slideIndex < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = slideIndex;
        }
        
        // Adicionar classe active ao novo slide
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
        }
    }
    
    function startAutoSlide() {
        if (slides.length > 1) {
            slideInterval = setInterval(() => {
                changeSlide(currentSlide + 1);
            }, 6000);
        }
    }
    
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    // Efeitos de Scroll
    function setupScrollEffects() {
        // Intersection Observer para animações
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);
        
        // Observar elementos para animação
        const animatedElements = document.querySelectorAll(
            '.service-card, .project-card, .blog-card, .about-text, .about-image'
        );
        
        animatedElements.forEach(el => observer.observe(el));
        
        // Único event listener para scroll
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    handleParallax();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    function handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // Header background
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    function handleParallax() {
        // Parallax para seções .parallax-section (original)
        const parallaxSections = document.querySelectorAll('.parallax-section');
        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const speed = 0.5;
            
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const yPos = -(rect.top * speed);
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
        
        // Parallax para as imagens de fundo do slider
        const scrollTop = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        // Desabilitar parallax em dispositivos móveis
        if (hero && scrollTop < hero.offsetHeight && window.innerWidth > 768) {
            const slideBackgrounds = document.querySelectorAll('.slide-bg');
            slideBackgrounds.forEach(bg => {
                const speed = 0.6;
                const yPos = scrollTop * speed;
                bg.style.backgroundPosition = `center ${50 + (yPos * 0.2)}%`;
            });
        }
    }
    
    // Smooth Scrolling
    function setupSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Formulário de Contato
    function setupFormHandler() {
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = new FormData(contactForm);
        const data = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            telefone: formData.get('telefone'),
            servico: formData.get('servico'),
            mensagem: formData.get('mensagem')
        };
        
        // Validação básica
        if (!validateForm(data)) {
            return;
        }
        
        // Mostrar loading
        showLoading();
        
        // Simular envio (aqui você integraria com seu backend)
        setTimeout(() => {
            hideLoading();
            showSuccessMessage();
            contactForm.reset();
        }, 2000);
    }
    
    function validateForm(data) {
        // Reset de mensagens de erro
        clearErrorMessages();
        
        let isValid = true;
        
        // Validar nome
        if (!data.nome || data.nome.trim().length < 2) {
            showError('nome', 'Nome deve ter pelo menos 2 caracteres');
            isValid = false;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            showError('email', 'E-mail inválido');
            isValid = false;
        }
        
        // Validar telefone
        const phoneRegex = /^[\(\)\s\-\+\d]{10,}$/;
        if (!data.telefone || !phoneRegex.test(data.telefone)) {
            showError('telefone', 'Telefone inválido');
            isValid = false;
        }
        
        // Validar serviço
        if (!data.servico) {
            showError('servico', 'Selecione um serviço');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.classList.add('error');
            
            // Criar elemento de erro se não existir
            let errorElement = field.parentNode.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                field.parentNode.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
        }
    }
    
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        const errorFields = document.querySelectorAll('.error');
        
        errorMessages.forEach(msg => msg.remove());
        errorFields.forEach(field => field.classList.remove('error'));
    }
    
    function showLoading() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.dataset.originalText = originalText;
    }
    
    function hideLoading() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.dataset.originalText;
        
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
    
    function showSuccessMessage() {
        // Criar modal de sucesso
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Mensagem Enviada!</h3>
                <p>Obrigado pelo contato. Retornaremos em breve!</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">
                    Fechar
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto remover após 5 segundos
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 5000);
    }
    
    // Animações
    function setupAnimations() {
        // Adicionar CSS para animações
        const style = document.createElement('style');
        style.textContent = `
            .form-group {
                position: relative;
            }
            
            .error {
                border-color: #e74c3c !important;
                box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
            }
            
            .error-message {
                position: absolute;
                bottom: -20px;
                left: 0;
                color: #e74c3c;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .success-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 0;
                text-align: center;
                max-width: 400px;
                margin: 0 20px;
                animation: slideUp 0.3s ease;
            }
            
            .success-icon {
                font-size: 3rem;
                color: #27ae60;
                margin-bottom: 1rem;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .header.scrolled {
                background: rgba(255, 255, 255, 0.98);
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            }
            
            body.menu-open {
                overflow: hidden;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Galeria de fotos em tela cheia aprimorada
    function setupGalleryModal() {
        const thumbs = Array.from(document.querySelectorAll('.gallery-thumb'));
        let modal = document.querySelector('.gallery-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'gallery-modal';
            modal.innerHTML = '<button class="close-btn" title="Fechar">&times;</button>' +
                '<button class="gallery-prev" title="Anterior"><i class="fas fa-chevron-left"></i></button>' +
                '<img src="" alt="Foto em destaque">' +
                '<button class="gallery-next" title="Próxima"><i class="fas fa-chevron-right"></i></button>';
            document.body.appendChild(modal);
        }
        const modalImg = modal.querySelector('img');
        const closeBtn = modal.querySelector('.close-btn');
        const prevBtn = modal.querySelector('.gallery-prev');
        const nextBtn = modal.querySelector('.gallery-next');
        let currentIdx = 0;
        function showModal(idx) {
            currentIdx = idx;
            modalImg.src = thumbs[idx].src;
            modal.classList.add('active');
        }
        thumbs.forEach((thumb, idx) => {
            thumb.addEventListener('click', () => {
                showModal(idx);
            });
        });
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            modalImg.src = '';
        });
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showModal((currentIdx - 1 + thumbs.length) % thumbs.length);
        });
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showModal((currentIdx + 1) % thumbs.length);
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                modalImg.src = '';
            }
        });
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                modalImg.src = '';
            } else if (e.key === 'ArrowLeft') {
                showModal((currentIdx - 1 + thumbs.length) % thumbs.length);
            } else if (e.key === 'ArrowRight') {
                showModal((currentIdx + 1) % thumbs.length);
            }
        });
    }
    document.addEventListener('DOMContentLoaded', setupGalleryModal);
    
    // Utilitários
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Lazy loading para imagens (opcional)
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores antigos
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
    
    // Pausar slider quando não estiver visível
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(slideInterval);
        } else {
            startAutoSlide();
        }
    });
    
    // Parar slider quando hover no hero
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSlider.addEventListener('mouseleave', () => startAutoSlide());
    
    // Adicionar loading state inicial
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Setup lazy loading após o carregamento
        setupLazyLoading();
    });
    
    // Controle de teclado para slider
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(currentSlide - 1);
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            changeSlide(currentSlide + 1);
            resetAutoSlide();
        }
    });
    
    // Adicionar meta viewport dinamicamente se não existir
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(viewport);
    }

    // Efeito Parallax - configuração inicial das imagens de fundo
    function setupParallax() {
        const parallaxSections = document.querySelectorAll('.parallax-section');
        
        // Definir imagens de fundo
        parallaxSections.forEach(section => {
            const bgImage = section.getAttribute('data-bg');
            if (bgImage) {
                section.style.backgroundImage = `url(${bgImage})`;
                section.style.backgroundSize = 'cover';
                section.style.backgroundPosition = 'center';
                section.style.backgroundRepeat = 'no-repeat';
            }
        });
    }
});

// Funções globais para uso externo
window.KasaUno = {
    // Função para abrir modal de projeto
    openProjectModal: function(projectId) {
        console.log('Abrindo modal do projeto:', projectId);
        // Implementar modal de projeto
    },
    
    // Função para filtrar projetos
    filterProjects: function(category) {
        console.log('Filtrando projetos por categoria:', category);
        // Implementar filtro de projetos
    },
    
    // Função para compartilhar nas redes sociais
    shareProject: function(projectId, platform) {
        console.log('Compartilhando projeto', projectId, 'no', platform);
        // Implementar compartilhamento
    }
};