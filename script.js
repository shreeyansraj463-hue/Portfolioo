/* =========================================================
   PORTFOLIO SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ART COLLECTION
  ======================================================== */

  const art = [
    "20260126_150411.jpg",
    "IMG-20250829-WA0008.jpg",
    "IMG_20251019_003614078_HDR.jpg",
    "IMG_20251019_003637605_HDR.jpg",
    "IMG_20251019_004046619_HDR~2.jpg",
    "IMG_20251117_032352_534.jpg",
    "IMG_20251117_032354_002.jpg",
    "IMG_20251117_032357_284.jpg",
    "IMG_20251117_032405_870.jpg",
    "IMG_20260607_184756768.jpg"
  ];


  /* =======================================================
     POETRY COLLECTION
  ======================================================== */

  const poetry = [
    "Screenshot_20261007-045758_Files by Google.png",
    "Screenshot_20261007-045745_Files by Google.png",
    "Screenshot_20261007-045733_Files by Google.png",
    "Screenshot_20261007-045720_Files by Google.png",
    "Screenshot_20261007-045706_Files by Google.png",
    "IMG_20261006_193525_532.webp",
    "IMG_20261006_193516_352.webp",
    "IMG_20261006_193503_673.webp",
    "IMG_20261005_012646332_HDR~2.jpg",
    "IMG_20260928_025833148_HDR~2.jpg",
    "IMG_20260928_025657503_HDR.jpg"
  ];


  /* =======================================================
     IMAGE PATH
  ======================================================== */

  function imagePath(filename) {
    return "./" +
      filename
        .split("/")
        .map(part => encodeURIComponent(part))
        .join("/");
  }


  /* =======================================================
     GALLERY RENDER
  ======================================================== */

  const artGallery = document.getElementById("artGallery");
  const poetryGallery = document.getElementById("poetryGallery");

  function createImageItem(filename, type, index) {

    const item = document.createElement("button");

    item.type = "button";
    item.className =
      type === "art"
        ? "art-item"
        : "poetry-item";

    item.setAttribute(
      "aria-label",
      `Open ${type} ${index + 1}`
    );

    const image = document.createElement("img");

    image.src = imagePath(filename);

    image.alt =
      type === "art"
        ? `Artwork ${index + 1}`
        : `Poetry piece ${index + 1}`;

    image.loading = "lazy";
    image.decoding = "async";

    image.onerror = () => {
      item.style.display = "none";
      console.warn("Image could not be loaded:", filename);
    };

    item.appendChild(image);

    item.addEventListener("click", () => {
      openLightbox(image.src, image.alt);
    });

    return item;
  }


  art.forEach((filename, index) => {
    artGallery.appendChild(
      createImageItem(filename, "art", index)
    );
  });


  poetry.forEach((filename, index) => {
    poetryGallery.appendChild(
      createImageItem(filename, "poetry", index)
    );
  });


  /* =======================================================
     LIGHTBOX
  ======================================================== */

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, alt) {

    lightboxImage.src = src;
    lightboxImage.alt = alt;

    lightbox.classList.add("open");

    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {

    lightbox.classList.remove("open");

    document.body.style.overflow = "";

    setTimeout(() => {
      if (!lightbox.classList.contains("open")) {
        lightboxImage.src = "";
      }
    }, 300);
  }

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeLightbox();
    }

  });


  /* =======================================================
     SCROLL REVEALS
  ======================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            const delay =
              entry.target.dataset.delay || 0;

            setTimeout(() => {
              entry.target.classList.add("visible");
            }, Number(delay));

            revealObserver.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


  revealElements.forEach((element, index) => {

    element.dataset.delay =
      Math.min((index % 5) * 70, 280);

    revealObserver.observe(element);

  });


  /* =======================================================
     NAVIGATION
  ======================================================== */

  const mobileMenu =
    document.querySelector(".mobile-menu");

  const mobileNav =
    document.querySelector(".mobile-nav");

  mobileMenu.addEventListener("click", () => {

    mobileNav.classList.toggle("open");

  });


  mobileNav
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
      });

    });


  /* =======================================================
     SUBTLE HERO PARALLAX
  ======================================================== */

  const hero =
    document.querySelector(".hero");

  const heroContent =
    document.querySelector(".hero-content");

  const heroMark =
    document.querySelector(".hero-mark");

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener("mousemove", event => {

    mouseX =
      (event.clientX / window.innerWidth - .5);

    mouseY =
      (event.clientY / window.innerHeight - .5);

  });


  function animateParallax() {

    currentX +=
      (mouseX - currentX) * .025;

    currentY +=
      (mouseY - currentY) * .025;

    if (heroContent) {

      heroContent.style.transform =
        `translate3d(
          ${currentX * -5}px,
          ${currentY * -4}px,
          0
        )`;

    }

    if (heroMark) {

      heroMark.style.transform =
        `translate3d(
          ${currentX * 20}px,
          ${currentY * 20}px,
          0
        )`;

    }

    requestAnimationFrame(animateParallax);
  }

  animateParallax();


  /* =======================================================
     PROJECT TILT
  ======================================================== */

  const projectVisuals =
    document.querySelectorAll(".project-visual");

  projectVisuals.forEach(visual => {

    visual.addEventListener("mousemove", event => {

      const rect =
        visual.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width -
        .5;

      const y =
        (event.clientY - rect.top) /
        rect.height -
        .5;

      visual.style.transform =
        `perspective(1000px)
         rotateX(${y * -2.5}deg)
         rotateY(${x * 2.5}deg)`;

    });


    visual.addEventListener("mouseleave", () => {

      visual.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0)";

    });

  });


  /* =======================================================
     MIRA
  ======================================================== */

  const miraRoot =
    document.querySelector(".mira-root");

  const miraOrb =
    document.getElementById("miraOrb");

  const miraPanel =
    document.getElementById("miraPanel");

  const miraClose =
    document.getElementById("miraClose");

  const miraForm =
    document.getElementById("miraForm");

  const miraInput =
    document.getElementById("miraInput");

  const miraMessages =
    document.getElementById("miraMessages");

  const quickButtons =
    document.querySelectorAll(".mira-quick button");


  function openMira() {

    miraRoot.classList.add("open");

    miraOrb.setAttribute(
      "aria-expanded",
      "true"
    );

    document.body.classList.add("mira-open");

    setTimeout(() => {
      miraInput.focus();
    }, 450);

  }


  function closeMira() {

    miraRoot.classList.remove("open");

    miraOrb.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove("mira-open");

  }


  miraOrb.addEventListener("click", openMira);

  miraClose.addEventListener("click", closeMira);


  /* =======================================================
     MIRA KNOWLEDGE
  ======================================================== */

  const knowledge = {

    intro:
      "Shreeyans is an engineering aspirant and creative technologist interested in front-end development, creative coding, interactive experiences, physics, visual art and writing.",

    projects:
      "His main projects include a real-time hand-gesture 3D particle system using Three.js and MediaPipe, Camlab, an interactive front-end laboratory, and a Unity 3D multiplayer game starter.",

    bestProject:
      "The Hand-Gesture 3D Particle System probably represents him best. It combines webcam interaction, MediaPipe Hands, Three.js, WebGL and real-time visual behaviour.",

    skills:
      "He works with HTML, CSS and JavaScript comfortably, uses Python, is developing his Three.js and creative coding skills, and has a strong foundation in physics and mathematics. He is also interested in UI, UX, writing and sketching.",

    art:
      "The Creative Archive contains his artwork and visual experiments. He uses sketching and visual work as a creative outlet outside programming.",

    poetry:
      "His poetry collection includes pieces such as From Bloom to Dusk, Uneven Promise and Before it was Plucked. His writing tends to explore time, change, relationships and observation.",

    thinking:
      "His approach is to break complicated things down to their fundamentals, understand the logic, build a solution and then refine it rather than relying on brute force.",

    future:
      "He wants to move deeper into advanced 3D web development, GLSL shaders, complex geometry, performance optimisation and immersive interactive digital experiences.",

    physics:
      "Physics is an important part of his interests and JEE preparation. He enjoys going beyond exam-level understanding and exploring how physical ideas connect with computation and visualisation.",

    music:
      "Music is one of his creative outlets. His interests span artists and styles ranging from KK and Nusrat Fateh Ali Khan to John Mayer and The Weeknd.",

    current:
      "Right now the main focus is JEE preparation, front-end development, creative coding and improving his ability to build polished interactive experiences."

  };


  function getMiraResponse(question) {

    const q =
      question
        .toLowerCase()
        .trim();


    if (
      q.includes("best project") ||
      q.includes("favorite project") ||
      q.includes("favourite project")
    ) {
      return knowledge.bestProject;
    }


    if (
      q.includes("project") ||
      q.includes("build") ||
      q.includes("built")
    ) {
      return knowledge.projects;
    }


    if (
      q.includes("skill") ||
      q.includes("code") ||
      q.includes("language") ||
      q.includes("technology") ||
      q.includes("tech stack")
    ) {
      return knowledge.skills;
    }


    if (
      q.includes("art") ||
      q.includes("drawing") ||
      q.includes("sketch")
    ) {
      return knowledge.art;
    }


    if (
      q.includes("poem") ||
      q.includes("poetry") ||
      q.includes("writing")
    ) {
      return knowledge.poetry;
    }


    if (
      q.includes("think") ||
      q.includes("approach") ||
      q.includes("process")
    ) {
      return knowledge.thinking;
    }


    if (
      q.includes("future") ||
      q.includes("goal") ||
      q.includes("want to")
    ) {
      return knowledge.future;
    }


    if (
      q.includes("physics") ||
      q.includes("jee") ||
      q.includes("math")
    ) {
      return knowledge.physics;
    }


    if (
      q.includes("music") ||
      q.includes("song") ||
      q.includes("listen")
    ) {
      return knowledge.music;
    }


    if (
      q.includes("now") ||
      q.includes("current") ||
      q.includes("focus")
    ) {
      return knowledge.current;
    }


    if (
      q.includes("who") ||
      q.includes("about") ||
      q.includes("shreeyans") ||
      q.includes("yourself")
    ) {
      return knowledge.intro;
    }


    if (
      q.includes("hello") ||
      q.includes("hi") ||
      q.includes("hey")
    ) {
      return "Hey. I'm Mira. Ask me anything about the work, the ideas behind it, or the person building it.";
    }


    return "I can tell you about the projects, skills, creative archive, poetry, thinking process, current focus or future direction. Try asking me about one of those.";
  }


  function addMessage(text, type) {

    const message =
      document.createElement("div");

    message.className =
      `mira-message ${type}`;

    message.textContent = text;

    miraMessages.appendChild(message);

    miraMessages.scrollTop =
      miraMessages.scrollHeight;

  }


  function askMira(question) {

    if (!question.trim()) return;

    addMessage(question, "user");

    miraInput.value = "";

    setTimeout(() => {

      const response =
        getMiraResponse(question);

      addMessage(response, "bot");

    }, 500);

  }


  miraForm.addEventListener("submit", event => {

    event.preventDefault();

    askMira(miraInput.value);

  });


  quickButtons.forEach(button => {

    button.addEventListener("click", () => {

      askMira(
        button.dataset.question
      );

    });

  });


  /* =======================================================
     CLOSE MIRA WITH ESC
  ======================================================== */

  document.addEventListener("keydown", event => {

    if (
      event.key === "Escape" &&
      miraRoot.classList.contains("open")
    ) {

      closeMira();

    }

  });


  /* =======================================================
     MIRA INTRO
  ======================================================== */

  setTimeout(() => {

    if (!sessionStorage.getItem("miraIntroduced")) {

      miraOrb.animate(
        [
          {
            transform: "scale(1)"
          },
          {
            transform: "scale(1.16)"
          },
          {
            transform: "scale(1)"
          }
        ],
        {
          duration: 900,
          easing: "ease-out"
        }
      );

      sessionStorage.setItem(
        "miraIntroduced",
        "true"
      );

    }

  }, 1800);


  /* =======================================================
     MIRA ORB MOUSE RESPONSE
  ======================================================== */

  miraOrb.addEventListener("mousemove", event => {

    const rect =
      miraOrb.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width -
      .5;

    const y =
      (event.clientY - rect.top) /
      rect.height -
      .5;

    miraOrb.querySelector(".mira-orb").style.transform =
      `translate(
        ${x * 5}px,
        ${y * 5}px
      ) scale(1.05)`;

  });


  miraOrb.addEventListener("mouseleave", () => {

    miraOrb.querySelector(".mira-orb").style.transform =
      "";

  });


  /* =======================================================
     SCROLL DEPTH
  ======================================================== */

  const goldGlowOne =
    document.querySelector(".glow-one");

  const goldGlowTwo =
    document.querySelector(".glow-two");

  window.addEventListener(
    "scroll",
    () => {

      const scroll =
        window.scrollY;

      if (goldGlowOne) {

        goldGlowOne.style.transform =
          `translateY(${scroll * .025}px)`;

      }

      if (goldGlowTwo) {

        goldGlowTwo.style.transform =
          `translateY(${-scroll * .018}px)`;

      }

    },
    { passive: true }
  );


});
