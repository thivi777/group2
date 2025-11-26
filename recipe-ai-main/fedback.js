console.log("%c Feedback Form Loaded ", "color:#2cc987; font-size:16px;");

let selectedRating = 0;

// ⭐ STAR RATING SYSTEM
document.querySelectorAll(".stars i").forEach(star => {
    star.addEventListener("click", () => {
        selectedRating = star.dataset.value;

        document.querySelectorAll(".stars i").forEach(s => s.classList.remove("active"));

        for (let i = 0; i < selectedRating; i++) {
            document.querySelectorAll(".stars i")[i].classList.add("active");
        }
    });
});

// 📩 FORM VALIDATION
document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "" || selectedRating === 0) {
        alert("Please fill all fields and give a rating ⭐");
        return;
    }

    alert("Thank you for your feedback! ❤️");
    
    // Reset form
    this.reset();
    document.querySelectorAll(".stars i").forEach(star => star.classList.remove("active"));
    selectedRating = 0;
});
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
