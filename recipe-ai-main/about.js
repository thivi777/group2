console.log("About page loaded successfully!");
document.addEventListener("DOMContentLoaded", () => {
    const backBtn = document.querySelector(".back-btn");

    if (backBtn) {
        // Add Click Ripple Animation
        backBtn.addEventListener("click", (e) => {
            backBtn.classList.add("clicked");

            // Optional vibration for mobile
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }

            setTimeout(() => {
                backBtn.classList.remove("clicked");
            }, 300);
        });

        // Fade-in animation
        backBtn.style.opacity = "0";
        setTimeout(() => {
            backBtn.style.opacity = "1";
            backBtn.style.transition = "0.4s";
        }, 150);
    }
});
