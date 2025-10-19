const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.18,
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".reveal-on-scroll").forEach((element) => {
    revealObserver.observe(element);
});

const navLinks = Array.from(document.querySelectorAll('.landing-link[href^="#"]'));

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href")?.replace(/^[#]/, "");

        if (!targetId) {
            return;
        }

        const section = document.getElementById(targetId);
        if (!section) {
            return;
        }

        event.preventDefault();
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const hero = document.querySelector(".hero");
const floaters = document.querySelectorAll(".hero-floating span");
let motionRAF = 0;

function animateHeroPointer(event) {
    if (!hero) {
        return;
    }

    const rect = hero.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;

    cancelAnimationFrame(motionRAF);
    motionRAF = requestAnimationFrame(() => {
        hero.style.setProperty("--pointer-x", relX.toFixed(3));
        hero.style.setProperty("--pointer-y", relY.toFixed(3));

        floaters.forEach((floater, index) => {
            const intensity = 14 + index * 6;
            const translateX = (relX - 0.5) * intensity;
            const translateY = (relY - 0.5) * intensity;
            floater.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        });
    });
}

function resetHeroPointer() {
    cancelAnimationFrame(motionRAF);
    hero?.style.removeProperty("--pointer-x");
    hero?.style.removeProperty("--pointer-y");

    floaters.forEach((floater) => {
        floater.style.transform = "translate3d(0, 0, 0)";
    });
}

if (hero) {
    hero.addEventListener("pointermove", animateHeroPointer);
    hero.addEventListener("pointerleave", resetHeroPointer);
}

const backTopLink = document.querySelector(".back-top");

if (backTopLink) {
    backTopLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

if (prefersReducedMotion()) {
    document.documentElement.classList.add("reduce-motion");
    floaters.forEach((floater) => {
        floater.style.animationDuration = "0s";
    });
}
