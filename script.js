/* =========================================
   PAGE LOADER
========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {
        document
            .querySelector(".page-loader")
            .classList.add("loaded");
    }, 500);

});


/* =========================================
   HEADER
========================================= */

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");

    });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".section, .project, .state-card, .statement-section, .writing-card, .art-item, .future-inner, .contact-layout"
);


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal");
                requestAnimationFrame(() => {
                    entry.target.classList.add("visible");
                });

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.08
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================
   ART LIGHTBOX
========================================= */

const artLightbox = document.querySelector(".art-lightbox");
const artLightboxImage = artLightbox.querySelector("img");
const artLightboxTitle = artLightbox.querySelector(
    ".lightbox-caption span"
);

const artItems = document.querySelectorAll(".art-item");


artItems.forEach(item => {

    item.addEventListener("click", () => {

        const image = item.dataset.image;
        const title = item.dataset.title;

        artLightboxImage.src = image;
        artLightboxImage.alt = title;
        artLightboxTitle.textContent = title;

        artLightbox.classList.add("active");
        document.body.classList.add("no-scroll");

    });

});


document
    .querySelector(".lightbox-close")
    .addEventListener("click", closeArt);


function closeArt() {

    artLightbox.classList.remove("active");
    document.body.classList.remove("no-scroll");

    setTimeout(() => {
        artLightboxImage.src = "";
    }, 400);

}


artLightbox.addEventListener("click", event => {

    if (event.target === artLightbox) {
        closeArt();
    }

});


/* =========================================
   WRITING ARCHIVE
========================================= */

/*
    Replace these texts later with the exact
    poetry from your uploaded pages.

    The design is already ready.
*/

const writings = {

    "writing-01": {
        number: "01",
        title: "Years Ago",
        content: `
            <p>
                Years ago, it was a trivial, petulant dispute
                between best friends, who, being young and careless,
                never thought that it could evolve into something
                that would change their lives forever.
            </p>

            <p>
                They bickered about some inconsequential thing
                only best friends could discuss for hours, if not days.
            </p>

            <p>
                “I'll go first,” she said.
            </p>

            <p>
                Not that she believed it, for in her petulant
                whisper there was an echo of resolution, a promise
                that neither of them yet understood.
            </p>
        `
    },


    "writing-02": {
        number: "02",
        title: "Untitled I",
        content: `
            <p>
                Some thoughts are easier to write than to say.
            </p>

            <p>
                They remain somewhere between silence and paper,
                waiting for the right moment to become words.
            </p>
        `
    },


    "writing-03": {
        number: "03",
        title: "Untitled II",
        content: `
            <p>
                There are moments that seem ordinary while
                they are happening, only becoming important
                much later.
            </p>
        `
    },


    "writing-04": {
        number: "04",
        title: "Untitled III",
        content: `
            <p>
                Maybe unfinished thoughts deserve a place too.
            </p>

            <p>
                Not everything needs to become a conclusion.
            </p>
        `
    },


    "writing-05": {
        number: "05",
        title: "Untitled IV",
        content: `
            <p>
                A page begins with a thought.
                Sometimes the thought never decides
                what it wants to become.
            </p>
        `
    },


    "writing-06": {
        number: "06",
        title: "Untitled V",
        content: `
            <p>
                Small observations can stay with us
                longer than important conversations.
            </p>
        `
    },


    "writing-07": {
        number: "07",
        title: "Untitled VI",
        content: `
            <p>
                Some words are never meant to be loud.
            </p>

            <p>
                They exist simply because someone
                needed to write them.
            </p>
        `
    },


    "writing-08": {
        number: "08",
        title: "Untitled VII",
        content: `
            <p>
                Another page from the archive.
            </p>

            <p>
                Another thought that refused to disappear.
            </p>
        `
    },


    "writing-09": {
        number: "09",
        title: "Untitled VIII",
        content: `
            <p>
                Sometimes writing is nothing more
                than trying to remember exactly
                how something felt.
            </p>
        `
    },


    "writing-10": {
        number: "10",
        title: "Untitled IX",
        content: `
            <p>
                Memory rarely keeps things in order.
                Maybe that is what makes it beautiful.
            </p>
        `
    },


    "writing-11": {
        number: "11",
        title: "Untitled X",
        content: `
            <p>
                The archive ends here for now.
            </p>

            <p>
                The writing does not.
            </p>
        `
    }

};


/* =========================================
   WRITING READER
========================================= */

const writingReader = document.querySelector(".writing-reader");

const readerNumber =
    document.querySelector("#reader-number");

const readerTitle =
    document.querySelector("#reader-title");

const readerContent =
    document.querySelector("#reader-content");


document.querySelectorAll(".writing-card").forEach(card => {

    const button = card.querySelector("button");

    button.addEventListener("click", () => {

        const id = card.dataset.writing;
        const writing = writings[id];

        if (!writing) return;

        readerNumber.textContent = writing.number;
        readerTitle.textContent = writing.title;
        readerContent.innerHTML = writing.content;

        writingReader.classList.add("active");

        document.body.classList.add("no-scroll");

    });

});


document
    .querySelector(".reader-close")
    .addEventListener("click", closeReader);


function closeReader() {

    writingReader.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


writingReader.addEventListener("click", event => {

    if (event.target === writingReader) {
        closeReader();
    }

});


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    closeArt();
    closeReader();

    mobileMenu.classList.remove("active");
    document.body.classList.remove("no-scroll");

});


/* =========================================
   IMAGE ERROR HANDLING
========================================= */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        img.style.background = "#141319";

        console.warn(
            `Image not found: ${img.getAttribute("src")}`
        );

    });

});


/* =========================================
   SMOOTH INTERNAL NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetID = link.getAttribute("href");

        if (targetID === "#") return;

        const target = document.querySelector(targetID);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});
