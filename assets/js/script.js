document.addEventListener("DOMContentLoaded", function () {
    console.log("Website loaded!");

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Hero Slider Functionality
    const slides = document.querySelectorAll(".slide");
    let currentIndex = 0;

    function changeSlide() {
        slides.forEach((slide, index) => {
            slide.style.opacity = "0"; // Hide all slides
            slide.style.transition = "opacity 1s ease-in-out"; // Smooth transition
        });

        slides[currentIndex].style.opacity = "1"; // Show current slide

        currentIndex = (currentIndex + 1) % slides.length; // Move to the next slide
    }

    // Initial slide setup
    slides[currentIndex].style.opacity = "1";

    setInterval(changeSlide, 5000); // Change slide every 5 seconds
});
