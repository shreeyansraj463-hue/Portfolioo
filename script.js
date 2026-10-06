/* =====================================================
   SHREEYANS RAJ
   PORTFOLIO + MIRA ENGINE
===================================================== */


/* =====================================================
   YEAR
===================================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();



/* =====================================================
   MOBILE NAV
===================================================== */

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileNav =
    document.getElementById("mobileNav");


mobileMenu.addEventListener("click", () => {

    mobileNav.classList.toggle("active");

});


mobileNav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        mobileNav.classList.remove("active");

    });

});



/* =====================================================
   CURSOR
===================================================== */

const cursorGlow =
    document.querySelector(".cursor-glow");


if (
    window.matchMedia("(pointer:fine)").matches
) {

    window.addEventListener("mousemove", e => {

        cursorGlow.style.left =
            `${e.clientX}px`;

        cursorGlow.style.top =
            `${e.clientY}px`;

    });

}



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .08
        }
    );


document.querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(element);

    });



/* =====================================================
   GOLD ATMOSPHERE
===================================================== */

const canvas =
    document.getElementById("goldCanvas");

const ctx =
    canvas.getContext("2d");


let width;
let height;
let animationTime = 0;


function resizeCanvas() {

    width =
        window.innerWidth;

    height =
        window.innerHeight;

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;

    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);



/* GOLD PARTICLES */

const particles = [];

const particleCount =
    window.innerWidth < 700
        ? 35
        : 75;


for (
    let i = 0;
    i < particleCount;
    i++
) {

    particles.push({

        x:
            Math.random() * window.innerWidth,

        y:
            Math.random() * window.innerHeight,

        size:
            Math.random() * 1.5 + .2,

        speed:
            Math.random() * .15 + .02,

        alpha:
            Math.random() * .4 + .05,

        phase:
            Math.random() * Math.PI * 2

    });

}



function liquidLine(
    offset,
    amplitude,
    opacity,
    lineWidth
) {

    ctx.beginPath();


    const points = 80;


    for (
        let i = 0;
        i <= points;
        i++
    ) {

        const x =
            i / points * width;


        const y =
            height * .48 +

            Math.sin(
                i * .11 +
                animationTime * .0003 +
                offset
            ) *
            amplitude +

            Math.sin(
                i * .037 -
                animationTime * .00018
            ) *
            amplitude * .55 +

            Math.sin(
                i * .017 +
                animationTime * .0001
            ) *
            amplitude * .3;


        if (i === 0) {

            ctx.moveTo(x,y);

        } else {

            ctx.lineTo(x,y);

        }

    }


    ctx.strokeStyle =
        `rgba(184,154,90,${opacity})`;

    ctx.lineWidth =
        lineWidth;

    ctx.stroke();

}



function drawGoldBackground() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* black base */

    const background =
        ctx.createLinearGradient(
            0,
            0,
            0,
            height
        );


    background.addColorStop(
        0,
        "#020202"
    );

    background.addColorStop(
        .5,
        "#080807"
    );

    background.addColorStop(
        1,
        "#020202"
    );


    ctx.fillStyle =
        background;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /* gold atmosphere */

    const glow =
        ctx.createRadialGradient(
            width * .58,
            height * .38,
            0,
            width * .58,
            height * .38,
            width * .65
        );


    glow.addColorStop(
        0,
        "rgba(184,154,90,.09)"
    );


    glow.addColorStop(
        .5,
        "rgba(184,154,90,.025)"
    );


    glow.addColorStop(
        1,
        "transparent"
    );


    ctx.fillStyle =
        glow;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /* fluid lines */

    liquidLine(
        0,
        height * .11,
        .13,
        1.2
    );


    liquidLine(
        2.3,
        height * .08,
        .065,
        .8
    );


    liquidLine(
        4.8,
        height * .14,
        .045,
        1
    );


    /* particles */

    particles.forEach(p => {

        p.y -= p.speed;


        if (p.y < -10) {

            p.y =
                height + 10;

        }


        const flicker =
            .5 +
            Math.sin(
                animationTime * .002 +
                p.phase
            ) *
            .5;


        ctx.beginPath();


        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(214,181,105,${
                p.alpha * flicker
            })`;


        ctx.fill();

    });


    animationTime += 16;


    requestAnimationFrame(
        drawGoldBackground
    );

}


drawGoldBackground();



/* =====================================================
   ACTUAL UPLOADED IMAGES
===================================================== */

/*
   These filenames come directly from the files you
   uploaded to your GitHub repository.

   They are in the ROOT of the repository, NOT assets/art/.
*/

const uploadedImages = [

    {
        file:
            "IMG_20261006_194615_425.jpg",

        title:
            "Visual Study 01"
    },

    {
        file:
            "IMG_20261005_012646332_HDR~2.jpg",

        title:
            "Visual Study 02"
    },

    {
        file:
            "IMG_20261006_193516_352.webp",

        title:
            "Visual Study 03"
    },

    {
        file:
            "IMG_20261006_193525_532.webp",

        title:
            "Visual Study 04"
    },

    {
        file:
            "IMG_20261006_193503_673.webp",

        title:
            "Visual Study 05"
    },

    {
        file:
            "IMG_20261001_002001_409.jpg",

        title:
            "Visual Study 06"
    },

    {
        file:
            "IMG_20261001_002001_361.jpg",

        title:
            "Visual Study 07"
    },

    {
        file:
            "IMG_20260928_025833148_HDR~2.jpg",

        title:
            "Visual Study 08"
    },

    {
        file:
            "IMG_20260928_025657503_HDR.jpg",

        title:
            "Visual Study 09"
    },

    {
        file:
            "IMG_20260918_200802_610.jpg",

        title:
            "Visual Study 10"
    },

    {
        file:
            "IMG_20260918_200802_712.jpg",

        title:
            "Visual Study 11"
    }

];



/* =====================================================
   CREATE IMAGE GRID
===================================================== */

const artGrid =
    document.getElementById("artGrid");


uploadedImages.forEach(
    (image,index) => {

        const card =
            document.createElement("article");


        card.className =
            "art-card reveal";


        card.innerHTML = `

            <img
                src="./${image.file}"
                alt="${image.title}"
                loading="lazy"
            >

            <div class="art-card-info">

                <span>
                    ${String(index + 1).padStart(2,"0")}
                </span>

                <span>
                    ${image.title}
                </span>

            </div>

        `;


        card.addEventListener(
            "click",
            () => {

                openLightbox(
                    `./${image.file}`,
                    image.title
                );

            }
        );


        artGrid.appendChild(card);


        revealObserver.observe(card);

    }
);



/* =====================================================
   LIGHTBOX
===================================================== */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");


function openLightbox(
    source,
    title
) {

    lightboxImage.src =
        source;

    lightboxImage.alt =
        title;

    lightbox.classList.add(
        "active"
    );

}


function closeLightbox() {

    lightbox.classList.remove(
        "active"
    );

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener(
    "click",
    e => {

        if (
            e.target === lightbox
        ) {

            closeLightbox();

        }

    }
);



/* =====================================================
   MIRA KNOWLEDGE
===================================================== */

const miraKnowledge = {

    identity: {

        keywords: [
            "who",
            "shreeyans",
            "about him",
            "about shreeyans",
            "person"
        ],

        section:
            "#about",

        sectionName:
            "About",

        answer:
            "Shreeyans is an engineering aspirant and creative technologist. His main academic focus is JEE preparation, while outside academics he spends a lot of time exploring front-end development, creative coding, physics, visual design, sketching, writing and music."

    },


    education: {

        keywords: [
            "jee",
            "education",
            "study",
            "studies",
            "student",
            "exam",
            "college",
            "academic"
        ],

        section:
            "#current",

        sectionName:
            "Current State",

        answer:
            "Right now, JEE preparation is a major part of Shreeyans' life. He also likes learning beyond the exam syllabus, especially when a subject becomes interesting enough to explore deeply."

    },


    skills: {

        keywords: [
            "skill",
            "skills",
            "technology",
            "technologies",
            "tech stack",
            "what can he code",
            "coding"
        ],

        section:
            "#about",

        sectionName:
            "About",

        answer:
            "He's comfortable with HTML, CSS, JavaScript and Python. He's also exploring Three.js, WebGL, GLSL, shaders, creative coding, web animation and UI/UX."

    },


    physics: {

        keywords: [
            "physics",
            "mathematics",
            "math",
            "quantum",
            "mechanics",
            "science"
        ],

        section:
            "#about",

        sectionName:
            "About",

        answer:
            "Physics and mathematics are important parts of his academic interests. What seems to matter most to him is understanding the underlying logic rather than simply memorising formulas."

    },


    particle: {

        keywords: [
            "particle",
            "gesture",
            "hand gesture",
            "mediapipe",
            "computer vision",
            "three.js",
            "threejs"
        ],

        section:
            "#project-particle",

        sectionName:
            "Project 01 · Hand-Gesture 3D Particle System",

        answer:
            "The Hand-Gesture 3D Particle System is probably the project that represents him best. It combines Three.js, MediaPipe, JavaScript, WebGL and real-time hand interaction."

    },


    projects: {

        keywords: [
            "project",
            "projects",
            "work",
            "built",
            "build",
            "portfolio project"
        ],

        section:
            "#work",

        sectionName:
            "Selected Work",

        answer:
            "There are three main projects featured here: the Hand-Gesture 3D Particle System, Camlab and a foundational 3D Multiplayer Game project."

    },


    bestProject: {

        keywords: [
            "best project",
            "favorite project",
            "strongest project",
            "most impressive project",
            "project represents him"
        ],

        section:
            "#project-particle",

        sectionName:
            "Project 01 · Hand-Gesture 3D Particle System",

        answer:
            "I'd point you toward the Hand-Gesture 3D Particle System. It brings together several things Shreeyans genuinely likes: 3D graphics, interaction, computer vision and creative coding."

    },


    camlab: {

        keywords: [
            "camlab",
            "interface project",
            "ui project"
        ],

        section:
            "#project-camlab",

        sectionName:
            "Project 02 · Camlab",

        answer:
            "Camlab is an interface experiment focused on advanced UI, motion and interactive frontend concepts."

    },


    game: {

        keywords: [
            "unity",
            "game",
            "multiplayer",
            "c#",
            "game development"
        ],

        section:
            "#project-game",

        sectionName:
            "Project 03 · 3D Multiplayer Game",

        answer:
            "The game project is a foundational Unity experiment involving player movement, health systems, weapon controls and game physics."

    },


    art: {

        keywords: [
            "art",
            "drawing",
            "draw",
            "sketch",
            "sketching",
            "visual art"
        ],

        section:
            "#creative",

        sectionName:
            "Creative Archive",

        answer:
            "There's a strong visual side to Shreeyans too. He sketches, draws and experiments with visual ideas. The portfolio keeps that side alongside the technical work rather than hiding it."

    },


    poetry: {

        keywords: [
            "poetry",
            "poem",
            "poems",
            "writing",
            "written",
            "bloom",
            "promise",
            "plucked",
            "mango"
        ],

        section:
            "#poetry",

        sectionName:
            "Creative Archive · Writing",

        answer:
            "Three poems are featured here: From Bloom to Dusk, Uneven Promise and Before it was Plucked. They show a much quieter and more observational side of his personality."

    },


    bloom: {

        keywords: [
            "from bloom",
            "bloom to dusk",
            "flower poem"
        ],

        section:
            "#poem-bloom",

        sectionName:
            "From Bloom to Dusk",

        answer:
            "From Bloom to Dusk follows a flower through budding, full bloom and withering, using the progression of a day as a parallel for its life."

    },


    promise: {

        keywords: [
            "uneven promise"
        ],

        section:
            "#poem-promise",

        sectionName:
            "Uneven Promise",

        answer:
            "Uneven Promise is one of his shorter pieces. It takes a very small memory and deliberately leaves a lot of emotional space around it."

    },


    plucked: {

        keywords: [
            "before it was plucked",
            "mango poem"
        ],

        section:
            "#poem-plucked",

        sectionName:
            "Before it was Plucked",

        answer:
            "Before it was Plucked uses a gardener and a mango tree to explore attachment, expectation and the difficulty of letting something go."

    },


    thinking: {

        keywords: [
            "how does he think",
            "thinking",
            "approach",
            "problem solving",
            "logic",
            "fundamentals",
            "learn"
        ],

        section:
            "#thinking",

        sectionName:
            "How I Think",

        answer:
            "His approach is to break complicated things down until the underlying logic makes sense. He prefers understanding fundamentals and experimenting over blindly brute-forcing a solution."

    },


    future: {

        keywords: [
            "future",
            "goal",
            "goals",
            "career",
            "dream",
            "long term",
            "three years",
            "five years"
        ],

        section:
            "#future",

        sectionName:
            "Future",

        answer:
            "Long term, he wants to work where engineering, software and creative technology overlap: interactive 3D, high-performance web experiences, complex systems and visually strong digital products."

    },


    music: {

        keywords: [
            "music",
            "songs",
            "artists",
            "listen",
            "kk",
            "nusrat",
            "john mayer",
            "weeknd"
        ],

        section:
            "#creative",

        sectionName:
            "Creative Archive",

        answer:
            "His music taste is pretty broad. Artists he's mentioned include KK, Nusrat Fateh Ali Khan, John Mayer and The Weeknd."

    }

};



/* =====================================================
   MIRA FALLBACKS
===================================================== */

const miraFallbacks = [

    "I don't have enough information about that specific part of Shreeyans' life, so I don't want to make something up.",

    "That's outside the information he's shared with me. I can tell you about his work, education, interests or creative side though.",

    "I don't have a reliable answer for that yet. I'd rather be honest about that than invent an answer."

];



/* =====================================================
   NORMALIZE
===================================================== */

function normalize(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s.-]/g," ")
        .replace(/\s+/g," ")
        .trim();

}



/* =====================================================
   SCORE KNOWLEDGE
===================================================== */

function findKnowledge(question) {

    const text =
        normalize(question);


    const results = [];


    Object.entries(
        miraKnowledge
    ).forEach(
        ([key,item]) => {

            let score = 0;


            item.keywords.forEach(
                keyword => {

                    const k =
                        normalize(keyword);


                    if (
                        text.includes(k)
                    ) {

                        score +=
                            k.includes(" ")
                                ? 5
                                : 2;

                    }

                }
            );


            if (score > 0) {

                results.push({

                    key,

                    score,

                    item

                });

            }

        }
    );


    results.sort(
        (a,b) =>
            b.score - a.score
    );


    return results;

}



/* =====================================================
   SPECIAL CONTEXT
===================================================== */

function intelligentAnswer(question) {

    const text =
        normalize(question);


    const matches =
        findKnowledge(question);


    if (!matches.length) {

        return {

            answer:
                miraFallbacks[
                    Math.floor(
                        Math.random() *
                        miraFallbacks.length
                    )
                ],

            sources: []

        };

    }


    /* BEST PROJECT */

    if (
        text.includes("best") &&
        text.includes("project")
    ) {

        const item =
            miraKnowledge.bestProject;


        return {

            answer:
                item.answer,

            sources: [
                item
            ]

        };

    }


    /* COMBINED TOPICS */

    const primary =
        matches[0];


    let answer =
        primary.item.answer;


    /*
       If the visitor asks something that combines
       two topics, Mira adds another useful thought.
    */

    if (
        matches.length >= 2 &&
        matches[1].score >= 2
    ) {

        const secondary =
            matches[1];


        if (
            primary.key === "education" &&
            secondary.key === "future"
        ) {

            answer +=
                " So the immediate goal is academic, while the longer-term direction is engineering combined with creative technology.";

        }


        else if (
            primary.key === "physics" &&
            (
                secondary.key === "particle" ||
                secondary.key === "projects"
            )
        ) {

            answer +=
                " That connection also shows up in his projects, where technical ideas become interactive systems.";

        }


        else if (
            primary.key === "art" &&
            secondary.key === "poetry"
        ) {

            answer +=
                " Together, those two sides show that his creative interests aren't limited to technology.";

        }

    }


    return {

        answer,

        sources:
            matches
                .slice(0,2)
                .map(
                    match =>
                        match.item
                )

    };

}



/* =====================================================
   MIRA ELEMENTS
===================================================== */

const miraFloating =
    document.getElementById(
        "miraFloating"
    );

const miraPopup =
    document.getElementById(
        "miraPopup"
    );

const miraClose =
    document.getElementById(
        "miraClose"
    );

const miraChat =
    document.getElementById(
        "miraChat"
    );

const miraForm =
    document.getElementById(
        "miraForm"
    );

const miraInput =
    document.getElementById(
        "miraInput"
    );

const miraSource =
    document.getElementById(
        "miraSource"
    );

const heroMiraButton =
    document.getElementById(
        "heroMiraButton"
    );



/* =====================================================
   OPEN MIRA
===================================================== */

function openMira() {

    miraPopup.classList.add(
        "open"
    );

    miraPopup.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "mira-open"
    );


    setTimeout(
        () => {

            miraInput.focus();

        },
        250
    );

}


function closeMira() {

    miraPopup.classList.remove(
        "open"
    );

    miraPopup.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "mira-open"
    );

}


miraFloating.addEventListener(
    "click",
    openMira
);


miraClose.addEventListener(
    "click",
    closeMira
);


heroMiraButton.addEventListener(
    "click",
    openMira
);



/* =====================================================
   ESCAPE CLOSE
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMira();

        }

    }
);



/* =====================================================
   ADD CHAT MESSAGE
===================================================== */

function addMessage(
    text,
    type
) {

    const message =
        document.createElement(
            "div"
        );


    message.className =
        `mira-message ${
            type === "user"
                ? "mira-message-user"
                : "mira-message-ai"
        }`;


    message.innerHTML =
        `<p>${text}</p>`;


    miraChat.appendChild(
        message
    );


    miraChat.scrollTop =
        miraChat.scrollHeight;

}



/* =====================================================
   SOURCE MARKER
===================================================== */

function showSources(
    sources
) {

    miraSource.innerHTML =
        "";


    if (
        !sources ||
        !sources.length
    ) {

        return;

    }


    const card =
        document.createElement(
            "div"
        );


    card.className =
        "mira-source-card";


    const label =
        document.createElement(
            "span"
        );


    label.className =
        "mira-source-label";


    label.textContent =
        "RELATED IN PORTFOLIO";


    card.appendChild(
        label
    );


    sources.forEach(
        source => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "mira-source-link";


            button.innerHTML =
                `↗ ${source.sectionName}`;


            button.addEventListener(
                "click",
                () => {

                    closeMira();


                    setTimeout(
                        () => {

                            const target =
                                document.querySelector(
                                    source.section
                                );


                            if (target) {

                                target.scrollIntoView({
                                    behavior:
                                        "smooth",
                                    block:
                                        "start"
                                });


                                target.classList.add(
                                    "mira-highlight"
                                );


                                setTimeout(
                                    () => {

                                        target.classList.remove(
                                            "mira-highlight"
                                        );

                                    },
                                    1800
                                );

                            }

                        },
                        250
                    );

                }
            );


            card.appendChild(
                button
            );

        }
    );


    miraSource.appendChild(
        card
    );

}



/* =====================================================
   ASK MIRA
===================================================== */

function askMira(
    question
) {

    addMessage(
        escapeHTML(question),
        "user"
    );


    miraInput.value =
        "";


    miraSource.innerHTML =
        "";


    /* thinking delay */

    setTimeout(
        () => {

            const result =
                intelligentAnswer(
                    question
                );


            addMessage(
                result.answer,
                "ai"
            );


            showSources(
                result.sources
            );


        },
        450 +
        Math.random() * 500
    );

}



/* =====================================================
   FORM
===================================================== */

miraForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const question =
            miraInput.value.trim();


        if (!question) {

            return;

        }


        askMira(
            question
        );

    }
);



/* =====================================================
   SUGGESTIONS
===================================================== */

document
    .querySelectorAll(
        "[data-question]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    askMira(
                        button.dataset.question
                    );

                }
            );

        }
    );



/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHTML(
    value
) {

    return value

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
