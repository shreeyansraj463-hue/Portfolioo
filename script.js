/* ============================================================
   SHREEYANS RAJ — PORTFOLIO
   Lightweight interaction layer
============================================================ */

"use strict";


/* ============================================================
   01. ELEMENTS
============================================================ */

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNavigation = document.querySelector(".mobile-navigation");

const revealElements = document.querySelectorAll(".reveal");
const navigationLinks = document.querySelectorAll(
    ".desktop-nav a, .mobile-navigation a"
);


/* ============================================================
   02. HEADER SCROLL STATE
============================================================ */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

updateHeader();

window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


/* ============================================================
   03. MOBILE MENU
============================================================ */

function closeMobileMenu() {

    if (!menuToggle || !mobileNavigation) return;

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    mobileNavigation.classList.remove("open");

    document.body.classList.remove("menu-open");
}


function openMobileMenu() {

    if (!menuToggle || !mobileNavigation) return;

    menuToggle.classList.add("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    mobileNavigation.classList.add("open");

    document.body.classList.add("menu-open");
}


if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }

    });

}


/* Close mobile navigation after clicking a link */

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {
        closeMobileMenu();
    });

});


/* Close menu when clicking outside */

document.addEventListener("click", (event) => {

    if (!mobileNavigation || !menuToggle) return;

    const clickedInsideMenu =
        mobileNavigation.contains(event.target);

    const clickedToggle =
        menuToggle.contains(event.target);

    if (
        mobileNavigation.classList.contains("open") &&
        !clickedInsideMenu &&
        !clickedToggle
    ) {
        closeMobileMenu();
    }

});


/* Escape key */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeMobileMenu();
    }

});


/* ============================================================
   04. SCROLL REVEAL
============================================================ */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (!reducedMotion && "IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


/* ============================================================
   05. ACTIVE NAVIGATION
============================================================ */

const sections = document.querySelectorAll(
    "main section[id]"
);

const desktopLinks = document.querySelectorAll(
    ".desktop-nav a"
);


if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const id = entry.target.getAttribute("id");

                desktopLinks.forEach((link) => {

                    const href =
                        link.getAttribute("href");

                    link.classList.toggle(
                        "active",
                        href === `#${id}`
                    );

                });

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });

}


/* ============================================================
   06. SMOOTH INTERNAL LINKS
============================================================ */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "start"
        });

    });

});


/* ============================================================
   07. PARTICLE MICRO-INTERACTION
============================================================ */

const particleCore =
    document.querySelector(".particle-core");


if (
    particleCore &&
    !reducedMotion
) {

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    const visual =
        document.querySelector(".particle-visual");


    if (visual) {

        visual.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    visual.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;

                targetX =
                    (x - 0.5) * 18;

                targetY =
                    (y - 0.5) * 18;

            },
            {
                passive: true
            }
        );


        visual.addEventListener(
            "pointerleave",
            () => {

                targetX = 0;
                targetY = 0;

            }
        );


        function animateParticle() {

            currentX +=
                (targetX - currentX) * 0.08;

            currentY +=
                (targetY - currentY) * 0.08;


            particleCore.style.transform =
                `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;


            requestAnimationFrame(
                animateParticle
            );

        }


        animateParticle();

    }

}


/* ============================================================
   08. MAGNETIC BUTTON
============================================================ */

const primaryButtons =
    document.querySelectorAll(".button-primary");


if (
    !reducedMotion &&
    window.matchMedia("(hover: hover)").matches
) {

    primaryButtons.forEach((button) => {

        button.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX - rect.left - rect.width / 2;

                const y =
                    event.clientY - rect.top - rect.height / 2;


                button.style.transform =
                    `translate(${x * 0.08}px, ${y * 0.08}px)`;

            }
        );


        button.addEventListener(
            "pointerleave",
            () => {

                button.style.transform =
                    "translate(0, 0)";

            }
        );

    });

}


/* ============================================================
   09. RESIZE SAFETY
============================================================ */

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            if (
                window.innerWidth > 720 &&
                mobileNavigation &&
                mobileNavigation.classList.contains("open")
            ) {
                closeMobileMenu();
            }

        }, 150);

    },
    {
        passive: true
    }
);


/* ============================================================
   10. PREVENT STALE HOVER TRANSFORM
============================================================ */

window.addEventListener(
    "blur",
    () => {

        primaryButtons.forEach((button) => {

            button.style.transform =
                "translate(0, 0)";

        });

    }
);
