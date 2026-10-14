
/* ================== IMAGE SLIDERS ================== */

document.querySelectorAll(".slider-container").forEach((container) => {
    const slider = container.querySelector(".image-container");
    const images = container.querySelectorAll(".slider-image");
    const indicators = container.querySelector(".btn-container");
    const previousButton = container.querySelector(".slider-prev");
    const nextButton = container.querySelector(".slider-next");

    if (!slider || images.length === 0) return;

    let currentImage = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Crear un indicador por cada imagen
    if (indicators) {
        indicators.innerHTML = "";

        images.forEach((image, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.classList.add("slider-btn");

            if (index === 0) {
                button.classList.add("active");
            }

            button.dataset.slide = index;
            button.setAttribute("aria-label", `View image ${index + 1}`);

            button.addEventListener("click", () => {
                showImage(index);
            });

            indicators.appendChild(button);
        });
    }

    const buttons = indicators
        ? indicators.querySelectorAll(".slider-btn")
        : [];

    function showImage(index) {
        currentImage = index;

        slider.style.transform =
            `translateX(-${currentImage * 100}%)`;

        buttons.forEach((button, i) => {
            button.classList.toggle("active", i === currentImage);
        });
    }

    function nextImage() {
        showImage((currentImage + 1) % images.length);
    }

    function previousImage() {
        showImage(
            (currentImage - 1 + images.length) % images.length
        );
    }

    if (nextButton) {
        nextButton.addEventListener("click", nextImage);
    }

    if (previousButton) {
        previousButton.addEventListener("click", previousImage);
    }

    // Deslizamiento táctil
    slider.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].screenX;

        const swipeDistance = touchEndX - touchStartX;
        const minimumSwipeDistance = 50;

        if (Math.abs(swipeDistance) < minimumSwipeDistance) return;

        if (swipeDistance < 0) {
            nextImage();
        } else {
            previousImage();
        }
    }, { passive: true });
});


/* ================== MOBILE MENU ================== */

const menuIcon = document.querySelector("#menu-icon");
const navLinks = document.querySelector(".nav-links");

if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}


/* ================== TRANSLATIONS ================== */

const translations = {
    es: {
        navAboutMe: "Sobre mí",
        navGames: "Juegos",
        nav3DWorks: "Trabajos 3D",
        navPixelArt: "Pixel Art",
        contact: "Contacto",

        saludo: "Hola, soy",
        detalles: "Desarrollador de videojuegos / Artista / Programador",

        gamesTitle1: "Unarmed to the bone",
        gamesSubtitle1: "Ganador de b3agz Game Jam 2024",
        gamesDescription1: "Desarrollado en solitario",

        gamesTitle2: "Project Pharus",
        gamesSubtitle2: "Participante de la EVA 2026",
        gamesDescription2: "Artista 3D y animador",

        gamesTitle3: "Rápido y Carpinchoso",
        gamesSubtitle3: "Ganador de la BA Game Jam C40",
        gamesDescription3: "Único programador",

        threeDTitle: "Trabajos 3D",
        donutTitle: "Dona y copa",
        pixelartTitle: "Personajes 32x32",

        contactTitle: "Contáctame",
        emailPlaceholder: "ejemplo@tuCorreo.com",
        messagePlaceholder: "Escribe tu mensaje",

        submit: "Enviar",
        downloadCV: "Descargar CV",
        instagramPost: "Publicación de Instagram",

        footerCopyright: "© 2026 Denis Cruz. Todos los derechos reservados.",

        sending: "Enviando...",
        success: "¡Mensaje enviado correctamente!",
        error: "Ocurrió un error. Inténtalo de nuevo.",
        connectionError: "No se pudo enviar el mensaje. Comprueba tu conexión e inténtalo de nuevo."
    },

    en: {
        navAboutMe: "About Me",
        navGames: "Games",
        nav3DWorks: "3D Works",
        navPixelArt: "Pixel Art",
        contact: "Contact",

        saludo: "Hi, I'm",
        detalles: "Game Developer / Artist / Programmer",

        gamesTitle1: "Unarmed to the bone",
        gamesSubtitle1: "Winner of the b3agz Game Jam 2024",
        gamesDescription1: "Solo Developed",

        gamesTitle2: "Project Pharus",
        gamesSubtitle2: "Participant in EVA 2026",
        gamesDescription2: "3D Artist and Animator",

        gamesTitle3: "Rapido y Carpinchoso",
        gamesSubtitle3: "Winner of the BA Game Jam C40",
        gamesDescription3: "Sole Programmer",

        threeDTitle: "3D Works",
        donutTitle: "Donut and Glass",
        pixelartTitle: "32x32 Characters",

        contactTitle: "Contact Me",
        emailPlaceholder: "example@yourEmail.com",
        messagePlaceholder: "Write your message",

        submit: "Submit",
        downloadCV: "Download CV",
        instagramPost: "Instagram Post",

        footerCopyright: "© 2026 Denis Cruz. All rights reserved.",

        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Something went wrong. Please try again.",
        connectionError: "Unable to send your message. Please check your connection and try again."
    }
};


/* ================== LANGUAGE SYSTEM ================== */

let currentLanguage = "es";
let isSubmitting = false;

function setLanguage(language) {
    if (!translations[language]) return;

    currentLanguage = language;

    // Traducir textos
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        const translation = translations[language][key];

        if (translation !== undefined) {
            element.textContent = translation;
        }
    });

    // Traducir placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.dataset.i18nPlaceholder;
        const translation = translations[language][key];

        if (translation !== undefined) {
            element.placeholder = translation;
        }
    });

    // Cambiar CV según el idioma
    const cvLink = document.getElementById("cv-download");

    if (cvLink) {
        cvLink.href = language === "es"
            ? "CV-DenisLiamCruz.pdf"
            : "Resume-DenisLiamCruz.pdf";

        cvLink.setAttribute("download", "");
    }

    // Actualizar botones de idioma
    const spanishButton = document.getElementById("lang-es");
    const englishButton = document.getElementById("lang-en");

    if (spanishButton) {
        spanishButton.classList.toggle("active", language === "es");
        spanishButton.setAttribute(
            "aria-pressed",
            String(language === "es")
        );
    }

    if (englishButton) {
        englishButton.classList.toggle("active", language === "en");
        englishButton.setAttribute(
            "aria-pressed",
            String(language === "en")
        );
    }

    // Actualizar el idioma del documento
    document.documentElement.lang = language;

    // Traducir los textos accesibles de los sliders
    document.querySelectorAll(".slider-container").forEach((container) => {
        container.querySelectorAll(".slider-btn").forEach((button, index) => {
            button.setAttribute(
                "aria-label",
                language === "es"
                    ? `Ver imagen ${index + 1}`
                    : `View image ${index + 1}`
            );
        });

        const previous = container.querySelector(".slider-prev");
        const next = container.querySelector(".slider-next");

        if (previous) {
            previous.setAttribute(
                "aria-label",
                language === "es" ? "Imagen anterior" : "Previous image"
            );
        }

        if (next) {
            next.setAttribute(
                "aria-label",
                language === "es" ? "Imagen siguiente" : "Next image"
            );
        }
    });

    // Actualizar el mensaje del formulario si ya hay uno
    const formMessage = document.getElementById("form-message");

    if (formMessage && formMessage.dataset.messageKey) {
        const messageKey = formMessage.dataset.messageKey;

        formMessage.textContent =
            translations[language][messageKey] || "";
    }

    // Actualizar el botón de envío
    const submitButton = document.querySelector(
        '#contact-form button[type="submit"]'
    );

    if (submitButton) {
        submitButton.textContent = isSubmitting
            ? translations[language].sending
            : translations[language].submit;
    }
}

// Eventos de los botones de idioma
document.getElementById("lang-es")?.addEventListener("click", () => {
    setLanguage("es");
});

document.getElementById("lang-en")?.addEventListener("click", () => {
    setLanguage("en");
});


/* ================== CONTACT FORM ================== */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Evitar envíos repetidos
        if (isSubmitting) return;

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const formData = new FormData(contactForm);

        isSubmitting = true;

        if (submitButton) {
            submitButton.disabled = true;
        }

        // Limpiar mensajes anteriores
        formMessage.textContent = "";
        formMessage.className = "";
        delete formMessage.dataset.messageKey;

        setLanguage(currentLanguage);

        try {
            const response = await fetch(
                "https://formspree.io/f/xzezwaby",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (response.ok) {
                formMessage.dataset.messageKey = "success";
                formMessage.className = "success";
                formMessage.textContent =
                    translations[currentLanguage].success;

                contactForm.reset();
            } else {
                formMessage.dataset.messageKey = "error";
                formMessage.className = "error";
                formMessage.textContent =
                    translations[currentLanguage].error;
            }
        } catch (error) {
            formMessage.dataset.messageKey = "connectionError";
            formMessage.className = "error";
            formMessage.textContent =
                translations[currentLanguage].connectionError;
        } finally {
            isSubmitting = false;

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent =
                    translations[currentLanguage].submit;
            }
        }
    });
}


/* ================== INITIAL LANGUAGE ================== */

// Español es el idioma inicial
setLanguage("es");
