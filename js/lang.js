// lang.js
const languageButtons = document.querySelectorAll(".lang-btn");
let currentLang = "pt";

// Conteúdo traduzido
const translations = {
  pt: {
    navSobre: "Sobre",
    navExperiencia: "Experiência",
    navProjetos: "Projetos",
    navHabilidades: "Habilidades",
    navContato: "Contato",
    navSobreMobile: "Sobre",
    navExperienciaMobile: "Experiência",
    navProjetosMobile: "Projetos",
    navHabilidadesMobile: "Habilidades",
    navContatoMobile: "Contato",

    heroTitle: "Felipe Nunes Reis",
    heroSubtitle: "Analista de Sistemas | Data Analytics | Data Science |",
    heroLead: "Profissional sênior em arquitetura e governança de dados, pipelines ETL/ELT, automações e soluções analíticas. Forte experiência em Python, SQL e Power BI.",
    hireBtn: "Contrate-me",
    downloadCV: "Baixar CV",

    sobreTitle: "Sobre mim",
    sobreP1: "Ao longo da minha trajetória profissional, tive a oportunidade de atuar em diversas áreas dentro da empresa, iniciando pela manufatura e evoluindo de forma natural para o universo da tecnologia.",
    sobreP2: "Com o tempo, aprofundei-me em automações, dados e estratégias de digitalização, sempre com foco em otimizar processos e tornar operações complexas mais inteligentes e eficientes.",
    sobreP3: "Sou um profissional sênior especializado em arquitetura, modelagem e governança de dados para Data Warehouse e Data Lake, com forte atuação na plataforma Microsoft Fabric.",

    experienciaTitle: "Experiência",
    exp1Title: "Analista de Sistemas — Nadir S/A",
    exp1Desc: "Atuação sênior em arquitetura e governança de dados, pipelines analíticos, otimização de ETL/ELT com Python e automações RPA, garantindo alta disponibilidade e qualidade dos dados.",
    exp2Title: "Preparador de Máquinas H-28",
    exp2Desc: "Manutenções, análise de falhas, relatórios operacionais e uso diário de SAP para controle de estoque e processos internos.",
    exp3Title: "Mecânico Ajustador C",
    exp3Desc: "Melhorias em equipamentos com foco em redução de falhas e aumento de produtividade. Formação técnica pelo SENAI.",

    projetosTitle: "Projetos",
    proj1Title: "Recomendador de Música Spotify",
    proj1Desc: "Projeto de sistema de recomendação de músicas utilizando machine learning.",
    proj1Obj: "Objetivo: Melhorar a retenção do usuário e entregar recomendações relevantes.",
    proj2Title: "Dashboard — Fluxo de Caixa",
    proj2Desc: "Dashboard financeiro em PNG com indicadores e visualizações.",
    proj2Obj: "Objetivo: Entregar visibilidade financeira de forma ágil e automatizar a atualização dos relatórios.",

    habilidadesTitle: "Habilidades",
    contatoTitle: "Contato",
    emailTitle: "Email",
    telefoneTitle: "Telefone",
    whatsappTitle: "WhatsApp",
    cvTitle: "Currículo",
    rdTitle: "Redes"
  },
  en: {
    navSobre: "About",
    navExperiencia: "Experience",
    navProjetos: "Projects",
    navHabilidades: "Skills",
    navContato: "Contact",
    navSobreMobile: "About",
    navExperienciaMobile: "Experience",
    navProjetosMobile: "Projects",
    navHabilidadesMobile: "Skills",
    navContatoMobile: "Contact",

    heroTitle: "Felipe Nunes Reis",
    heroSubtitle: "Systems Analyst | Data Analytics | Data Science |",
    heroLead: "Senior professional in data architecture and governance, ETL/ELT pipelines, automation and analytical solutions. Strong experience in Python, SQL, and Power BI.",
    hireBtn: "Hire me",
    downloadCV: "Download CV",

    sobreTitle: "About me",
    sobreP1: "Throughout my professional career, I had the opportunity to work in different areas within the company, starting in manufacturing and naturally evolving into the technology field.",
    sobreP2: "Over time, I specialized in automation, data, and digitalization strategies, always focusing on optimizing processes and making complex operations smarter and more efficient.",
    sobreP3: "I am a senior professional specialized in architecture, modeling, and data governance for Data Warehouse and Data Lake, with strong experience in Microsoft Fabric platform.",

    experienciaTitle: "Experience",
    exp1Title: "Systems Analyst — Nadir S/A",
    exp1Desc: "Senior role in data architecture and governance, analytical pipelines, ETL/ELT optimization with Python and RPA automation, ensuring high availability and data quality.",
    exp2Title: "Machine Setter H-28",
    exp2Desc: "Maintenance, failure analysis, operational reports, and daily use of SAP for inventory and internal process control.",
    exp3Title: "Mechanical Adjuster C",
    exp3Desc: "Equipment improvements focused on reducing failures and increasing productivity. Technical training at SENAI.",

    projetosTitle: "Cases",
    proj1Title: "Spotify Music Recommender",
    proj1Desc: "Project for music recommendation system using machine learning.",
    proj1Obj: "Objective: Improve user retention and deliver relevant recommendations.",
    proj2Title: "Dashboard — Cash Flow",
    proj2Desc: "Financial dashboard in PNG with indicators and visualizations.",
    proj2Obj: "Objective: Deliver financial visibility quickly and automate report updates.",

    habilidadesTitle: "Skills",
    contatoTitle: "Contact",
    emailTitle: "Email",
    telefoneTitle: "Phone",
    whatsappTitle: "WhatsApp",
    cvTitle: "Curriculum",
    rdTitle: "Socials"
  },
  es: {
    navSobre: "Sobre mí",
    navExperiencia: "Experiencia",
    navProjetos: "Proyectos",
    navHabilidades: "Habilidades",
    navContato: "Contacto",
    navSobreMobile: "Sobre mí",
    navExperienciaMobile: "Experiencia",
    navProjetosMobile: "Proyectos",
    navHabilidadesMobile: "Habilidades",
    navContatoMobile: "Contacto",

    heroTitle: "Felipe Nunes Reis",
    heroSubtitle: "Analista de Sistemas | Data Analytics | Data Science |",
    heroLead: "Profesional senior en arquitectura y gobernanza de datos, pipelines ETL/ELT, automatizaciones y soluciones analíticas. Amplia experiencia en Python, SQL y Power BI.",
    hireBtn: "Contrátame",
    downloadCV: "Descargar CV",

    sobreTitle: "Sobre mí",
    sobreP1: "A lo largo de mi trayectoria profesional, tuve la oportunidad de trabajar en diversas áreas dentro de la empresa, comenzando por la manufactura y evolucionando de forma natural hacia el mundo de la tecnología.",
    sobreP2: "Con el tiempo, me especialicé en automatizaciones, datos y estrategias de digitalización, siempre enfocado en optimizar procesos y hacer operaciones complejas más inteligentes y eficientes.",
    sobreP3: "Soy un profesional senior especializado en arquitectura, modelado y gobernanza de datos para Data Warehouse y Data Lake, con amplia experiencia en la plataforma Microsoft Fabric.",

    experienciaTitle: "Experiencia",
    exp1Title: "Analista de Sistemas — Nadir S/A",
    exp1Desc: "Rol senior en arquitectura y gobernanza de datos, pipelines analíticos, optimización de ETL/ELT con Python y automatizaciones RPA, asegurando alta disponibilidad y calidad de los datos.",
    exp2Title: "Preparador de Máquinas H-28",
    exp2Desc: "Mantenimiento, análisis de fallas, reportes operativos y uso diario de SAP para control de inventario y procesos internos.",
    exp3Title: "Mecánico Ajustador C",
    exp3Desc: "Mejoras en equipos enfocadas en reducción de fallas y aumento de productividad. Formación técnica en SENAI.",

    projetosTitle: "Proyectos",
    proj1Title: "Recomendador de Música Spotify",
    proj1Desc: "Proyecto de sistema de recomendación de música utilizando machine learning.",
    proj1Obj: "Objetivo: Mejorar la retención del usuario y entregar recomendaciones relevantes.",
    proj2Title: "Dashboard — Flujo de Caja",
    proj2Desc: "Dashboard financiero en PNG con indicadores y visualizaciones.",
    proj2Obj: "Objetivo: Entregar visibilidad financiera de manera ágil y automatizar la actualización de informes.",

    contatoTitle: "Contacto",
    habilidadesTitle: "Habilidades",
    emailTitle: "Correo electrónico",
    telefoneTitle: "Teléfono",
    whatsappTitle: "WhatsApp",
    cvTitle: "Currículum",
    rdTitle: "Redes"
  }
};

// Função para atualizar o conteúdo
function updateContent(lang) {
  for (const key in translations[lang]) {
    const el = document.getElementById(key);
    if (el) el.textContent = translations[lang][key];
  }
}

// Listener dos botões
languageButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    languageButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentLang = btn.dataset.lang;
    updateContent(currentLang);
  });
});

// Inicializa com idioma padrão
updateContent(currentLang);
