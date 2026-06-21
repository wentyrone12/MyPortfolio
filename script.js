// Dark/Light Mode Toggle
const toggleBtn = document.getElementById("toggleMode");
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggleBtn.textContent = document.body.classList.contains("light-mode") ? "🌙" : "☀️";
});

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close menu on link click
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Skills Progress Animation with number
const progressBars = document.querySelectorAll(".progress");
window.addEventListener("scroll", () => {
    const skillsSection = document.getElementById("skills");
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        progressBars.forEach(bar => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width;
            bar.style.backgroundColor = bar.getAttribute("data-color");
            bar.textContent = width; // show the % inside the bar
        });
    }
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    const isClickInsideMenu = navLinks.contains(e.target);
    const isToggleBtn = menuToggle.contains(e.target);

    if (!isClickInsideMenu && !isToggleBtn) {
        navLinks.classList.remove("active");
    }
});

// ===== EMAILJS SETUP =====
(function () {
    emailjs.init("enAOKJPdomfdmxicm");
})();

document.getElementById("contact-form")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_ctswgbf",
            "template_0ht11m9",
            this
        ).then(() => {
            alert("Message sent successfully!");
        });
    }, (error) => {
        alert("❌ Failed to send.");
        console.log(error);
    });

tsParticles.load("tsparticles", {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
        number: { value: 60 },
        color: { value: "#00ff88" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: { enable: true, speed: 1 }
    }
});

