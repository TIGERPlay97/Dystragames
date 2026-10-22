// Dystra Games - Script Principal

document.addEventListener('DOMContentLoaded', () => {
    console.log('Sitio web de Dystra Games cargado correctamente.');

    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg', 'bg-slate-900/80');
        } else {
            header.classList.remove('shadow-lg', 'bg-slate-900/80');
        }
    });
    // Aquí irán las funciones interactivas que agregaremos a futuro.
});