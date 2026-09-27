// Portfolio interactions: theme, particles, navigation, skill bars, chart, counters, contact form
const toggleBtn = document.getElementById("toggleMode");
const bgButton = document.getElementById("changeBg");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const particleHost = document.getElementById("tsparticles");
let particleTheme = 0;
let skillChart;

const particleThemes = [
  { count: 65, color: "#00e887", shape: "circle", links: true, speed: 0.8 },
  { count: 150, color: ["#fff", "#a2ffd2", "#7dd3fc"], shape: "star", links: false, speed: 0.2 },
  { count: 80, color: "#7dd3fc", shape: "circle", links: false, speed: 2.5 },
  { count: 100, color: "#00e887", shape: "line", links: false, speed: 3 },
  { count: 80, color: "#b5ffd5", shape: "circle", links: false, speed: 0.5 },
  { count: 55, color: "#f6d365", shape: "circle", links: false, speed: 0.45 }
];

async function loadParticles() {
  if (!window.tsParticles || !particleHost) return;
  const old = tsParticles.dom();
  if (old && old.length) old.forEach(instance => instance.destroy());
  const theme = particleThemes[particleTheme % particleThemes.length];
  await tsParticles.load("tsparticles", {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      number: { value: theme.count, density: { enable: true, area: 900 } },
      color: { value: theme.color },
      shape: { type: theme.shape },
      opacity: { value: { min: 0.12, max: 5 } },
      size: { value: { min: 1, max: 3 } },
      links: { enable: theme.links, distance: 135, opacity: 8, color: "#00e887" },
      move: { enable: true, speed: theme.speed, direction: "none", random: true, outModes: { default: "out" } }
    },
    detectRetina: true
  });
}

toggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  toggleBtn.textContent = isLight ? "☾" : "☼";
  toggleBtn.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  updateChartTheme();
});

bgButton?.addEventListener("click", () => {
  particleTheme = (particleTheme + 1) % particleThemes.length;
  loadParticles();
});

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuToggle.textContent = open ? "×" : "☰";
});
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});
document.addEventListener("click", event => {
  if (!navLinks?.contains(event.target) && !menuToggle?.contains(event.target)) {
    navLinks?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.textContent = "☰";
  }
});

const skillSection = document.getElementById("skills");
let skillsAnimated = false;
function animateSkills() {
  if (skillsAnimated || !skillSection) return;
  const bounds = skillSection.getBoundingClientRect();
  if (bounds.top < window.innerHeight - 80) {
    skillsAnimated = true;
    document.querySelectorAll(".progress").forEach(bar => {
      bar.style.width = bar.dataset.width || "0%";
    });
  }
}
window.addEventListener("scroll", animateSkills, { passive: true });
animateSkills();

const counterTargets = { projects: 10, clients: 8, languages: 13, experience: 4 };
function animateCounter(id, target) {
  const node = document.getElementById(id);
  if (!node) return;
  const duration = 1000;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    node.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const stats = document.querySelector(".stats-grid");
if (stats && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      Object.entries(counterTargets).forEach(([id, value]) => animateCounter(id, value));
      observer.disconnect();
    }
  }, { threshold: 0.25 });
  observer.observe(stats);
} else {
  Object.entries(counterTargets).forEach(([id, value]) => animateCounter(id, value));
}

const chartCanvas = document.getElementById("skillChart");
if (chartCanvas && window.Chart) {
  skillChart = new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: ["2022", "2023", "2024", "2025", "2026"],
      datasets: [{
        label: "Learning progress (illustrative)",
        data: [18, 40, 62, 82, 95],
        borderColor: "#00e887",
        backgroundColor: "rgba(0,232,135,.10)",
        fill: true,
        tension: .38,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: getComputedStyle(document.body).getPropertyValue("--text").trim() } } },
      scales: {
        x: { ticks: { color: "#a4b4aa" }, grid: { color: "rgba(150,170,155,.10)" } },
        y: { min: 0, max: 100, ticks: { color: "#a4b4aa", stepSize: 25 }, grid: { color: "rgba(150,170,155,.10)" } }
      }
    }
  });
}
function updateChartTheme() {
  if (!skillChart) return;
  const textColor = getComputedStyle(document.body).getPropertyValue("--text").trim();
  skillChart.options.plugins.legend.labels.color = textColor;
  skillChart.update();
}

// EmailJS settings below are kept from your original project.
// Keep these IDs private if you later replace them with a server-side contact endpoint.
if (window.emailjs) {
  emailjs.init("enAOKJPdomfdmxicm");
}
const contactForm = document.getElementById("contact-form");
contactForm?.addEventListener("submit", async event => {
  event.preventDefault();
  const status = document.getElementById("form-status");
  const submit = contactForm.querySelector('button[type="submit"]');
  if (!window.emailjs) {
    status.textContent = "Email service did not load. Please try again later.";
    return;
  }
  submit.disabled = true;
  submit.textContent = "Sending…";
  status.textContent = "";
  try {
    await emailjs.sendForm("service_ctswgbf", "template_0ht11m9", contactForm);
    status.textContent = "Thanks! Your message was sent successfully.";
    contactForm.reset();
  } catch (error) {
    status.textContent = "Sorry, the message could not be sent. Please try again.";
    console.error("EmailJS error:", error);
  } finally {
    submit.disabled = false;
    submit.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
  }
});


document.addEventListener("contextmenu", function(e){
  e.preventDefault();
});


document.addEventListener("keydown", function(e){
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    (e.ctrlKey && e.shiftKey && e.key === "J") ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});

loadParticles();
