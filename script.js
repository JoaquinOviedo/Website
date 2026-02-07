const themeToggle = document.getElementById('theme-toggle');
const paletteSelect = document.getElementById('palette-select');
const langToggle = document.getElementById('lang-toggle');
const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project');

const translations = {
    es: {
        name: 'Joaquín Oviedo',
        role: 'Desarrollador Full-Stack',
        'nav.home': 'Inicio',
        'nav.about': 'Sobre mí',
        'nav.portfolio': 'Portafolio',
        'nav.resume': 'Currículum',
        'nav.contact': 'Contacto',
        'actions.theme': 'Modo claro',
        'actions.palette': 'Paleta',
        'hero.eyebrow': 'Disponible para nuevas oportunidades',
        'hero.title': 'Construyo productos digitales con estética neon, foco en UX y rendimiento.',
        'hero.subtitle': 'Diseño y desarrollo experiencias web para marcas y startups que buscan destacar con identidad propia.',
        'hero.ctaPrimary': 'Ver portafolio',
        'hero.ctaSecondary': 'Hablemos',
        'hero.stats.projects': 'Proyectos destacados',
        'hero.stats.years': 'Años de experiencia',
        'hero.stats.tech': 'Tecnologías',
        'hero.cardTitle': 'Stack principal',
        'hero.cardText': 'Trabajo con sistemas de diseño escalables, micro-interacciones y arquitectura limpia.',
        'about.title': 'Sobre mí',
        'about.subtitle': 'Me especializo en crear interfaces memorables y productos con foco en negocio.',
        'about.storyTitle': 'Historia profesional',
        'about.storyText': 'He liderado proyectos web para startups y empresas, desde la investigación UX hasta el despliegue. Me enfoco en convertir objetivos de negocio en experiencias claras.',
        'about.valueTitle': 'Lo que aporto',
        'about.value1': 'Arquitectura frontend escalable',
        'about.value2': 'Colaboración con diseño y producto',
        'about.value3': 'Implementación de sistemas de diseño',
        'about.value4': 'Optimización de performance',
        'about.goalTitle': 'Objetivo actual',
        'about.goalText': 'Busco integrarme a un equipo internacional donde pueda aportar visión de producto y ejecutar soluciones end-to-end.',
        'portfolio.title': 'Portafolio',
        'portfolio.subtitle': 'Cada proyecto incluye tecnologías clave y enlaces a su página dedicada.',
        'portfolio.filterAll': 'Todos',
        'portfolio.typeApp': 'App fintech',
        'portfolio.typePlatform': 'Plataforma HR',
        'portfolio.typeBrand': 'Brand site',
        'portfolio.typeEcommerce': 'E-commerce',
        'portfolio.typeSaas': 'SaaS',
        'portfolio.typeResume': 'CV interactivo',
        'portfolio.neonFinance': 'Dashboard financiero con visualizaciones en tiempo real y onboarding inteligente.',
        'portfolio.talentFlow': 'Portal para recruiters con flujo de entrevistas automatizado y analytics.',
        'portfolio.pulseStudio': 'Sitio de marca con narrativa visual, micro-interacciones y SEO optimizado.',
        'portfolio.atlasCommerce': 'Marketplace modular con checkout rápido y panel de control.',
        'portfolio.orbitOps': 'Suite de operaciones con paneles personalizables y flujos colaborativos.',
        'portfolio.glowResume': 'Currículum digital con storytelling y secciones configurables.',
        'portfolio.viewProject': 'Ver proyecto',
        'resume.title': 'Currículum',
        'resume.subtitle': 'Experiencia, educación y logros clave.',
        'resume.expTitle': 'Experiencia',
        'resume.exp1': 'Diseño de sistema UI modular y migración a arquitectura basada en componentes.',
        'resume.exp2': 'Integración de prototipos de Figma a producción con métricas de uso.',
        'resume.eduTitle': 'Educación',
        'resume.edu1': 'Especialización en arquitectura web y diseño centrado en el usuario.',
        'resume.edu2': 'Investigación, prototipado y validación de producto.',
        'resume.skillsTitle': 'Tecnologías',
        'contact.title': 'Contacto',
        'contact.subtitle': '¿Quieres hablar sobre un proyecto o propuesta laboral?',
        'contact.emailLabel': 'Email',
        'contact.locationLabel': 'Ubicación',
        'contact.location': 'Buenos Aires, AR · Remoto global',
        'contact.cta': 'Escríbeme',
        'contact.ctaPortfolio': 'Ver portafolio'
    },
    en: {
        name: 'Joaquín Oviedo',
        role: 'Full-Stack Developer',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.portfolio': 'Portfolio',
        'nav.resume': 'Resume',
        'nav.contact': 'Contact',
        'actions.theme': 'Light mode',
        'actions.palette': 'Palette',
        'hero.eyebrow': 'Open to new opportunities',
        'hero.title': 'I build neon-inspired digital products focused on UX and performance.',
        'hero.subtitle': 'I design and develop web experiences for brands and startups that want a bold identity.',
        'hero.ctaPrimary': 'View portfolio',
        'hero.ctaSecondary': 'Let’s talk',
        'hero.stats.projects': 'Featured projects',
        'hero.stats.years': 'Years of experience',
        'hero.stats.tech': 'Technologies',
        'hero.cardTitle': 'Core stack',
        'hero.cardText': 'I work with scalable design systems, micro-interactions, and clean architecture.',
        'about.title': 'About',
        'about.subtitle': 'I specialize in memorable interfaces and business-focused products.',
        'about.storyTitle': 'Professional story',
        'about.storyText': 'I have led web projects for startups and companies, from UX research to delivery. I turn business goals into clear experiences.',
        'about.valueTitle': 'What I bring',
        'about.value1': 'Scalable frontend architecture',
        'about.value2': 'Collaboration with design and product',
        'about.value3': 'Design system implementation',
        'about.value4': 'Performance optimization',
        'about.goalTitle': 'Current goal',
        'about.goalText': 'I am looking to join a global team where I can bring product vision and execute end-to-end solutions.',
        'portfolio.title': 'Portfolio',
        'portfolio.subtitle': 'Each project includes key technologies and a dedicated page.',
        'portfolio.filterAll': 'All',
        'portfolio.typeApp': 'Fintech app',
        'portfolio.typePlatform': 'HR platform',
        'portfolio.typeBrand': 'Brand site',
        'portfolio.typeEcommerce': 'E-commerce',
        'portfolio.typeSaas': 'SaaS',
        'portfolio.typeResume': 'Interactive resume',
        'portfolio.neonFinance': 'Financial dashboard with real-time visuals and smart onboarding.',
        'portfolio.talentFlow': 'Recruiter portal with automated interview flow and analytics.',
        'portfolio.pulseStudio': 'Brand site with visual storytelling, micro-interactions, and SEO.',
        'portfolio.atlasCommerce': 'Modular marketplace with fast checkout and admin panel.',
        'portfolio.orbitOps': 'Operations suite with customizable panels and collaborative flows.',
        'portfolio.glowResume': 'Digital resume with storytelling and configurable sections.',
        'portfolio.viewProject': 'View project',
        'resume.title': 'Resume',
        'resume.subtitle': 'Experience, education, and key achievements.',
        'resume.expTitle': 'Experience',
        'resume.exp1': 'Designed a modular UI system and migrated to component-based architecture.',
        'resume.exp2': 'Integrated Figma prototypes into production with usage metrics.',
        'resume.eduTitle': 'Education',
        'resume.edu1': 'Specialized in web architecture and user-centered design.',
        'resume.edu2': 'Research, prototyping, and product validation.',
        'resume.skillsTitle': 'Technologies',
        'contact.title': 'Contact',
        'contact.subtitle': 'Want to talk about a project or job opportunity?',
        'contact.emailLabel': 'Email',
        'contact.locationLabel': 'Location',
        'contact.location': 'Buenos Aires, AR · Remote worldwide',
        'contact.cta': 'Email me',
        'contact.ctaPortfolio': 'View portfolio'
    }
};

const state = {
    lang: 'es',
    theme: 'dark',
    palette: 'blue'
};

const applyTranslations = () => {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (translations[state.lang][key]) {
            el.textContent = translations[state.lang][key];
        }
    });

    themeToggle.textContent = state.theme === 'dark'
        ? translations[state.lang]['actions.theme']
        : state.lang === 'es'
            ? 'Modo oscuro'
            : 'Dark mode';

    langToggle.textContent = state.lang === 'es' ? 'EN' : 'ES';
};

const setTheme = (theme) => {
    state.theme = theme;
    document.body.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    applyTranslations();
};

const setPalette = (palette) => {
    state.palette = palette;
    document.body.setAttribute('data-palette', palette);
};

const setLanguage = (lang) => {
    state.lang = lang;
    document.documentElement.lang = lang;
    applyTranslations();
};

const filterProjects = (filter) => {
    projects.forEach((project) => {
        const tech = project.dataset.tech || '';
        const matches = filter === 'all' || tech.split(',').includes(filter);
        project.style.display = matches ? 'flex' : 'none';
    });
};

themeToggle.addEventListener('click', () => {
    setTheme(state.theme === 'dark' ? 'light' : 'dark');
});

paletteSelect.addEventListener('change', (event) => {
    setPalette(event.target.value);
});

langToggle.addEventListener('click', () => {
    setLanguage(state.lang === 'es' ? 'en' : 'es');
});

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('is-active'));
        button.classList.add('is-active');
        filterProjects(button.dataset.filter);
    });
});

applyTranslations();
