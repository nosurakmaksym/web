
function initModals() {
    const authModal = document.getElementById('auth-modal');
    document.getElementById('auth-btn').addEventListener('click', () => authModal.classList.remove('hidden'));
    document.getElementById('close-auth').addEventListener('click', () => authModal.classList.add('hidden'));

    document.getElementById('cart-btn').onclick = openCart;
    document.getElementById('close-cart').onclick = closeCart;
    document.getElementById('cart-overlay').onclick = closeCart;

    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            authForms.forEach(f => f.classList.add('hidden'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab') === 'login' ? 'login-form' : 'register-form';
            document.getElementById(targetId).classList.remove('hidden');
        });
    });
}

function initCarousel() {
    const track = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById('carousel-dots');
    let index = 0;

    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');
    function goToSlide(i) {
        index = i;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function nextSlide() { goToSlide((index + 1) % slides.length); }
    function prevSlide() { goToSlide((index - 1 + slides.length) % slides.length); }

    document.getElementById('carousel-next').addEventListener('click', nextSlide);
    document.getElementById('carousel-prev').addEventListener('click', prevSlide);
    setInterval(nextSlide, 5000);
}



function initSubscriptionBanner() {
    const banner = document.getElementById('subscribe-banner');
    const btnAccept = document.getElementById('btn-accept-sub');
    const btnDecline = document.getElementById('btn-decline-sub');
    const toast = document.getElementById('toast-message');

    const isSubscribed = localStorage.getItem('telemartCloneSubscribed');

    if (!isSubscribed) {
        setTimeout(() => { banner.classList.add('show'); }, 3000);
    }

    btnAccept.addEventListener('click', () => {
        banner.classList.remove('show');
        localStorage.setItem('telemartCloneSubscribed', 'true');
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => { toast.classList.remove('show'); }, 3000);
        }, 400);
    });

    btnDecline.addEventListener('click', () => {
        banner.classList.remove('show');
    });
}



function initAdModal() {
    const adModal = document.getElementById('ad-modal');
    const closeBtn = document.getElementById('close-ad-btn');
    const timerSpan = document.getElementById('ad-timer');
    
    setTimeout(() => {
        adModal.classList.remove('hidden');
        
        let timeLeft = 5;
        timerSpan.textContent = timeLeft;
        
        const countdown = setInterval(() => {
            timeLeft--;
            timerSpan.textContent = timeLeft;
            
            if(timeLeft <= 0) {
                clearInterval(countdown);
                closeBtn.removeAttribute('disabled');
                closeBtn.innerHTML = 'Закрити рекламу';
            }
        }, 1000);
    }, 7000); 
    
    closeBtn.addEventListener('click', () => {
        adModal.classList.add('hidden');
    });
}



function initScrollTopButton() {
    const scrollBtn = document.getElementById('scroll-top-btn');
    
    window.addEventListener('scroll', () => {
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        if (scrollY > (viewportHeight * 2 / 3)) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}