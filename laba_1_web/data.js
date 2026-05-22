const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('main .container');

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        
        navLinks.forEach(nav => nav.classList.remove('nav__link--active'));        
        link.classList.add('nav__link--active');

        sections.forEach(section => section.classList.add('hidden'));

        const targetId = link.getAttribute('data-target');
        document.getElementById(targetId).classList.remove('hidden');
    });
});