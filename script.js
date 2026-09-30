const slider = document.querySelector(".image-container");
const images = document.querySelectorAll(".slider-image");
const buttons = document.querySelectorAll(".slider-btn");

const previousButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");

let currentImage = 0;


function showImage(index) {

    currentImage = index;

    slider.style.transform = `translateX(-${currentImage * 100}%)`;

    buttons.forEach((button, i) => {

        button.classList.toggle(
            "active",
            i === currentImage
        );

    });
}


function nextImage() {

    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    showImage(currentImage);
}


function previousImage() {

    currentImage--;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    showImage(currentImage);
}


buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const index = Number(button.dataset.slide);

        showImage(index);

    });

});


nextButton.addEventListener("click", nextImage);

previousButton.addEventListener("click", previousImage);

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

});


slider.addEventListener("touchend", (event) => {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

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

}

const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const formData = new FormData(contactForm);

    try {

        const response = await fetch("https://formspree.io/f/xzezwaby", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {

            formMessage.textContent = "Message sent successfully!";
            formMessage.className = "success";

            contactForm.reset();

        } else {

            formMessage.textContent = "Something went wrong. Please try again.";
            formMessage.className = "error";

        }

    } catch (error) {

        formMessage.textContent = "Something went wrong. Please try again.";
        formMessage.className = "error";

    }

});