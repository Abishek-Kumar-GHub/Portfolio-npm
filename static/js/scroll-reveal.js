document.addEventListener("DOMContentLoaded", function () {
    const reveals = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, { threshold: 0.1 }); // Only 5% visible to trigger


    reveals.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});
