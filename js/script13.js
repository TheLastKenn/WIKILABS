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

// Formats inline math spans so hero equations preserve readable notation.
const escapeHtml = (value) => (value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const buildFraction = (numerator, denominator) => `<span class="math-frac"><span class="math-frac-num">${numerator}</span><span class="math-frac-bar"></span><span class="math-frac-den">${denominator}</span></span>`;

const formatMathMarkup = (value) => {
    let html = escapeHtml(value);

    html = html.replace(/\\frac\s*\{([^}]+)\}\s*\{([^}]+)\}/g, (_, numerator, denominator) =>
        buildFraction(numerator.trim(), denominator.trim()));

    html = html.replace(/([A-Za-zÁÉÍÓÚáéíóúÑñ0-9)\]])\^\{([^}]+)\}/g, (_, base, exponent) =>
        `${base}<sup>${exponent}</sup>`);

    html = html.replace(/([A-Za-zÁÉÍÓÚáéíóúÑñ0-9)\]])\^(-?\d+)/g, (_, base, exponent) =>
        `${base}<sup>${exponent}</sup>`);

    html = html.replace(/\\cdot/g, '·');
    html = html.replace(/\\times/g, '×');

    return html;
};

const upgradeMathInline = (root = document) => {
    if (!root || typeof root.querySelectorAll !== 'function') return;
    const targets = root.querySelectorAll('.math-inline');
    targets.forEach((node) => {
        if (node.dataset.mathProcessed === 'true') return;
        const source = node.textContent || '';
        node.innerHTML = formatMathMarkup(source);
        node.dataset.mathProcessed = 'true';
    });
};

const scrollTriggers = Array.from(new Set([
    ...document.querySelectorAll('.landing-link[href^="#"]'),
    ...document.querySelectorAll('[data-scroll="true"]')
]));

scrollTriggers.forEach((link) => {
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

upgradeMathInline();
