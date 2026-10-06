/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .querySelector(".page-loader")
            .classList.add("loaded");

    }, 500);

});


/* =========================================================
   HEADER
========================================================= */

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.querySelector(".menu-button");

const mobileMenu =
    document.querySelector(".mobile-menu");


menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    document.body.classList.toggle("no-scroll");

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            document.body.classList.remove("no-scroll");

        });

    });


/* =========================================================
   ART + POETRY IMAGE LIGHTBOX
========================================================= */

const lightbox =
    document.querySelector(".art-lightbox");

const lightboxImage =
    lightbox.querySelector("img");

const lightboxTitle =
    lightbox.querySelector(".lightbox-caption span");


const imageItems = document.querySelectorAll(
    ".art-item, .poetry-image"
);


imageItems.forEach(item => {

    item.addEventListener("click", () => {

        const image =
            item.dataset.image;

        const title =
            item.dataset.title || "Creative Archive";


        lightboxImage.src = image;

        lightboxImage.alt = title;

        lightboxTitle.textContent = title;


        lightbox.classList.add("active");

        document.body.classList.add("no-scroll");

    });

});


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


document
    .querySelector(".lightbox-close")
    .addEventListener("click", closeLightbox);


lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* =========================================================
   ORIGINAL POETRY
========================================================= */

const writings = {

    bloom: {

        number: "01",

        title: "From Bloom to Dusk",

        content: `

            <p>
                I saw a flower blooming,
            </p>

            <p>
                As the morning sky made itself look clean and grooming.
            </p>

            <p>
                The day before, it had just budded,
            </p>

            <p>
                As the morning red turned white when the light flooded.
            </p>

            <p>
                Now it is fully grown;
            </p>

            <p>
                Now it is noon, and the sun has brightly shone.
            </p>

            <p>
                As time passes, the flower withers;
            </p>

            <p>
                Now it is evening, and the light slowly dithers.
            </p>

            <div class="reader-signature">
                — SHREEYANS RAJ
            </div>

        `

    },


    promise: {

        number: "02",

        title: "Uneven Promise",

        content: `

            <p>
                We had batted just a few days ago.
            </p>

            <p>
                You were my opposite.
            </p>

            <p>
                You won.
            </p>

            <div class="reader-signature">
                — SHREEYANS RAJ
            </div>

        `

    },


    plucked: {

        number: "03",

        title: "Before it was plucked",

        content: `

            <p>
                A gardener planted a mango seed,
            </p>

            <p>
                Grown with care to fill a need.
            </p>

            <p>
                Now comes the time to take its fee,
            </p>

            <p>
                Yet neither is ready to let the fruit be free.
            </p>

            <div class="reader-signature">
                — SHREEYANS RAJ
            </div>

        `

    }

};


/* =========================================================
   WRITING READER
========================================================= */

const reader =
    document.querySelector(".writing-reader");

const readerNumber =
    document.querySelector("#reader-number");

const readerTitle =
    document.querySelector("#reader-title");

const readerContent =
    document.querySelector("#reader-content");


document
    .querySelectorAll(".read-writing")
    .forEach(button => {

        button.addEventListener("click", () => {

            const key =
                button.dataset.writing;

            const writing =
                writings[key];


            if (!writing) return;


            readerNumber.textContent =
                writing.number;

            readerTitle.textContent =
                writing.title;

            readerContent.innerHTML =
                writing.content;


            reader.classList.add("active");

            document.body.classList.add("no-scroll");

        });

    });


function closeReader() {

    reader.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


document
    .querySelector(".reader-close")
    .addEventListener("click", closeReader);


reader.addEventListener("click", event => {

    if (event.target === reader) {

        closeReader();

    }

});


/* =========================================================
   PERSONAL ASSISTANT
========================================================= */

const assistantPanel =
    document.querySelector(".assistant-panel");

const assistantTrigger =
    document.querySelector(".assistant-trigger");

const assistantClose =
    document.querySelector(".assistant-close");

const mobileAssistant =
    document.querySelector(".mobile-assistant");

const assistantMessages =
    document.querySelector("#assistantMessages");

const assistantForm =
    document.querySelector(".assistant-form");

const assistantInput =
    document.querySelector("#assistantInput");


/* ---------------------------------------------------------
   OPEN
--------------------------------------------------------- */

function openAssistant() {

    assistantPanel.classList.add("active");

    document.body.classList.add("no-scroll");

    if (assistantMessages.children.length === 0) {

        addAssistantMessage(
            "Ask me anything about Shreeyans, his projects, art, writing, interests or what he is currently exploring."
        );

    }

    setTimeout(() => {

        assistantInput.focus();

    }, 350);

}


assistantTrigger.addEventListener(
    "click",
    openAssistant
);


mobileAssistant.addEventListener(
    "click",
    () => {

        mobileMenu.classList.remove("active");

        document.body.classList.remove("no-scroll");

        openAssistant();

    }
);


/* ---------------------------------------------------------
   CLOSE
--------------------------------------------------------- */

function closeAssistant() {

    assistantPanel.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


assistantClose.addEventListener(
    "click",
    closeAssistant
);


/* ---------------------------------------------------------
   MESSAGE FUNCTIONS
--------------------------------------------------------- */

function addUserMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "message user";

    message.textContent =
        text;


    assistantMessages.appendChild(message);

    scrollAssistant();

}


function addAssistantMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "message assistant";

    message.innerHTML =
        text;


    assistantMessages.appendChild(message);

    scrollAssistant();

}


function scrollAssistant() {

    assistantMessages.scrollTop =
        assistantMessages.scrollHeight;

}


/* ---------------------------------------------------------
   ASSISTANT KNOWLEDGE
--------------------------------------------------------- */

function assistantReply(question) {

    const q =
        question
            .toLowerCase()
            .trim();


    /* identity */

    if (
        q.includes("who is shreeyans") ||
        q.includes("who are you") ||
        q.includes("about shreeyans") ||
        q === "who is he"
    ) {

        return `
            <strong>Shreeyans Raj</strong> is an engineering
            aspirant and creative technologist who enjoys
            building interactive digital experiences.
            <br><br>
            His interests sit between engineering, creative
            coding, visual design, art and writing.
        `;

    }


    /* skills */

    if (
        q.includes("skill") ||
        q.includes("technology") ||
        q.includes("technologies") ||
        q.includes("code")
    ) {

        return `
            He works with HTML, CSS, JavaScript and Python,
            and is exploring Three.js, WebGL, creative coding,
            UI/UX, GLSL and shaders.
        `;

    }


    /* projects */

    if (
        q.includes("project") ||
        q.includes("build") ||
        q.includes("work")
    ) {

        return `
            His main projects include:
            <br><br>
            <strong>01</strong> Hand-Gesture 3D Particle System
            <br>
            <strong>02</strong> Camlab
            <br>
            <strong>03</strong> A 3D multiplayer game starter
            <br><br>
            The particle system represents his approach best
            because it combines computer vision, JavaScript
            and real-time 3D interaction.
        `;

    }


    /* particle */

    if (
        q.includes("particle") ||
        q.includes("three") ||
        q.includes("webgl")
    ) {

        return `
            His Hand-Gesture 3D Particle System uses
            Three.js and MediaPipe to create an interactive
            particle environment controlled by hand gestures.
            <br><br>
            <a href="https://shreeyansraj463-hue.github.io/3D-Particle-Playground/"
            target="_blank">
            Open the experience ↗
            </a>
        `;

    }


    /* art */

    if (
        q.includes("art") ||
        q.includes("draw") ||
        q.includes("drawing") ||
        q.includes("sketch")
    ) {

        return `
            Art is one of the quieter sides of his creative
            work. His archive contains sketches and visual
            experiments.
            <br><br>
            You can find them in the
            <strong>Beyond the Logic</strong> section of this
            portfolio.
        `;

    }


    /* writing */

    if (
        q.includes("writing") ||
        q.includes("poetry") ||
        q.includes("poem") ||
        q.includes("poems")
    ) {

        return `
            Shreeyans also writes poetry.
            <br><br>
            The current archive includes
            <strong>From Bloom to Dusk</strong>,
            <strong>Uneven Promise</strong> and
            <strong>Before it was plucked</strong>.
            <br><br>
            The original poetry pages are also preserved
            visually in the creative archive.
        `;

    }


    /* bloom */

    if (
        q.includes("bloom") ||
        q.includes("from bloom")
    ) {

        return `
            <strong>From Bloom to Dusk</strong> follows
            a flower through morning, noon and evening.
            <br><br>
            It uses the flower's life and the changing light
            as a simple metaphor for growth and fading.
        `;

    }


    /* current */

    if (
        q.includes("currently") ||
        q.includes("learning") ||
        q.includes("exploring") ||
        q.includes("focus")
    ) {

        return `
            Currently, his focus includes
            <strong>JEE preparation</strong>,
            <strong>Three.js</strong>,
            <strong>GLSL / shaders</strong>,
            <strong>UI/UX</strong> and
            <strong>creative coding</strong>.
        `;

    }


    /* future */

    if (
        q.includes("future") ||
        q.includes("goal") ||
        q.includes("want to")
    ) {

        return `
            He wants to work at the intersection of
            engineering, software and creative technology,
            eventually building sophisticated interactive
            digital experiences and high-performance systems.
        `;

    }


    /* music */

    if (
        q.includes("music") ||
        q.includes("song") ||
        q.includes("listen")
    ) {

        return `
            Music is another important creative influence.
            His taste ranges across artists such as KK,
            Nusrat Fateh Ali Khan, John Mayer and The Weeknd.
        `;

    }


    /* physics */

    if (
        q.includes("physics") ||
        q.includes("math")
    ) {

        return `
            Physics and mathematics are a major part of
            his engineering preparation, but he is also
            interested in physics beyond the syllabus and
            computational approaches to physical ideas.
        `;

    }


    /* personality */

    if (
        q.includes("personality") ||
        q.includes("think") ||
        q.includes("mindset")
    ) {

        return `
            His approach is fairly simple:
            break complex things down to fundamentals,
            understand the logic, experiment, and refine.
        `;

    }


    /* navigation */

    if (
        q.includes("contact") ||
        q.includes("email")
    ) {

        return `
            You can reach Shreeyans at:
            <br><br>
            <a href="mailto:Shreeyansraj463@gmail.com">
            Shreeyansraj463@gmail.com
            </a>
        `;

    }


    /* greeting */

    if (
        q === "hi" ||
        q === "hello" ||
        q === "hey" ||
        q.includes("good morning") ||
        q.includes("good evening")
    ) {

        return `
            Hey. 👋
            <br><br>
            What would you like to know about Shreeyans?
        `;

    }


    /* thanks */

    if (
        q.includes("thank") ||
        q.includes("thanks")
    ) {

        return `
            You're welcome.
            <br><br>
            There's plenty more to explore here.
        `;

    }


    /* fallback */

    return `
        I don't have an answer for that yet.
        <br><br>
        Try asking me about his
        <strong>projects</strong>,
        <strong>art</strong>,
        <strong>writing</strong>,
        <strong>skills</strong>,
        <strong>current focus</strong>,
        <strong>physics</strong> or
        <strong>future goals</strong>.
    `;

}


/* ---------------------------------------------------------
   FORM
--------------------------------------------------------- */

assistantForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const question =
            assistantInput.value.trim();


        if (!question) return;


        addUserMessage(question);


        assistantInput.value = "";


        setTimeout(() => {

            const answer =
                assistantReply(question);

            addAssistantMessage(answer);

        }, 350);

    }
);


/* ---------------------------------------------------------
   SUGGESTIONS
--------------------------------------------------------- */

document
    .querySelectorAll(".assistant-suggestions button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const question =
                button.dataset.question;

            addUserMessage(question);

            setTimeout(() => {

                addAssistantMessage(
                    assistantReply(question)
                );

            }, 250);

        });

    });


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;


    closeLightbox();

    closeReader();

    closeAssistant();


    mobileMenu.classList.remove("active");

    document.body.classList.remove("no-scroll");

});


/* =========================================================
   IMAGE ERROR CHECK
========================================================= */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener("error", () => {

            console.warn(
                "Image not found:",
                image.getAttribute("src")
            );

        });

    });


/* =========================================================
   INTERNAL LINKS
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            const id =
                link.getAttribute("href");

            if (id === "#") return;


            const target =
                document.querySelector(id);


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });
