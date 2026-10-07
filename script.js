document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =========================================================
     GLOBAL
  ========================================================= */

  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =========================================================
     PERSONAL PROFILE
  ========================================================= */

  const profileTrigger =
    document.getElementById("profileTrigger");

  const profileOverlay =
    document.getElementById("profileOverlay");

  const profileClose =
    document.getElementById("profileClose");

  const profileBackdrop =
    document.getElementById("profileBackdrop");


  function openProfile(){

    if(!profileOverlay) return;

    profileOverlay.classList.add("open");

    profileOverlay.setAttribute(
      "aria-hidden",
      "false"
    );

    profileTrigger?.setAttribute(
      "aria-expanded",
      "true"
    );

    document.body.classList.add(
      "locked"
    );

    window.setTimeout(() => {
      profileClose?.focus();
    }, 120);

  }


  function closeProfile(){

    if(!profileOverlay) return;

    profileOverlay.classList.remove(
      "open"
    );

    profileOverlay.setAttribute(
      "aria-hidden",
      "true"
    );

    profileTrigger?.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove(
      "locked"
    );

    profileTrigger?.focus();

  }


  profileTrigger?.addEventListener(
    "click",
    openProfile
  );

  profileClose?.addEventListener(
    "click",
    closeProfile
  );

  profileBackdrop?.addEventListener(
    "click",
    closeProfile
  );


  /* =========================================================
     ARCHIVE
  ========================================================= */

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


  function imagePath(file){

    return "./" +
      file
        .split("/")
        .map(
          part => encodeURIComponent(part)
        )
        .join("/");

  }


  function gallery(
    id,
    list,
    type
  ){

    const element =
      document.getElementById(id);

    if(!element) return;


    list.forEach((file,index) => {

      const button =
        document.createElement("button");

      const image =
        document.createElement("img");


      button.type = "button";

      image.src =
        imagePath(file);

      image.alt =
        `${type} ${index + 1}`;

      image.loading =
        "lazy";

      image.decoding =
        "async";


      button.appendChild(image);

      element.appendChild(button);


      button.addEventListener(
        "click",
        () => {

          openLightbox(
            image.src,
            `${type.toUpperCase()} · ${String(
              index + 1
            ).padStart(2,"0")}`
          );

        }
      );

    });

  }


  gallery(
    "artGallery",
    art,
    "Art"
  );

  gallery(
    "poetryGallery",
    poetry,
    "Poetry"
  );


  /* =========================================================
     REVEAL ANIMATIONS
  ========================================================= */

  const reveals = [
    ...document.querySelectorAll(".reveal")
  ];


  if(
    !reduced &&
    "IntersectionObserver" in window
  ){

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if(!entry.isIntersecting){
              return;
            }


            const siblings = [
              ...entry
                .target
                .parentElement
                .children
            ]
            .filter(
              element =>
                element.classList.contains(
                  "reveal"
                )
            );


            const index =
              Math.max(
                0,
                siblings.indexOf(
                  entry.target
                )
              );


            entry.target.style.transitionDelay =
              `${Math.min(
                index * 55,
                240
              )}ms`;


            entry.target.classList.add(
              "visible"
            );


            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold:.08,

          rootMargin:
            "0px 0px -45px 0px"
        }
      );


    reveals.forEach(
      element =>
        observer.observe(element)
    );

  }else{

    reveals.forEach(
      element =>
        element.classList.add(
          "visible"
        )
    );

  }


  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  const menu =
    document.getElementById("menu");

  const mobile =
    document.getElementById(
      "mobileMenu"
    );


  function closeMenu(){

    mobile?.classList.remove(
      "open"
    );

    menu?.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  function toggleMenu(){

    if(!mobile) return;

    const open =
      mobile.classList.toggle(
        "open"
      );


    menu?.setAttribute(
      "aria-expanded",
      String(open)
    );

  }


  menu?.addEventListener(
    "click",
    toggleMenu
  );


  mobile
    ?.querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });


  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  const navLinks = [
    ...document.querySelectorAll(
      ".nav-links a"
    )
  ];


  if(
    "IntersectionObserver" in window
  ){

    const navObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if(!entry.isIntersecting){
              return;
            }


            navLinks.forEach(
              link =>
                link.classList.remove(
                  "active"
                )
            );


            const active =
              navLinks.find(
                link =>
                  link.getAttribute(
                    "href"
                  ) ===
                  `#${entry.target.id}`
              );


            active?.classList.add(
              "active"
            );

          });

        },
        {
          rootMargin:
            "-38% 0px -55% 0px"
        }
      );


    [
      "about",
      "work",
      "archive",
      "thinking",
      "contact"
    ]
    .map(
      id =>
        document.getElementById(id)
    )
    .filter(Boolean)
    .forEach(
      section =>
        navObserver.observe(section)
    );

  }


  /* =========================================================
     CURSOR LIGHT
  ========================================================= */

  const cursor =
    document.querySelector(
      ".cursor-light"
    );


  if(
    cursor &&
    !reduced &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ){

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let frameRunning = false;


    window.addEventListener(
      "pointermove",
      event => {

        targetX =
          event.clientX;

        targetY =
          event.clientY;


        document.body.classList.add(
          "pointer"
        );


        if(frameRunning){
          return;
        }


        frameRunning = true;


        requestAnimationFrame(
          () => {

            currentX +=
              (targetX - currentX)
              * .16;

            currentY +=
              (targetY - currentY)
              * .16;


            cursor.style.left =
              `${currentX}px`;

            cursor.style.top =
              `${currentY}px`;


            frameRunning = false;

          }
        );

      },
      {
        passive:true
      }
    );

  }


  /* =========================================================
     PROJECT TILT
  ========================================================= */

  if(
    !reduced &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ){

    document
      .querySelectorAll(".project")
      .forEach(project => {

        const visual =
          project.querySelector(
            ".project-visual"
          );


        if(!visual){
          return;
        }


        project.addEventListener(
          "pointermove",
          event => {

            const rect =
              project.getBoundingClientRect();


            const px =
              (event.clientX - rect.left)
              / rect.width;


            const py =
              (event.clientY - rect.top)
              / rect.height;


            const rotateX =
              (0.5 - py) * 4;

            const rotateY =
              (px - 0.5) * 4;


            visual.style.transform =
              `perspective(1400px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)`;


            visual.style.setProperty(
              "--x",
              `${px * 100}%`
            );


            visual.style.setProperty(
              "--y",
              `${py * 100}%`
            );

          }
        );


        project.addEventListener(
          "pointerleave",
          () => {

            visual.style.transform =
              "perspective(1400px) rotateX(0deg) rotateY(0deg)";


            visual.style.setProperty(
              "--x",
              "50%"
            );


            visual.style.setProperty(
              "--y",
              "50%"
            );

          }
        );

      });

  }


  /* =========================================================
     LIGHTBOX
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


  function openLightbox(
    src,
    text
  ){

    if(!lightbox){
      return;
    }


    lightbox.classList.add(
      "open"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.classList.add(
      "locked"
    );


    if(lightboxImage){

      lightboxImage.src =
        src;

    }


    if(lightboxCaption){

      lightboxCaption.textContent =
        text;

    }

  }


  function closeLightbox(){

    if(!lightbox){
      return;
    }


    lightbox.classList.remove(
      "open"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "locked"
    );

  }


  document
    .getElementById(
      "lightboxClose"
    )
    ?.addEventListener(
      "click",
      closeLightbox
    );


  lightbox?.addEventListener(
    "click",
    event => {

      if(
        event.target === lightbox
      ){

        closeLightbox();

      }

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

  const messages =
    document.getElementById(
      "messages"
    );

  const typing =
    document.getElementById(
      "typing"
    );

  const miraForm =
    document.getElementById(
      "miraForm"
    );

  const miraInput =
    document.getElementById(
      "miraInput"
    );


  let miraOpen = false;

  let responseTimer = null;


  /* =========================================================
     MIRA KNOWLEDGE
  ========================================================= */

  const knowledge = {

    projects: {

      keys:[
        "project",
        "projects",
        "built",
        "work",
        "portfolio"
      ],

      text:
        "There are three featured projects. The Hand-Gesture 3D Particle System is the strongest representation of the current direction, using Three.js, MediaPipe Hands and WebGL. Camlab explores interface and motion design, while the Unity project explores 3D game systems and physics.",

      target:"#work",

      label:"View selected work"

    },


    particle: {

      keys:[
        "particle",
        "gesture",
        "hand",
        "three",
        "webgl",
        "mediapipe"
      ],

      text:
        "The Hand-Gesture 3D Particle System turns webcam hand movement into real-time interaction with a Three.js particle environment.",

      target:"#work",

      label:"View project"

    },


    camlab: {

      keys:[
        "camlab",
        "interface",
        "ui",
        "ux",
        "frontend"
      ],

      text:
        "Camlab is an experimental frontend project focused on interaction, smooth motion and visual presentation.",

      target:"#work",

      label:"View Camlab"

    },


    skills: {

      keys:[
        "skill",
        "skills",
        "technology",
        "coding",
        "programming",
        "language"
      ],

      text:
        "The portfolio covers HTML, CSS, JavaScript, Python, Three.js, WebGL, UI/UX, physics, mathematics, writing and sketching. The biggest technical growth area is advanced 3D web development.",

      target:"#capabilities",

      label:"View capabilities"

    },


    creative: {

      keys:[
        "art",
        "drawing",
        "draw",
        "sketch",
        "creative",
        "poem",
        "poetry",
        "writing"
      ],

      text:
        "The creative archive contains visual art and poetry. It represents the side of the work that is less about solving a problem and more about observing, expressing and experimenting.",

      target:"#archive",

      label:"Open creative archive"

    },


    thinking: {

      keys:[
        "think",
        "thinking",
        "logic",
        "problem",
        "fundamental",
        "approach"
      ],

      text:
        "The preferred approach is to break complicated problems down to fundamentals instead of brute-forcing them. Understanding why something works matters as much as making it work.",

      target:"#thinking",

      label:"See how he thinks"

    },


    future: {

      keys:[
        "future",
        "goal",
        "career",
        "direction",
        "college",
        "engineering",
        "next"
      ],

      text:
        "The long-term direction combines engineering with creative technology: advanced 3D web development, shaders, high-performance interfaces and immersive digital experiences.",

      target:"#future",

      label:"See the direction"

    },


    about: {

      keys:[
        "about",
        "who",
        "shreeyans",
        "person"
      ],

      text:
        "Shreeyans is an engineering aspirant interested in front-end development, coding, interactive experiences, physics, visual art, writing and music.",

      target:"#about",

      label:"Read about"

    },


    contact: {

      keys:[
        "contact",
        "email",
        "mail",
        "hire",
        "opportunity",
        "collaboration"
      ],

      text:
        "For opportunities, collaborations or interesting projects, the contact section contains the direct email address.",

      target:"#contact",

      label:"Go to contact"

    }

  };


  /* =========================================================
     MIRA OPEN / CLOSE
  ========================================================= */

  function openMira(){

    if(!miraPanel){
      return;
    }


    miraOpen = true;


    miraPanel.classList.add(
      "open"
    );


    miraButton?.setAttribute(
      "aria-expanded",
      "true"
    );


    if(!reduced){

      miraButton?.animate(
        [
          {
            transform:"scale(1)"
          },

          {
            transform:"scale(1.08)"
          },

          {
            transform:"scale(1)"
          }
        ],
        {
          duration:450,

          easing:"ease-out"
        }
      );

    }


    window.setTimeout(
      () => miraInput?.focus(),
      250
    );

  }


  function closeMira(){

    miraOpen = false;


    miraPanel?.classList.remove(
      "open"
    );


    miraButton?.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  /* =========================================================
     MIRA MESSAGE
  ========================================================= */

  function addMessage(
    text,
    type = "bot",
    source = null
  ){

    if(!messages){
      return;
    }


    const box =
      document.createElement(
        "div"
      );


    box.className =
      `message ${type}`;


    box.textContent =
      text;


    if(source){

      const breakLine =
        document.createElement(
          "br"
        );


      const sourceButton =
        document.createElement(
          "button"
        );


      sourceButton.type =
        "button";


      sourceButton.className =
        "source";


      sourceButton.textContent =
        source.label;


      sourceButton.addEventListener(
        "click",
        () => {

          closeMira();


          const target =
            document.querySelector(
              source.target
            );


          if(!target){
            return;
          }


          target.scrollIntoView({
            behavior:
              reduced
                ? "auto"
                : "smooth",

            block:"start"
          });


          if(
            !reduced &&
            target.animate
          ){

            target.animate(
              [
                {
                  boxShadow:
                    "inset 0 0 0 rgba(184,154,90,0)"
                },

                {
                  boxShadow:
                    "inset 0 0 100px rgba(184,154,90,.08)"
                },

                {
                  boxShadow:
                    "inset 0 0 0 rgba(184,154,90,0)"
                }
              ],
              {
                duration:1100
              }
            );

          }

        }
      );


      box.append(
        breakLine,
        sourceButton
      );

    }


    messages.appendChild(
      box
    );


    messages.scrollTo({
      top:messages.scrollHeight,

      behavior:
        reduced
          ? "auto"
          : "smooth"
    });

  }


  /* =========================================================
     MIRA RESPONSE ENGINE
  ========================================================= */

  function getResponse(question){

    const q =
      question
        .toLowerCase()
        .trim();


    if(
      q.includes("hello") ||
      q.includes("hi") ||
      q.includes("hey")
    ){

      return {

        text:
          "Hey. I'm Mira. Think of me as a small guide to the portfolio. What would you like to explore?"

      };

    }


    let best = null;

    let bestScore = 0;


    Object.values(
      knowledge
    ).forEach(item => {

      let score = 0;


      item.keys.forEach(key => {

        if(q.includes(key)){

          score +=
            key.length > 5
              ? 2
              : 1;

        }

      });


      if(score > bestScore){

        bestScore = score;

        best = item;

      }

    });


    return best || {

      text:
        "I don't have a specific answer for that yet. Try asking about projects, skills, creative work, thinking or future direction."

    };

  }


  /* =========================================================
     ASK MIRA
  ========================================================= */

  function askMira(question){

    const cleanQuestion =
      question.trim();


    if(!cleanQuestion){
      return;
    }


    if(!miraOpen){
      openMira();
    }


    addMessage(
      cleanQuestion,
      "user"
    );


    typing?.classList.add(
      "show"
    );


    miraButton?.classList.add(
      "thinking"
    );


    const result =
      getResponse(
        cleanQuestion
      );


    window.clearTimeout(
      responseTimer
    );


    responseTimer =
      window.setTimeout(
        () => {

          typing?.classList.remove(
            "show"
          );


          miraButton?.classList.remove(
            "thinking"
          );


          miraButton?.classList.add(
            "responding"
          );


          addMessage(
            result.text,

            "bot",

            result.target
              ? {
                  target:
                    result.target,

                  label:
                    result.label
                }

              : null
          );


          window.setTimeout(
            () => {

              miraButton?.classList.remove(
                "responding"
              );

            },
            700
          );


        },

        reduced
          ? 100
          : 500 +
            Math.random() * 400
      );

  }


  miraButton?.addEventListener(
    "click",
    () => {

      if(miraOpen){
        closeMira();
      }else{
        openMira();
      }

    }
  );


  miraClose?.addEventListener(
    "click",
    closeMira
  );


  miraForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const question =
        miraInput?.value.trim();


      if(!question){
        return;
      }


      if(miraInput){
        miraInput.value = "";
      }


      askMira(
        question
      );

    }
  );


  /* =========================================================
     MIRA QUICK BUTTONS
  ========================================================= */

  document
    .querySelectorAll(
      ".quick button"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const question =
            button.dataset.q;


          if(question){
            askMira(question);
          }

        }
      );

    });


  /* =========================================================
     MIRA POINTER EFFECT
  ========================================================= */

  if(
    !reduced &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ){

    miraButton?.addEventListener(
      "pointermove",
      event => {

        const rect =
          miraButton.getBoundingClientRect();


        const x =
          (
            (event.clientX - rect.left)
            / rect.width
            - .5
          ) * 7;


        const y =
          (
            (event.clientY - rect.top)
            / rect.height
            - .5
          ) * 7;


        const orb =
          miraButton.querySelector(
            ".mira-orb"
          );


        orb?.style.setProperty(
          "--mx",
          `${x}px`
        );


        orb?.style.setProperty(
          "--my",
          `${y}px`
        );

      }
    );


    miraButton?.addEventListener(
      "pointerleave",
      () => {

        const orb =
          miraButton.querySelector(
            ".mira-orb"
          );


        orb?.style.setProperty(
          "--mx",
          "0px"
        );


        orb?.style.setProperty(
          "--my",
          "0px"
        );

      }
    );

  }


  /* =========================================================
     KEYBOARD
  ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if(
        event.key !== "Escape"
      ){
        return;
      }


      closeLightbox();

      closeMira();

      closeMenu();

      closeProfile();

    }
  );


  /* =========================================================
     FIRST VISIT MIRA
  ========================================================= */

  try{

    const seen =
      sessionStorage.getItem(
        "mira-presence"
      );


    if(
      !seen &&
      !reduced
    ){

      window.setTimeout(
        () => {

          miraButton?.animate(
            [
              {
                transform:"scale(1)"
              },

              {
                transform:"scale(1.1)"
              },

              {
                transform:"scale(1)"
              }
            ],
            {
              duration:800,

              easing:"ease-in-out"
            }
          );


          sessionStorage.setItem(
            "mira-presence",
            "1"
          );

        },
        2400
      );

    }

  }catch(error){

    /* Storage may be blocked. */

  }


  /* =========================================================
     SCROLL AMBIENCE
  ========================================================= */

  const glowA =
    document.querySelector(
      ".glow-a"
    );

  const glowB =
    document.querySelector(
      ".glow-b"
    );


  let scrollFrame =
    false;


  window.addEventListener(
    "scroll",
    () => {

      if(
        reduced ||
        scrollFrame
      ){
        return;
      }


      scrollFrame =
        true;


      requestAnimationFrame(
        () => {

          const max =
            document.documentElement
              .scrollHeight
            - window.innerHeight;


          const progress =
            max > 0
              ? window.scrollY / max
              : 0;


          if(glowA){

            glowA.style.transform =
              `translateY(${progress * 100}px)`;

          }


          if(glowB){

            glowB.style.transform =
              `translateY(${-progress * 130}px)`;

          }


          scrollFrame =
            false;

        }
      );

    },
    {
      passive:true
    }
  );


  /* =========================================================
     IMAGE FALLBACK
  ========================================================= */

  document.addEventListener(
    "error",
    event => {

      const target =
        event.target;


      if(
        target &&
        target.tagName === "IMG"
      ){

        target.style.background =
          "#111015";

      }

    },
    true
  );


});
