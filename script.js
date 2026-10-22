// Dystra Games - Script Principal

// 1. Base de datos local de proyectos (Fácil de actualizar o modificar)
const listaProyectos = [
    {
        id: "sok",
        titulo: "Proyecto - SOK",
        estado: "En Desarrollo",
        motor: "Unity 6 HDRP",
        descripcion: "Actualmente estamos trabajando en nuestro primer título principal: una experiencia en mundo abierto medieval, con sistemas de combate dinámico, exploración y mecánicas avanzadas.",
        nota: "Próximamente: devlogs de desarrollo",
        linkVerMas: "#"
    }
];

// 2. Función para renderizar dinámicamente las tarjetas en el DOM
function renderizarProyectos() {
    const contenedor = document.getElementById('contenedor-proyectos');
    if (!contenedor) return;

    contenedor.innerHTML = ''; // Limpiar contenedor

    listaProyectos.forEach(proyecto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = "w-full bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-slate-800/90 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-indigo-500/50 transition-all duration-300";

        tarjeta.innerHTML = `
            <div class="glow-bg"></div>

            <div>
                <div class="flex justify-between items-center mb-6">
                    <span class="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/30">
                        ${proyecto.estado}
                    </span>
                    <span class="text-xs font-mono text-slate-500">${proyecto.motor}</span>
                </div>
                
                <h3 class="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-indigo-300 transition-colors">
                    ${proyecto.titulo}
                </h3>
                <p class="text-slate-400 text-sm leading-relaxed mb-8">
                    ${proyecto.descripcion}
                </p>
            </div>

            <div class="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span class="text-xs font-mono text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-md border border-slate-800">
                    ${proyecto.nota}
                </span>
                
                <button onclick="verDetalleProyecto('${proyecto.id}')" class="w-full sm:w-auto px-5 py-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200">
                    VER MÁS
                </button>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });
}

// 3. Función preparada para abrir detalles en el futuro
function verDetalleProyecto(idProyecto) {
    console.log(`Cargando vista detallada para el proyecto: ${idProyecto}`);
    // Aquí conectaremos la vista completa individual de cada juego más adelante
}

// 4. Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sitio web de Dystra Games cargado correctamente.');

    // Renderizar tarjetas
    renderizarProyectos();

    // Efecto de sombreado en el header al hacer scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg', 'bg-slate-900/90');
        } else {
            header.classList.remove('shadow-lg', 'bg-slate-900/90');
        }
    });
});