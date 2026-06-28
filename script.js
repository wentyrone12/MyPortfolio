// Dark/Light Mode Toggle
const toggleBtn = document.getElementById("toggleMode");
toggleBtn.addEventListener("click", async () => {

    document.body.classList.toggle("light-mode");

    toggleBtn.textContent =
        document.body.classList.contains("light-mode")
            ? "🌙"
            : "☀️";

    await tsParticles.dom().forEach(p => p.destroy());

    loadParticles();

    updateChartTheme();

});


document.addEventListener("contextmenu", function(e){
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

function loadParticles() {

    const isLight = document.body.classList.contains("light-mode");

    tsParticles.load("tsparticles", {

        fullScreen: {
            enable: true,
            zIndex: -1
        },

        background: {
            color: {
                value: "transparent"
            }
        },

        particles: {

            number: {
                value: 70
            },

            color: {
                value: isLight ? "#000000" : "#00ff88"
            },

            links: {
                enable: true,
                color: isLight ? "#000000" : "#00ff88",
                distance: 150,
                opacity: 0.35
            },

            shape: {
                type: "circle"
            },

            opacity: {
                value: 0.5
            },

            size: {
                value: {
                    min: 2,
                    max: 5
                }
            },

            move: {
                enable: true,
                speed: 1.2
            }

        }

    });

}

loadParticles();


const ctx = document.getElementById("skillChart");
let skillChart;

if (ctx) {

    skillChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: ["2022", "2023", "2024", "2025", "2026"],

            datasets: [{

                label: "Programming Growth",

                data: [18, 40, 62, 82, 95],

                borderColor: "#7dd3fc",
                backgroundColor: "rgba(125,211,252,.25)",

                fill: true,
                tension: .45,
                pointRadius: 5,
                pointHoverRadius: 8

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    labels: {
                        color: "#ffffff"
                    }

                }

            },

            scales: {

                x: {

                    ticks: {
                        color: "#ffffff"
                    },

                    grid: {
                        color: "#444"
                    }

                },

                y: {

                    ticks: {
                        color: "#ffffff"
                    },

                    grid: {
                        color: "#444"
                    }

                }

            }

        }

    });

}

function updateChartTheme() {

    if (!skillChart) return;

    const isLight = document.body.classList.contains("light-mode");

    const lineColor = isLight ? "#1e3a8a" : "#7dd3fc";
    const fillColor = isLight
        ? "rgba(30,58,138,.20)"
        : "rgba(125,211,252,.25)";

    const textColor = isLight ? "#111827" : "#ffffff";
    const gridColor = isLight
        ? "rgba(0,0,0,.12)"
        : "rgba(255,255,255,.12)";

    skillChart.data.datasets[0].borderColor = lineColor;
    skillChart.data.datasets[0].backgroundColor = fillColor;

    skillChart.options.plugins.legend.labels.color = textColor;

    skillChart.options.scales.x.ticks.color = textColor;
    skillChart.options.scales.y.ticks.color = textColor;

    skillChart.options.scales.x.grid.color = gridColor;
    skillChart.options.scales.y.grid.color = gridColor;

    skillChart.update();

}

function counter(id, end) {

    let n = 0;

    let interval = setInterval(() => {

        n++;

        document.getElementById(id).innerHTML = n;

        if (n >= end)

            clearInterval(interval);

    }, 40);

}

counter("projects", 10);

counter("clients", 8);

counter("languages", 9);

counter("experience", 4);