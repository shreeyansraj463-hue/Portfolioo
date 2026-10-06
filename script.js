/* =========================================================
   SHREEYANS RAJ
   PORTFOLIO ENGINE
========================================================= */


/* =========================================================
   YEAR
========================================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileNav =
    document.getElementById("mobileNav");


mobileMenu.addEventListener("click", () => {

    mobileNav.classList.toggle("active");

});


mobileNav
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("active");

        });

    });


/* =========================================================
   CURSOR
========================================================= */

const cursorGlow =
    document.querySelector(".cursor-glow");


if (window.matchMedia("(pointer:fine)").matches) {

    window.addEventListener("mousemove", event => {

        cursorGlow.animate(
            {
                left: `${event.clientX}px`,
                top: `${event.clientY}px`
            },
            {
                duration: 500,
                fill: "forwards"
            }
        );

    });

}


/* =========================================================
   REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

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


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(element);

    });


/* =========================================================
   LIQUID GOLD BACKGROUND
   Canvas based.
========================================================= */

const canvas =
    document.getElementById("goldCanvas");

const ctx =
    canvas.getContext("2d");

let width;
let height;

let dpr =
    Math.min(window.devicePixelRatio || 1, 2);

let time =
    0;


function resizeCanvas() {

    width =
        window.innerWidth;

    height =
        window.innerHeight;

    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;

    canvas.style.width =
        `${width}px`;

    canvas.style.height =
        `${height}px`;

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


/* =========================================================
   GOLD PARTICLES
========================================================= */

const goldParticles = [];

const particleCount =
    window.innerWidth < 700
        ? 45
        : 85;


for (let i = 0; i < particleCount; i++) {

    goldParticles.push({

        x:
            Math.random() * window.innerWidth,

        y:
            Math.random() * window.innerHeight,

        radius:
            Math.random() * 1.5 + .25,

        speed:
            Math.random() * .18 + .03,

        alpha:
            Math.random() * .45 + .08,

        phase:
            Math.random() * Math.PI * 2

    });

}


/* =========================================================
   LIQUID CURVES
========================================================= */

function drawLiquidCurve(
    offset,
    amplitude,
    color,
    alpha,
    widthLine
) {

    ctx.beginPath();

    const points = 70;

    for (let i = 0; i <= points; i++) {

        const x =
            (i / points) *
            width;

        const waveA =
            Math.sin(
                i * .11 +
                time * .00035 +
                offset
            );

        const waveB =
            Math.sin(
                i * .047 -
                time * .00022 +
                offset * 1.7
            );

        const waveC =
            Math.sin(
                i * .019 +
                time * .00011
            );

        const y =
            height * .5 +
            waveA * amplitude +
            waveB * amplitude * .55 +
            waveC * amplitude * .35;

        if (i === 0) {

            ctx.moveTo(x, y);

        } else {

            ctx.lineTo(x, y);

        }

    }

    ctx.strokeStyle =
        color.replace(
            "ALPHA",
            alpha
        );

    ctx.lineWidth =
        widthLine;

    ctx.stroke();

}


/* =========================================================
   GOLD AMBIENCE
========================================================= */

function drawGoldAtmosphere() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* dark base */

    const background =
        ctx.createLinearGradient(
            0,
            0,
            0,
            height
        );

    background.addColorStop(
        0,
        "#030303"
    );

    background.addColorStop(
        .5,
        "#070706"
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


    /* central atmospheric glow */

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
        "rgba(184,154,90,.08)"
    );

    glow.addColorStop(
        .45,
        "rgba(120,95,45,.025)"
    );

    glow.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    ctx.fillStyle =
        glow;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /* liquid curves */

    drawLiquidCurve(
        0,
        height * .11,
        "rgba(184,154,90,ALPHA)",
        .16,
        1.3
    );

    drawLiquidCurve(
        2.2,
        height * .08,
        "rgba(225,201,138,ALPHA)",
        .08,
        .8
    );

    drawLiquidCurve(
        4.7,
        height * .14,
        "rgba(184,154,90,ALPHA)",
        .06,
        1
    );


    /* particles */

    goldParticles.forEach(
        particle => {

            particle.y -=
                particle.speed;

            particle.x +=
                Math.sin(
                    time * .0003 +
                    particle.phase
                ) * .05;


            if (particle.y < -10) {

                particle.y =
                    height + 10;

            }


            const flicker =
                .55 +
                Math.sin(
                    time * .002 +
                    particle.phase
                ) * .45;


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(214,181,105,${
                    particle.alpha *
                    flicker
                })`;

            ctx.fill();

        }
    );


    time += 16;

    requestAnimationFrame(
        drawGoldAtmosphere
    );

}


drawGoldAtmosphere();


/* =========================================================
   CREATIVE ARCHIVE
=========================================================

   IMPORTANT:
   Put your artwork inside:

   assets/art/

   Then simply add filenames below.

========================================================= */

const creativeData = {

    art: [

        {
            src:
                "assets/art/art-01.jpg",
            title:
                "Study 01"
        },

        {
            src:
                "assets/art/art-02.jpg",
            title:
                "Study 02"
        },

        {
            src:
                "assets/art/art-03.jpg",
            title:
                "Study 03"
        },

        {
            src:
                "assets/art/art-04.jpg",
            title:
                "Study 04"
        },

        {
            src:
                "assets/art/art-05.jpg",
            title:
                "Study 05"
        },

        {
            src:
                "assets/art/art-06.jpg",
            title:
                "Study 06"
        }

    ]

};


/* =========================================================
   ART GALLERY
========================================================= */

const artGrid =
    document.getElementById("artGrid");


creativeData.art.forEach(
    (art, index) => {

        const card =
            document.createElement("article");

        card.className =
            "art-card reveal";


        card.innerHTML = `

            <img
                src="${art.src}"
                alt="${art.title}"
                loading="lazy"
            >

            <div class="art-card-info">

                <span>
                    ${String(index + 1).padStart(2,"0")}
                    / ART
                </span>

                <span>
                    ${art.title}
                </span>

            </div>

        `;


        card.addEventListener(
            "click",
            () => {

                openLightbox(
                    art.src,
                    art.title
                );

            }
        );


        artGrid.appendChild(card);

        revealObserver.observe(card);

    }
);


/* =========================================================
   LIGHTBOX
========================================================= */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");


function openLightbox(
    src,
    alt
) {

    lightboxImage.src =
        src;

    lightboxImage.alt =
        alt;

    lightbox.classList.add(
        "active"
    );

}


function closeLightbox() {

    lightbox.classList.remove(
        "active"
    );

    setTimeout(() => {

        lightboxImage.src =
            "";

    }, 300);

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            lightbox
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   MIRA KNOWLEDGE BASE
========================================================= */

const miraKnowledge = {

    identity: {

        name:
            "Shreeyans Raj",

        role:
            "Engineering Aspirant and Creative Technologist",

        description:
            "Shreeyans is an engineering aspirant who combines technical problem-solving with creative coding, visual experimentation, art and writing."

    },


    education: {

        current:
            "JEE preparation",

        interests: [
            "Physics",
            "Mathematics",
            "Engineering",
            "Computer Science",
            "Quantum mechanics"
        ],

        philosophy:
            "He prefers understanding concepts deeply rather than only studying them for exams."

    },


    technical: {

        comfortable: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],

        exploring: [
            "Three.js",
            "WebGL",
            "GLSL",
            "Shaders",
            "Creative coding",
            "UI/UX",
            "Web animation"
        ],

        interests: [
            "3D web development",
            "Interactive interfaces",
            "Computer graphics",
            "Physics simulations",
            "Performance optimization",
            "Visual interaction"
        ]

    },


    projects: {

        particle: {

            name:
                "Hand-Gesture 3D Particle System",

            description:
                "A real-time 3D particle environment controlled by webcam hand gestures.",

            technologies: [
                "Three.js",
                "MediaPipe Hands",
                "JavaScript",
                "WebGL"
            ],

            importance:
                "This project represents Shreeyans particularly well because it combines computer vision, graphics, interaction and creative coding.",

            live:
                "https://shreeyansraj463-hue.github.io/3D-Particle-Playground/",

            source:
                "https://github.com/shreeyansraj463-hue/3D-Particle-Playground"

        },


        camlab: {

            name:
                "Camlab",

            description:
                "An interface experiment focused on advanced UI, animation and interactive frontend concepts.",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript"
            ],

            live:
                "https://shreeyansraj463-hue.github.io/camlab/",

            source:
                "https://github.com/shreeyansraj463-hue/camlab"

        },


        game: {

            name:
                "3D Multiplayer Game Starter",

            description:
                "A foundational Unity project exploring player movement, health systems, weapon controls and game physics.",

            technologies: [
                "Unity",
                "C#",
                "Game physics"
            ]

        }

    },


    creative: {

        art: [
            "Sketching",
            "Drawing",
            "Visual experimentation",
            "Visual design"
        ],

        writing: [
            "Poetry",
            "Creative writing",
            "Narrative writing"
        ],

        poems: [

            "From Bloom to Dusk",

            "Uneven Promise",

            "Before it was Plucked"

        ],

        music: [
            "KK",
            "Nusrat Fateh Ali Khan",
            "John Mayer",
            "The Weeknd"
        ],

        films: [
            "Christopher Nolan films",
            "SRK classics"
        ]

    },


    thinking: {

        approach: [
            "Break complex things into fundamentals",
            "Understand the underlying logic",
            "Avoid brute force",
            "Experiment",
            "Improve things through iteration"
        ],

        belief:
            "Good technical work should function well and also feel good to use."

    },


    future: {

        goals: [
            "Top-tier engineering education",
            "Advanced software engineering",
            "Creative technology",
            "Immersive web experiences",
            "Interactive 3D",
            "High-performance systems",
            "Complex software used by many people"
        ]

    }

};


/* =========================================================
   MIRA RESPONSE ENGINE
========================================================= */

/*
    This is intentionally NOT an API.

    Mira uses:
    - keyword recognition
    - topic scoring
    - knowledge retrieval
    - contextual combinations
    - response variation

    This lets her answer questions that were not
    explicitly written as individual responses.
*/


const miraResponses = {

    greetings: [

        "Hey. I'm Mira. What are you curious about?",

        "Hi. I can show you around Shreeyans' world if you want.",

        "Hello. Ask me anything about the person behind the portfolio."

    ],


    identity: [

        "Shreeyans is an engineering aspirant with a rather unusual combination of interests. He spends a lot of time on technical problem-solving, but he also likes building visual experiences, sketching and writing.",

        "He's basically somewhere between an engineering student and a creative coder. The technical side is important to him, but he doesn't really want technology to feel lifeless."

    ],


    education: [

        "Right now, a major part of Shreeyans' life is JEE preparation. He's particularly interested in physics and mathematics, but he also likes going beyond the exam syllabus when something catches his curiosity.",

        "JEE is the current academic focus. But the interesting part is that he doesn't seem satisfied with memorising things. He likes understanding why they work."

    ],


    physics: [

        "Physics is one of the places where his engineering and curiosity overlap. He likes going beyond just solving questions and understanding the ideas underneath them.",

        "Physics interests him partly because it gives him a way to describe how systems behave. That same systems-thinking shows up in his coding projects too."

    ],


    programming: [

        "His comfortable languages and tools include HTML, CSS, JavaScript and Python. He's especially interested in moving deeper into Three.js, WebGL, GLSL and creative coding.",

        "Front-end development is probably the area where his technical and visual interests meet most naturally."

    ],


    threejs: [

        "Three.js is interesting to him because it lets code become visual. Instead of only building a traditional interface, he can work with geometry, particles, cameras, lighting and interaction.",

        "I'd point you toward his hand-gesture particle project. It combines computer vision and 3D graphics, which is pretty representative of what he likes building."

    ],


    projects: [

        "The hand-gesture 3D particle system is probably the project that represents him best. It combines Three.js, MediaPipe, JavaScript and real-time interaction.",

        "He has explored a few different directions: interactive 3D particles, interface experiments and Unity game development. There's a common thread though: he likes making systems interactive."

    ],


    art: [

        "There's definitely a quieter visual side to him. He sketches, experiments with visual ideas and pays attention to composition and aesthetics.",

        "His art is one of the reasons the portfolio isn't purely technical. It's another way he explores ideas visually."

    ],


    writing: [

        "He also writes poetry. There are three pieces currently featured here: 'From Bloom to Dusk', 'Uneven Promise' and 'Before it was Plucked'.",

        "The writing is a very different side of him from the engineering work. It's slower, more observational and much less about solving a problem."

    ],


    creative: [

        "The creative side is probably best described through three things: sketching, writing and music. They give him a completely different way to think compared with technical problem-solving.",

        "Technology isn't the only thing he's interested in. There's a pretty strong artistic side here too, especially through sketching and poetry."

    ],


    thinking: [

        "His general approach is to break complicated things down until the underlying logic makes sense. He'd rather understand something properly than brute-force his way through it.",

        "He tends to start with fundamentals, experiment with the idea, see what happens, and then keep refining it."

    ],


    future: [

        "Long term, he wants to work where engineering, software and creative technology overlap. Think interactive 3D, high-performance web experiences and complex systems that people actually use.",

        "The direction seems pretty clear: become technically strong, but keep the creative side instead of treating it as something separate."

    ],


    music: [

        "His music taste is pretty broad. KK, Nusrat Fateh Ali Khan, John Mayer and The Weeknd are some of the artists he's mentioned.",

        "His music taste definitely doesn't stay in one lane. There's everything from KK and Nusrat Fateh Ali Khan to John Mayer and The Weeknd."

    ],


    unknown: [

        "That's an interesting one. I don't have enough information about that part of Shreeyans' life to pretend I know the answer.",

        "I don't have a reliable answer for that from what Shreeyans has shared with me. I'd rather tell you that than invent something.",

        "That's outside my current knowledge of him. I can still help you explore the parts of his work and interests that I do know."

    ]

};


/* =========================================================
   KEYWORD GROUPS
========================================================= */

const miraTopics = {

    identity: [
        "who",
        "shreeyans",
        "about him",
        "person",
        "himself",
        "your owner",
        "who are you"
    ],

    education: [
        "jee",
        "study",
        "studies",
        "education",
        "school",
        "exam",
        "student",
        "college",
        "academic"
    ],

    physics: [
        "physics",
        "math",
        "mathematics",
        "quantum",
        "mechanics",
        "science"
    ],

    programming: [
        "code",
        "coding",
        "programming",
        "javascript",
        "python",
        "html",
        "css",
        "frontend",
        "front end",
        "developer"
    ],

    threejs: [
        "three.js",
        "threejs",
        "webgl",
        "glsl",
        "shader",
        "3d",
        "graphics",
        "particle"
    ],

    projects: [
        "project",
        "projects",
        "built",
        "build",
        "work",
        "portfolio",
        "camlab",
        "particle"
    ],

    art: [
        "art",
        "draw",
        "drawing",
        "sketch",
        "sketching",
        "visual",
        "painting"
    ],

    writing: [
        "write",
        "writing",
        "poem",
        "poetry",
        "poems",
        "bloom",
        "promise",
        "pluck",
        "mango"
    ],

    creative: [
        "creative",
        "creativity",
        "music",
        "film",
        "movie",
        "nolan",
        "srk"
    ],

    thinking: [
        "think",
        "thinking",
        "approach",
        "logic",
        "problem",
        "problem solving",
        "fundamental",
        "fundamentals",
        "learn"
    ],

    future: [
        "future",
        "goal",
        "goals",
        "career",
        "dream",
        "later",
        "3-5 years",
        "three years"
    ],

    music: [
        "music",
        "song",
        "songs",
        "artist",
        "artists",
        "kk",
        "nusrat",
        "john mayer",
        "weeknd"
    ]

};


/* =========================================================
   NORMALIZE
========================================================= */

function normalizeText(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s.-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


/* =========================================================
   SCORE TOPICS
========================================================= */

function scoreMiraTopics(question) {

    const text =
        normalizeText(question);

    const scores = {};

    Object.entries(
        miraTopics
    ).forEach(
        ([topic, keywords]) => {

            scores[topic] = 0;

            keywords.forEach(
                keyword => {

                    if (
                        text.includes(
                            keyword
                        )
                    ) {

                        scores[topic] +=
                            keyword.includes(" ")
                                ? 3
                                : 1;

                    }

                }
            );

        }
    );


    return Object.entries(scores)
        .sort(
            (a,b) =>
                b[1] - a[1]
        );

}


/* =========================================================
   RESPONSE PICKER
========================================================= */

function randomResponse(
    collection
) {

    return collection[
        Math.floor(
            Math.random() *
            collection.length
        )
    ];

}


/* =========================================================
   SMART COMBINATIONS
========================================================= */

function buildContextualResponse(
    question,
    topics
) {

    const text =
        normalizeText(question);


    /* best project */

    if (
        (
            text.includes("best") ||
            text.includes("favorite") ||
            text.includes("most") ||
            text.includes("represent")
        ) &&
        (
            text.includes("project") ||
            text.includes("work") ||
            text.includes("built")
        )
    ) {

        return `
            Honestly, I'd start with the
            <strong>Hand-Gesture 3D Particle System</strong>.
            It's probably the most "Shreeyans" project here
            because it brings together his interest in
            JavaScript, 3D graphics, computer vision and
            interactive experiences.
        `;

    }


    /* creative + technical */

    if (
        topics.includes("creative") &&
        (
            topics.includes("programming") ||
            topics.includes("threejs")
        )
    ) {

        return `
            That's actually where a lot of his interests
            meet. He likes the technical precision of code,
            but he also cares about how the result looks,
            moves and feels. Three.js is a good example of
            that overlap.
        `;

    }


    /* education + future */

    if (
        topics.includes("education") &&
        topics.includes("future")
    ) {

        return `
            Right now the immediate academic focus is JEE
            preparation. Longer term, though, he wants to
            move toward engineering and software while
            keeping creative technology in the picture.
        `;

    }


    /* art + writing */

    if (
        topics.includes("art") &&
        topics.includes("writing")
    ) {

        return `
            Those are two different sides of the same
            creative instinct. Sketching lets him work
            visually, while poetry lets him work through
            ideas with words. Both sit outside the more
            structured engineering side of his life.
        `;

    }


    /* physics + programming */

    if (
        topics.includes("physics") &&
        (
            topics.includes("programming") ||
            topics.includes("threejs")
        )
    ) {

        return `
            That's one of the more interesting connections
            in his interests. Physics gives him a way of
            thinking about systems, motion and rules, while
            programming gives him a way to actually build
            and simulate some of those ideas.
        `;

    }


    /* writing specific */

    if (
        text.includes("from bloom") ||
        text.includes("bloom to dusk")
    ) {

        return `
            <strong>From Bloom to Dusk</strong> is one of
            the three poems featured here. It follows a
            flower through blooming, maturity and fading,
            using the passing day as a parallel for its life.
        `;

    }


    if (
        text.includes("uneven promise")
    ) {

        return `
            <strong>Uneven Promise</strong> is one of his
            shorter pieces. It takes a very small memory
            and turns it into something deliberately brief
            and open-ended.
        `;

    }


    if (
        text.includes("before it was plucked") ||
        text.includes("mango")
    ) {

        return `
            <strong>Before it was Plucked</strong> uses a
            gardener and a mango tree to explore attachment,
            expectation and the difficulty of letting go.
        `;

    }


    return null;

}


/* =========================================================
   MIRA CORE
========================================================= */

function getMiraResponse(
    question
) {

    const text =
        normalizeText(question);


    /* greetings */

    if (
        /^(hi|hello|hey|yo|hola|good morning|good evening)$/
            .test(text)
    ) {

        return randomResponse(
            miraResponses.greetings
        );

    }


    /* thanks */

    if (
        text.includes("thank") ||
        text.includes("thanks")
    ) {

        return `
            You're welcome. I'm around if you want
            to dig deeper into anything else.
        `;

    }


    /* goodbye */

    if (
        text === "bye" ||
        text.includes("goodbye")
    ) {

        return `
            See you. And if you're still curious,
            the particle project is a pretty good
            place to continue.
        `;

    }


    const scored =
        scoreMiraTopics(question);


    const detected =
        scored
            .filter(
                item => item[1] > 0
            )
            .slice(0,3)
            .map(
                item => item[0]
            );


    const contextual =
        buildContextualResponse(
            question,
            detected
        );


    if (contextual) {

        return contextual;

    }


    /* direct topic response */

    if (
        detected.length
    ) {

        const primary =
            detected[0];


        if (
            miraResponses[primary]
        ) {

            return randomResponse(
                miraResponses[primary]
            );

        }

    }


    /* special questions */

    if (
        text.includes("skill") ||
        text.includes("skills")
    ) {

        return `
            Technically, he's comfortable with HTML,
            CSS, JavaScript and Python. He's currently
            pushing deeper into Three.js, WebGL, GLSL,
            shaders, creative coding and UI/UX.
        `;

    }


    if (
        text.includes("music") ||
        text.includes("listen")
    ) {

        return randomResponse(
            miraResponses.music
        );

    }


    if (
        text.includes("why") &&
        text.includes("code")
    ) {

        return `
            I think the attraction is partly that code
            gives him a way to turn an idea into something
            real. He especially likes it when the result
            becomes interactive rather than staying purely
            theoretical.
        `;

    }


    return randomResponse(
        miraResponses.unknown
    );

}


/* =========================================================
   MIRA UI
========================================================= */

const miraOverlay =
    document.getElementById(
        "miraOverlay"
    );

const miraClose =
    document.getElementById(
        "miraClose"
    );

const miraForm =
    document.getElementById(
        "miraForm"
    );

const miraInput =
    document.getElementById(
        "miraInput"
    );

const miraConversation =
    document.getElementById(
        "miraConversation"
    );

const miraInterface =
    document.querySelector(
        ".mira-interface"
    );


/* =========================================================
   OPEN
========================================================= */

function openMira() {

    miraOverlay.classList.add(
        "active"
    );

    miraOverlay.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "no-scroll"
    );


    /* first greeting only */

    if (
        !miraConversation.children.length
    ) {

        setTimeout(
            () => {

                addMiraMessage(
                    "Hey. I'm Mira. You can ask me about Shreeyans' work, studies, interests, projects, art or writing. Or ask me something a little less obvious.",
                    "mira"
                );

            },
            450
        );

    }


    setTimeout(
        () => {

            miraInput.focus();

        },
        500
    );

}


/* =========================================================
   CLOSE
========================================================= */

function closeMira() {

    miraOverlay.classList.remove(
        "active"
    );

    miraOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


/* =========================================================
   ALL OPEN BUTTONS
========================================================= */

document
    .querySelectorAll(
        "[data-open-mira]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                openMira
            );

        }
    );


miraClose.addEventListener(
    "click",
    closeMira
);


/* =========================================================
   MESSAGE
========================================================= */

function addMiraMessage(
    text,
    type = "mira"
) {

    const message =
        document.createElement(
            "div"
        );

    message.className =
        `mira-message ${type}`;

    message.innerHTML =
        text;

    miraConversation.appendChild(
        message
    );

    miraConversation.scrollTop =
        miraConversation.scrollHeight;

}


/* =========================================================
   THINKING
========================================================= */

function miraThinking() {

    miraInterface.classList.add(
        "thinking"
    );

}


function miraDoneThinking() {

    miraInterface.classList.remove(
        "thinking"
    );

}


/* =========================================================
   ASK
========================================================= */

function askMira(
    question
) {

    addMiraMessage(
        escapeHTML(question),
        "user"
    );

    miraInput.value =
        "";

    miraThinking();


    const delay =
        450 +
        Math.random() * 700;


    setTimeout(
        () => {

            const answer =
                getMiraResponse(
                    question
                );

            miraDoneThinking();

            addMiraMessage(
                answer,
                "mira"
            );

        },
        delay
    );

}


/* =========================================================
   INPUT
========================================================= */

miraForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const question =
            miraInput.value.trim();

        if (!question) return;

        askMira(
            question
        );

    }
);


/* =========================================================
   SUGGESTIONS
========================================================= */

document
    .querySelectorAll(
        "[data-mira-question]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    askMira(
                        button.dataset
                            .miraQuestion
                    );

                }
            );

        }
    );


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            miraOverlay.classList.contains(
                "active"
            )
        ) {

            closeMira();

        }

    }
);


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(
    value
) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
