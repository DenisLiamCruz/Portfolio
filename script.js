
/* ================== IMAGE SLIDERS ================== */

document.querySelectorAll(".slider-container").forEach((container) => {

    const slider = container.querySelector(".image-container");
    const images = container.querySelectorAll(".slider-image");
    const indicators = container.querySelector(".btn-container");
    const previousButton = container.querySelector(".slider-prev");
    const nextButton = container.querySelector(".slider-next");

    // Evitar errores si el slider no tiene imágenes
    if (!slider || images.length === 0) return;

    let currentImage = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Crear automáticamente un indicador por cada imagen
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
            button.setAttribute(
                "aria-label",
                `View image ${index + 1}`
            );

            button.addEventListener("click", () => {
                showImage(index);
            });

            indicators.appendChild(button);
        });
    }

    const buttons = indicators
        ? indicators.querySelectorAll(".slider-btn")
        : [];

    // Mostrar una imagen específica
    function showImage(index) {
        currentImage = index;

        slider.style.transform =
            `translateX(-${currentImage * 100}%)`;

        buttons.forEach((button, i) => {
            button.classList.toggle(
                "active",
                i === currentImage
            );
        });
    }

    // Imagen siguiente
    function nextImage() {
        showImage((currentImage + 1) % images.length);
    }

    // Imagen anterior
    function previousImage() {
        showImage(
            (currentImage - 1 + images.length) % images.length
        );
    }

    // Eventos de las flechas
    if (nextButton) {
        nextButton.addEventListener("click", nextImage);
    }

    if (previousButton) {
        previousButton.addEventListener("click", previousImage);
    }

    // Deslizamiento táctil en celulares y tablets
    slider.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].screenX;

        const swipeDistance = touchEndX - touchStartX;
        const minimumSwipeDistance = 50;

        if (Math.abs(swipeDistance) < minimumSwipeDistance) {
            return;
        }

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
    menuIcon.onclick = () => {
        navLinks.classList.toggle("active");
    };
}


/* ================== CONTACT FORM ================== */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const formData = new FormData(contactForm);

        // Evitar envíos repetidos mientras se procesa
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        formMessage.textContent = "";
        formMessage.className = "";

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

                formMessage.textContent =
                    "Message sent successfully!";

                formMessage.className = "success";

                contactForm.reset();

            } else {

                formMessage.textContent =
                    "Something went wrong. Please try again.";

                formMessage.className = "error";

            }

        } catch (error) {

            formMessage.textContent =
                "Unable to send your message. Please check your connection and try again.";

            formMessage.className = "error";

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit";
            }

        }

    });

}
