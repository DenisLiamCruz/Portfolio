const slider = document.querySelector(".image-container");
const images = document.querySelectorAll(".slider-image");
const buttons = document.querySelectorAll(".slider-btn");

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


buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const index = Number(button.dataset.slide);

        showImage(index);

    });

});