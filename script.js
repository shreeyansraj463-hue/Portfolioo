/* =========================================================
   SHREEYANS RAJ
   Premium Portfolio
========================================================= */


/* =========================================================
   YEAR
========================================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================================
   BACKGROUND ATMOSPHERE
========================================================= */

const canvas =
    document.getElementById("atmosphere");

const ctx =
    canvas.getContext("2d");

let width = 0;
let height = 0;

let particles = [];


function resizeCanvas() {

    width = window.innerWidth;
    height = window.innerHeight;

    const ratio =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    canvas.width =
        width * ratio;

    canvas.height =
        height * ratio;

    canvas.style.width =
        `${width}px`;

    canvas.style.height =
        `${height}px`;

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

    createParticles();
}


function createParticles() {

    const count =
        width < 700 ? 22 : 50;

    particles = [];

    for (
        let i = 0;
        i < count;
        i++
    ) {

        particles.push({

            x:
                Math.random() * width,

            y:
                Math.random() * height,

            radius:
                Math.random() * 1.5 + 0.3,

            vx:
                (Math.random() - 0.5) * 0.15,

            vy:
                (Math.random() - 0.5) * 0.15,

            alpha:
                Math.random() * 0.14 + 0.03

        });

    }
}


function drawAtmosphere() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const gradient =
        ctx.createRadialGradient(
            width * 0.72,
            height * 0.22,
            0,
            width * 0.72,
            height * 0.22,
            Math.max(width, height) * 0.65
        );


    gradient.addColorStop(
        0,
        "rgba(184,154,90,0.10)"
    );

    gradient.addColorStop(
        0.45,
        "rgba(184,154,90,0.025)"
    );

    gradient.addColorStop(
        1,
        "rgba(184,154,90,0)"
    );


    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    particles.forEach(
        particle => {

            particle.x +=
                particle.vx;

            particle.y +=
                particle.vy;


            if (
                particle.x < -10
            ) {
                particle.x =
                    width + 10;
            }


            if (
                particle.x > width + 10
            ) {
                particle.x = -10;
            }


            if (
                particle.y < -10
            ) {
                particle.y =
                    height + 10;
            }


            if (
                particle.y > height + 10
            ) {
                particle.y = -10;
            }


            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    184,
                    154,
                    90,
                    ${particle.alpha}
                )`;


            ctx.fill();

        }
    );


    requestAnimationFrame(
        drawAtmosphere
    );
}


window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();

drawAtmosphere();



/* =========================================================
   IMAGE PATH HANDLER
========================================================= */

/*
   Important:

   Some of your filenames contain spaces and special
   characters such as "~".

   This function safely creates the URL without
   changing the actual filename in your repository.
*/

function imagePath(filename) {

    return "./" +
        filename
            .split("/")
            .map(
                part =>
                    encodeURIComponent(part)
            )
            .join("/");

}



/* =========================================================
   ART COLLECTION
========================================================= */

const artCollection = [

    {
        file: "20260126_150411.jpg",
        title: "Visual Study 01"
    },

    {
        file: "IMG-20250829-WA0008.jpg",
        title: "Visual Study 02"
    },

    {
        file: "IMG_20251019_003614078_HDR.jpg",
        title: "Visual Study 03"
    },

    {
        file: "IMG_20251019_003637605_HDR.jpg",
        title: "Visual Study 04"
    },

    {
        file: "IMG_20251019_004046619_HDR~2.jpg",
        title: "Visual Study 05"
    },

    {
        file: "IMG_20251117_032352_534.jpg",
        title: "Visual Study 06"
    },

    {
        file: "IMG_20251117_032354_002.jpg",
        title: "Visual Study 07"
    },

    {
        file: "IMG_20251117_032357_284.jpg",
        title: "Visual Study 08"
    },

    {
        file: "IMG_20251117_032405_870.jpg",
        title: "Visual Study 09"
    },

    {
        file: "IMG_20260607_184756768.jpg",
        title: "Visual Study 10"
    }

];



/* =========================================================
   POETRY COLLECTION
========================================================= */

const poetryCollection = [

    {
        file:
            "Screenshot_20261007-045758_Files by Google.png",

        title:
            "Written Page 01"
    },

    {
        file:
            "Screenshot_20261007-045745_Files by Google.png",

        title:
            "Written Page 02"
    },

    {
        file:
            "Screenshot_20261007-045733_Files by Google.png",

        title:
            "Written Page 03"
    },

    {
        file:
            "Screenshot_20261007-045720_Files by Google.png",

        title:
            "Written Page 04"
    },

    {
        file:
            "Screenshot_20261007-045706_Files by Google.png",

        title:
            "Written Page 05"
    },

    {
        file:
            "IMG_20261006_193525_532.webp",

        title:
            "Written Page 06"
    },

    {
        file:
            "IMG_20261006_193516_352.webp",

        title:
            "Written Page 07"
    },

    {
        file:
            "IMG_20261006_193503_673.webp",

        title:
            "Written Page 08"
    },

    {
        file:
            "IMG_20261005_012646332_HDR~2.jpg",

        title:
            "Written Page 09"
    },

    {
        file:
            "IMG_20260928_025833148_HDR~2.jpg",

        title:
            "Written Page 10"
    },

    {
        file:
            "IMG_20260928_025657503_HDR.jpg",

        title:
            "Written Page 11"
    }

];



/* =========================================================
   GALLERY ELEMENTS
========================================================= */

const artGallery =
    document.getElementById(
        "artGallery"
    );

const poetryGallery =
    document.getElementById(
        "poetryGallery"
    );



/* =========================================================
   LIGHTBOX ELEMENTS
========================================================= */

const lightbox =
    document.getElementById(
        "lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxCaption =
    document.getElementById(
        "lightboxCaption"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );



/* =========================================================
   OPEN LIGHTBOX
========================================================= */

function openLightbox(
    filename,
    title
) {

    lightboxImage.src =
        imagePath(filename);

    lightboxImage.alt =
        title;

    lightboxCaption.textContent =
        title;


    lightbox.classList.add(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "no-scroll"
    );

}



/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "no-scroll"
    );


    setTimeout(
        () => {

            lightboxImage.src = "";

        },
        250
    );

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


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }

    }
);



/* =========================================================
   CREATE IMAGE CARD
========================================================= */

function createImageCard(
    item,
    index,
    type
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        type === "art"
            ? "art-card"
            : "poetry-card";


    const img =
        document.createElement(
            "img"
        );


    img.src =
        imagePath(
            item.file
        );


    img.alt =
        item.title;


    img.loading =
        index < 4
            ? "eager"
            : "lazy";


    img.decoding =
        "async";


    /*
       If an image fails, show a clean
       diagnostic card instead of a
       broken image icon.
    */

    img.onerror =
        () => {

            card.classList.add(
                "image-error"
            );


            card.innerHTML = `

                <div style="
                    width:100%;
                    height:100%;
                    min-height:260px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    padding:30px;
                    text-align:center;
                    background:#17161b;
                    color:#aaa;
                    font-family:monospace;
                    font-size:10px;
                    line-height:1.7;
                    letter-spacing:.06em;
                ">

                    IMAGE COULD NOT BE LOADED<br><br>

                    ${item.file}

                </div>

            `;

        };


    const info =
        document.createElement(
            "div"
        );


    info.className =
        type === "art"
            ? "art-card-info"
            : "poetry-card-info";


    const number =
        String(index + 1)
            .padStart(2, "0");


    info.innerHTML = `

        <div>

            <span>
                ${type === "art"
                    ? "ART"
                    : "POETRY"}
                / ${number}
            </span>

            <span>
                VIEW ↗
            </span>

        </div>

    `;


    card.appendChild(img);

    card.appendChild(info);


    card.addEventListener(
        "click",
        () => {

            openLightbox(
                item.file,
                item.title
            );

        }
    );


    return card;

}



/* =========================================================
   RENDER ART
========================================================= */

artCollection.forEach(
    (item, index) => {

        artGallery.appendChild(
            createImageCard(
                item,
                index,
                "art"
            )
        );

    }
);



/* =========================================================
   RENDER POETRY
========================================================= */

poetryCollection.forEach(
    (item, index) => {

        poetryGallery.appendChild(
            createImageCard(
                item,
                index,
                "poetry"
            )
        );

    }
);



/* =========================================================
   MIRA
========================================================= */

const miraButton =
    document.getElementById(
        "miraButton"
    );

const miraPanel =
    document.getElementById(
        "miraPanel"
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

const miraChat =
    document.getElementById(
        "miraChat"
    );



/* =========================================================
   MIRA OPEN / CLOSE
========================================================= */

function openMira() {

    miraPanel.classList.add(
        "open"
    );


    setTimeout(
        () => {

            miraInput.focus();

        },
        250
    );

}


function closeMira() {

    miraPanel.classList.remove(
        "open"
    );

}


miraButton.addEventListener(
    "click",
    () => {

        if (
            miraPanel.classList.contains(
                "open"
            )
        ) {

            closeMira();

        } else {

            openMira();

        }

    }
);


miraClose.addEventListener(
    "click",
    closeMira
);



/* =========================================================
   MIRA KNOWLEDGE
========================================================= */

const miraKnowledge = {

    identity: {

        keywords: [
            "who",
            "shreeyans",
            "about him",
            "about shreeyans",
            "what does he do"
        ],

        answer:
            "Shreeyans is an engineering aspirant and creative technologist interested in front-end development, creative coding, interactive 3D experiences, physics, mathematics, art and writing."

    },


    projects: {

        keywords: [
            "project",
            "projects",
            "work",
            "built",
            "particle",
            "camlab",
            "unity",
            "game"
        ],

        answer:
            "His work includes a real-time hand-gesture 3D particle system, Camlab, and a Unity-based 3D game development experiment. The particle system is a strong example of his interest in combining technical logic with interactive visual experiences."

    },


    skills: {

        keywords: [
            "skill",
            "skills",
            "technology",
            "technologies",
            "coding",
            "code",
            "programming",
            "javascript",
            "python",
            "three",
            "webgl"
        ],

        answer:
            "His current skills include HTML, CSS, JavaScript and Python. He is also developing his abilities with Three.js, WebGL, creative coding, UI/UX and interactive web animation."

    },


    art: {

        keywords: [
            "art",
            "arts",
            "artwork",
            "drawing",
            "drawings",
            "sketch",
            "sketches",
            "visual"
        ],

        answer:
            "The Art collection contains 10 visual works, ranging from sketches and visual studies to personal experiments. They are presented separately from his poetry archive.",

        target: "#art"

    },


    poetry: {

        keywords: [
            "poetry",
            "poem",
            "poems",
            "writing",
            "written",
            "poetry pages",
            "poetic"
        ],

        answer:
            "The Poetry collection contains 11 pages of handwritten writing and observations. They are presented as a separate collection from the visual artwork.",

        target: "#poetry"

    },


    creative: {

        keywords: [
            "creative",
            "creative archive",
            "archive"
        ],

        answer:
            "The Creative Archive has two separate collections: Art, with 10 visual works, and Poetry, with 11 handwritten pages.",

        target: "#archive"

    },


    thinking: {

        keywords: [
            "think",
            "thinking",
            "approach",
            "problem",
            "problem solving",
            "logic",
            "learn"
        ],

        answer:
            "His approach is to break complicated things down to their fundamentals, understand the logic behind them, then rebuild and refine. He prefers understanding over blindly following shortcuts."

    },


    future: {

        keywords: [
            "future",
            "goal",
            "goals",
            "dream",
            "career",
            "next"
        ],

        answer:
            "His long-term direction is engineering combined with software and creative technology. He is particularly interested in advanced 3D web development, GLSL shaders, WebGL, browser simulations, performance and immersive interfaces.",

        target: "#future"

    },


    physics: {

        keywords: [
            "physics",
            "math",
            "mathematics",
            "jee",
            "engineering"
        ],

        answer:
            "Physics and mathematics form an important foundation for his engineering preparation and problem-solving approach."

    },


    contact: {

        keywords: [
            "contact",
            "email",
            "mail",
            "reach"
        ],

        answer:
            "You can reach Shreeyans at Shreeyansraj463@gmail.com. His GitHub and X profiles are also linked in the Contact section.",

        target: "#contact"

    }

};



/* =========================================================
   NORMALIZE
========================================================= */

function normalize(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}



/* =========================================================
   FIND MIRA RESPONSE
========================================================= */

function getMiraResponse(
    question
) {

    const text =
        normalize(question);


    let bestMatch = null;

    let bestScore = 0;


    Object.values(
        miraKnowledge
    ).forEach(
        category => {

            let score = 0;


            category.keywords.forEach(
                keyword => {

                    const normalized =
                        normalize(keyword);


                    if (
                        text.includes(
                            normalized
                        )
                    ) {

                        score +=
                            normalized.split(" ").length;

                    }

                }
            );


            if (
                score > bestScore
            ) {

                bestScore =
                    score;

                bestMatch =
                    category;

            }

        }
    );


    if (bestMatch) {

        return bestMatch;

    }


    return {

        answer:
            "I don't have a specific answer for that yet. Try asking me about his projects, skills, art, poetry, thinking style or future direction.",

        target: null

    };

}



/* =========================================================
   MIRA MESSAGE
========================================================= */

function addMiraMessage(
    text,
    type,
    target = null,
    label = null
) {

    const bubble =
        document.createElement(
            "div"
        );


    bubble.className =
        `mira-bubble ${type}`;


    bubble.textContent =
        text;


    if (
        target &&
        type === "mira"
    ) {

        const source =
            document.createElement(
                "button"
            );


        source.className =
            "mira-source";


        source.textContent =
            `View ${label || "section"} →`;


        source.addEventListener(
            "click",
            () => {

                closeMira();


                const destination =
                    document.querySelector(
                        target
                    );


                if (
                    !destination
                ) return;


                destination.scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "start"
                    }
                );

            }
        );


        bubble.appendChild(
            source
        );

    }


    miraChat.appendChild(
        bubble
    );


    miraChat.scrollTop =
        miraChat.scrollHeight;

}



/* =========================================================
   ASK MIRA
========================================================= */

function askMira(
    question
) {

    const clean =
        question.trim();


    if (!clean) return;


    addMiraMessage(
        clean,
        "user"
    );


    miraInput.value = "";


    const result =
        getMiraResponse(
            clean
        );


    let label = null;


    if (
        result.target === "#art"
    ) {

        label = "Art";

    } else if (
        result.target === "#poetry"
    ) {

        label = "Poetry";

    } else if (
        result.target === "#archive"
    ) {

        label = "Creative Archive";

    } else if (
        result.target === "#work"
    ) {

        label = "Projects";

    } else if (
        result.target === "#future"
    ) {

        label = "Future";

    } else if (
        result.target === "#contact"
    ) {

        label = "Contact";

    }


    setTimeout(
        () => {

            addMiraMessage(
                result.answer,
                "mira",
                result.target,
                label
            );

        },
        300
    );

}



/* =========================================================
   MIRA FORM
========================================================= */

miraForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        askMira(
            miraInput.value
        );

    }
);



/* =========================================================
   MIRA QUICK QUESTIONS
========================================================= */

document
    .querySelectorAll(
        ".mira-quick button"
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



/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMira();

            closeLightbox();

        }

    }
);



/* =========================================================
   ACTIVE NAV
========================================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        !entry.isIntersecting
                    ) return;


                    navLinks.forEach(
                        link => {

                            link.style.color =
                                "";


                            if (
                                link.getAttribute(
                                    "href"
                                ) ===
                                `#${entry.target.id}`
                            ) {

                                link.style.color =
                                    "#b89a5a";

                            }

                        }
                    );

                }
            );

        },
        {
            rootMargin:
                "-40% 0px -50% 0px"
        }
    );


sections.forEach(
    section =>
        observer.observe(
            section
        )
);
