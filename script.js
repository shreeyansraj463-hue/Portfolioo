/* ============================================================
   SHREEYANS RAJ
   PORTFOLIO INTERACTION SYSTEM
============================================================ */

"use strict";


/* ============================================================
   01. ELEMENTS
============================================================ */

const header =
    document.querySelector(".site-header");

const menuToggle =
    document.querySelector(".menu-toggle");

const mobileNavigation =
    document.querySelector(".mobile-navigation");

const revealElements =
    document.querySelectorAll(".reveal");

const navigationLinks =
    document.querySelectorAll(
        ".desktop-nav a, .mobile-navigation a"
    );


const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* ============================================================
   02. HEADER
============================================================ */

function updateHeader() {

    if (!header) return;

    header.classList.toggle(
        "scrolled",
        window.scrollY > 30
    );
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
   03. MOBILE NAVIGATION
============================================================ */

function closeMobileMenu() {

    if (
        !menuToggle ||
        !mobileNavigation
    ) {
        return;
    }


    menuToggle.classList.remove("active");


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
    );


    mobileNavigation.classList.remove("open");


    document.body.classList.remove(
        "menu-open"
    );
}


function openMobileMenu() {

    if (
        !menuToggle ||
        !mobileNavigation
    ) {
        return;
    }


    menuToggle.classList.add("active");


    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Close navigation"
    );


    mobileNavigation.classList.add("open");


    document.body.classList.add(
        "menu-open"
    );
}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                menuToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );

}


/* Close after navigation */

navigationLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    }
);


/* Escape */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeMobileMenu();

        }

    }
);


/* Click outside */

document.addEventListener(
    "click",
    (event) => {

        if (
            !mobileNavigation ||
            !menuToggle
        ) {
            return;
        }


        if (
            !mobileNavigation.classList.contains(
                "open"
            )
        ) {
            return;
        }


        const insideMenu =
            mobileNavigation.contains(
                event.target
            );

        const insideToggle =
            menuToggle.contains(
                event.target
            );


        if (
            !insideMenu &&
            !insideToggle
        ) {

            closeMobileMenu();

        }

    }
);


/* ============================================================
   04. SCROLL REVEAL
============================================================ */

if (
    !reducedMotion &&
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: .12,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* ============================================================
   05. ACTIVE NAVIGATION
============================================================ */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const desktopLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


if (
    "IntersectionObserver" in window
) {

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const id =
                            entry.target.getAttribute(
                                "id"
                            );


                        desktopLinks.forEach(
                            (link) => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute(
                                        "href"
                                    ) === `#${id}`
                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        (section) => {

            sectionObserver.observe(
                section
            );

        }
    );

}


/* ============================================================
   06. SMOOTH ANCHOR NAVIGATION
============================================================ */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:
                            reducedMotion
                                ? "auto"
                                : "smooth",

                        block: "start"
                    });

                }
            );

        }
    );


/* ============================================================
   07. AMBIENT PARTICLE FIELD
============================================================ */

const ambientCanvas =
    document.querySelector(
        "#ambient-canvas"
    );


if (
    ambientCanvas &&
    !reducedMotion
) {

    const context =
        ambientCanvas.getContext(
            "2d",
            {
                alpha: true
            }
        );


    let particles = [];


    let width = 0;
    let height = 0;


    let pointerX = .5;
    let pointerY = .5;


    let animationFrame;


    const mobile =
        window.matchMedia(
            "(max-width: 720px)"
        ).matches;


    const particleCount =
        mobile
            ? 25
            : 60;


    function resizeCanvas() {

        const rect =
            ambientCanvas.getBoundingClientRect();


        width =
            rect.width;

        height =
            rect.height;


        const pixelRatio =
            Math.min(
                window.devicePixelRatio || 1,
                1.5
            );


        ambientCanvas.width =
            width * pixelRatio;


        ambientCanvas.height =
            height * pixelRatio;


        context.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );

    }


    function createParticles() {

        particles = [];


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push({

                x:
                    Math.random() * width,

                y:
                    Math.random() * height,

                size:
                    Math.random() * 1.35 + .35,

                speed:
                    Math.random() * .14 + .035,

                drift:
                    (Math.random() - .5) * .11,

                opacity:
                    Math.random() * .32 + .07,

                phase:
                    Math.random() *
                    Math.PI *
                    2

            });

        }

    }


    function renderParticles(time) {

        context.clearRect(
            0,
            0,
            width,
            height
        );


        const seconds =
            time * .001;


        for (
            const particle of particles
        ) {

            particle.y -=
                particle.speed;


            particle.x +=
                Math.sin(
                    seconds +
                    particle.phase
                ) *
                particle.drift;


            if (
                particle.y <
                -10
            ) {

                particle.y =
                    height + 10;

                particle.x =
                    Math.random() * width;

            }


            if (
                particle.x <
                -10
            ) {

                particle.x =
                    width + 10;

            }


            if (
                particle.x >
                width + 10
            ) {

                particle.x =
                    -10;

            }


            /*
             * Gentle cursor interaction
             */

            const targetX =
                pointerX * width;

            const targetY =
                pointerY * height;


            const dx =
                targetX -
                particle.x;

            const dy =
                targetY -
                particle.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance < 180
            ) {

                particle.x +=
                    dx * .0003;

                particle.y +=
                    dy * .0003;

            }


            context.beginPath();


            context.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            context.fillStyle =
                `rgba(232,224,210,${particle.opacity})`;


            context.fill();

        }


        animationFrame =
            requestAnimationFrame(
                renderParticles
            );

    }


    function updatePointer(event) {

        pointerX =
            event.clientX /
            window.innerWidth;


        pointerY =
            event.clientY /
            window.innerHeight;

    }


    resizeCanvas();

    createParticles();


    window.addEventListener(
        "resize",
        () => {

            resizeCanvas();

            createParticles();

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "pointermove",
        updatePointer,
        {
            passive: true
        }
    );


    animationFrame =
        requestAnimationFrame(
            renderParticles
        );

}


/* ============================================================
   08. MAGNETIC PRIMARY BUTTON
============================================================ */

const primaryButtons =
    document.querySelectorAll(
        ".button-primary"
    );


if (
    !reducedMotion &&
    window.matchMedia(
        "(hover: hover)"
    ).matches
) {

    primaryButtons.forEach(
        (button) => {

            button.addEventListener(
                "pointermove",
                (event) => {

                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `translate(${x * .07}px, ${y * .07}px)`;

                }
            );


            button.addEventListener(
                "pointerleave",
                () => {

                    button.style.transform =
                        "translate(0,0)";

                }
            );

        }
    );

}


/* ============================================================
   09. RESIZE SAFETY
============================================================ */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    if (
                        window.innerWidth > 720 &&
                        mobileNavigation &&
                        mobileNavigation.classList.contains(
                            "open"
                        )
                    ) {

                        closeMobileMenu();

                    }

                },
                150
            );

    },
    {
        passive: true
    }
);


/* ============================================================
   10. WINDOW BLUR SAFETY
============================================================ */

window.addEventListener(
    "blur",
    () => {

        primaryButtons.forEach(
            (button) => {

                button.style.transform =
                    "translate(0,0)";

            }
        );

    }
);


/* ============================================================
   11. CLEANUP
============================================================ */

window.addEventListener(
    "pagehide",
    () => {

        if (animationFrame) {

            cancelAnimationFrame(
                animationFrame
            );

        }

    }
);
