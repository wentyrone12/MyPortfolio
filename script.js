// Dark/Light Mode Toggle

const toggleBtn = document.getElementById("toggleMode");
const bgButton = document.getElementById("changeBg");
toggleBtn.addEventListener("click", async () => {

    await changeParticleTheme(() => {

        document.body.classList.toggle("light-mode");

        toggleBtn.textContent =
            document.body.classList.contains("light-mode")
                ? "🌙"
                : "☀️";

        loadParticles();

        updateChartTheme();

    });

});

let particleTheme = 0;

bgButton.addEventListener("click", async () => {

    await changeParticleTheme(() => {

        particleTheme++;

        if (particleTheme > 13)
            particleTheme = 0;

        loadParticles();

    });

});


document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

document.addEventListener("keydown", function (e) {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "U")
    ) {
        e.preventDefault();
    }
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

async function changeParticleTheme(callback) {

    const bg = document.getElementById("tsparticles");

    bg.classList.add("fade");

    await new Promise(r => setTimeout(r, 700));

    await tsParticles.dom().forEach(p => p.destroy());

    callback();

    await new Promise(r => setTimeout(r, 150));

    bg.classList.remove("fade");

}

function loadParticles() {

    const backgrounds = [

        "linear-gradient(135deg,#000000,#071b2f)",

        "linear-gradient(135deg,#020024,#090979,#00d4ff)",

        "linear-gradient(135deg,#050816,#120024)",

        "linear-gradient(135deg,#07140a,#001000)",

        "linear-gradient(135deg,#001f3f,#003366)",

        "linear-gradient(135deg,#120024,#39004d)",

        "linear-gradient(135deg,#000000,#0f172a)",

        "linear-gradient(135deg,#141000,#302300)",

        "linear-gradient(135deg,#02111d,#00334d)",

        "linear-gradient(135deg,#1e293b,#0f172a)",

        "linear-gradient(135deg,#220022,#000000)",

        "linear-gradient(135deg,#001122,#000814)",

        "linear-gradient(135deg,#150030,#020617)",

        "linear-gradient(135deg,#000814,#050816)"

    ];

    document.body.style.transition = "background 1s ease";
    document.body.style.background = backgrounds[particleTheme];


    const isLight = document.body.classList.contains("light-mode");

    const lightColors = [

        "#2563eb",
        "#9333ea",
        "#06b6d4",
        "#ec4899",
        "#0f766e",
        "#2563eb",
        "#dc2626",
        "#ea580c",
        "#0891b2",
        "#7c3aed",
        "#0f766e",
        "#4338ca",
        "#db2777",
        "#ca8a04"

    ];

    const darkColors = [

        "#00ff88",
        "#7dd3fc",
        "#ffffff",
        "#80d8ff",
        "#ffffff",
        "#ffd54f",
        "#00ffcc",
        "#00ff00",
        "#ff9ecb",
        "#ffffff",
        "#4FC3F7",
        "#9be7ff",
        "#9C27B0",
        "#FFD54F"

    ];

    // 0 Green Network
    const themes = [

        // 0 Green Network
        {
            number: 70,
            color: isLight ? "#000000" : "#00ff88",
            shape: "circle",
            links: true,
            speed: 1.2,
            size: { min: 2, max: 5 }
        },

        // 1 Galaxy
        {
            number: 220,
            color: ["#ffffff", "#7dd3fc", "#8b5cf6"],
            shape: "star",
            links: false,
            speed: 0.15,
            size: { min: 1, max: 3 },
            background: "#050816"
        },

        // 2 Meteor Shower
        {
            number: 90,
            color: "#797676",
            shape: "circle",
            links: false,
            speed: 12,
            direction: "bottom-right",
            size: { min: 1, max: 4 },
            trails: true,
            background: "#000814"
        },

        // 3 Rain
        {
            number: 350,
            color: "#80d8ff",
            shape: "line",
            links: false,
            speed: 18,
            direction: "bottom",
            size: { min: 8, max: 18 },
            background: "#111827"
        },

        // 4 Snow
        {
            number: 180,
            color: "#ffffff",
            shape: "circle",
            links: false,
            speed: 1,
            direction: "bottom",
            size: { min: 2, max: 7 },
            background: "#0f172a"
        },

        // 5 Fireflies
        {
            number: 70,
            color: "#ffd54f",
            shape: "circle",
            links: false,
            speed: .6,
            size: { min: 2, max: 6 },
            background: "#07140a"
        },

        // 6 Aurora
        {
            number: 120,
            color: ["#00ffcc", "#00bfff", "#8a2be2", "#00ff88"],
            shape: "circle",
            links: false,
            speed: .25,
            size: {
                min: 2,
                max: 8
            },
            background: "#02111d"
        },

        // 7 Matrix Rain
        {
            number: 260,
            color: "#00ff00",
            shape: "square",
            links: false,
            speed: 8,
            direction: "bottom",
            size: {
                min: 2,
                max: 5
            },
            background: "#000000",
            trails: true
        },
        // 9 Shooting Stars
        {
            number: 140,
            color: "#ffffff",
            shape: "star",
            links: false,
            speed: 9,
            direction: "top-right",
            size: {
                min: 1,
                max: 4
            },
            background: "#000814",
            trails: true
        },

        //10 Ocean
        {
            number: 180,
            color: ["#4FC3F7", "#29B6F6", "#81D4FA"],
            shape: "circle",
            links: false,
            speed: .8,
            size: {
                min: 3,
                max: 9
            },
            background: "#001f3f"
        },

        //11 Crystal
        {
            number: 120,
            color: ["#9be7ff", "#b388ff", "#ffffff"],
            shape: "polygon",
            links: true,
            speed: .6,
            size: {
                min: 3,
                max: 8
            },
            background: "#050816"
        },

        //12 Purple Nebula
        {
            number: 250,
            color: ["#9C27B0", "#673AB7", "#2196F3", "#ffffff"],
            shape: "circle",
            links: false,
            speed: .2,
            size: {
                min: 1,
                max: 6
            },
            background: "#120024"
        },

        //13 Golden Glow
        {
            number: 140,
            color: ["#FFD54F", "#FFF176", "#ffffff"],
            shape: "circle",
            links: false,
            speed: .45,
            size: {
                min: 2,
                max: 8
            },
            background: "#141000"
        },

    ];

    themes.forEach((theme, index) => {

        theme.color = isLight
            ? lightColors[index]
            : darkColors[index];

    });


    const t = themes[particleTheme];

    tsParticles.load("tsparticles", {

        fullScreen: {
            enable: true,
            zIndex: -1
        },

        background: {
            color: {
                value: t.background || "transparent"
            }
        },
        particles: {

            number: {
                value: t.number
            },

            color: {
                value: t.color
            },

            shape: {

                type: t.shape,

                options: {

                    polygon: {
                        sides: 6
                    }

                }

            },

            opacity: {

                value: {
                    min: 0.3,
                    max: 0.9
                },

                animation: {

                    enable: true,
                    speed: 1

                }

            },

            size: {

                value: t.size,

                animation: {

                    enable: true,
                    speed: 2,
                    minimumValue: 1

                }

            },

            move: {

                enable: true,

                speed: t.speed,

                direction: t.direction || "none",

                random: true,

                straight: t.trails || false,

                angle: {
                    offset: 0,
                    value: 15
                },

                attract: {
                    enable: false
                },

                outModes: {
                    default: "out"
                }

            },

            links: {

                enable: t.links,

                color: Array.isArray(t.color)
                    ? t.color[0]
                    : t.color,

                distance: 150,

                opacity: .35

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