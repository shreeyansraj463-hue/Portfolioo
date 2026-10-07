document.addEventListener("DOMContentLoaded",()=>{

  const reduced=matchMedia("(prefers-reduced-motion:reduce)").matches;


  /* =====================================================
     PERSONAL PROFILE
  ===================================================== */

  const profileTrigger=document.getElementById("profileTrigger");
  const profileOverlay=document.getElementById("profileOverlay");
  const profileClose=document.getElementById("profileClose");
  const profileBackdrop=document.getElementById("profileBackdrop");

  function openProfile(){

    if(!profileOverlay)return;

    profileOverlay.classList.add("open");

    profileOverlay.setAttribute(
      "aria-hidden",
      "false"
    );

    profileTrigger?.setAttribute(
      "aria-expanded",
      "true"
    );

    document.body.classList.add("locked");

    setTimeout(()=>{
      profileClose?.focus();
    },100);
  }


  function closeProfile(){

    if(!profileOverlay)return;

    profileOverlay.classList.remove("open");

    profileOverlay.setAttribute(
      "aria-hidden",
      "true"
    );

    profileTrigger?.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove("locked");

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


  /* =====================================================
     ARCHIVE
  ===================================================== */

  const art=[
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

  const poetry=[
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

  const path=f=>
    "./"+f.split("/").map(encodeURIComponent).join("/");


  function gallery(id,list,type){

    const el=document.getElementById(id);

    if(!el)return;

    list.forEach((file,i)=>{

      const button=document.createElement("button");
      const img=document.createElement("img");

      button.type="button";

      img.src=path(file);
      img.alt=`${type} ${i+1}`;
      img.loading="lazy";
      img.decoding="async";

      button.appendChild(img);
      el.appendChild(button);

      button.addEventListener(
        "click",
        ()=>{
          openLightbox(
            img.src,
            `${type.toUpperCase()} · ${String(i+1).padStart(2,"0")}`
          );
        }
      );

    });

  }

  gallery("artGallery",art,"Art");
  gallery("poetryGallery",poetry,"Poetry");


  /* =====================================================
     REVEALS
  ===================================================== */

  const reveals=[
    ...document.querySelectorAll(".reveal")
  ];

  if(
    !reduced &&
    "IntersectionObserver" in window
  ){

    const observer=new IntersectionObserver(
      entries=>{

        entries.forEach(entry=>{

          if(!entry.isIntersecting)return;

          const siblings=[
            ...entry.target.parentElement.children
          ].filter(
            x=>x.classList.contains("reveal")
          );

          const index=Math.max(
            0,
            siblings.indexOf(entry.target)
          );

          entry.target.style.transitionDelay=
            `${Math.min(index*55,240)}ms`;

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        });

      },
      {
        threshold:.08,
        rootMargin:"0px 0px -45px"
      }
    );

    reveals.forEach(
      x=>observer.observe(x)
    );

  }else{

    reveals.forEach(
      x=>x.classList.add("visible")
    );

  }


  /* =====================================================
     MOBILE NAV
  ===================================================== */

  const menu=document.getElementById("menu");
  const mobile=document.getElementById("mobileMenu");

  function closeMenu(){
    mobile?.classList.remove("open");
  }

  menu?.addEventListener(
    "click",
    ()=>{
      mobile?.classList.toggle("open");
    }
  );

  mobile?.querySelectorAll("a").forEach(a=>{
    a.addEventListener(
      "click",
      closeMenu
    );
  });


  /* =====================================================
     ACTIVE NAV
  ===================================================== */

  const nav=[
    ...document.querySelectorAll(".nav-links a")
  ];

  if("IntersectionObserver" in window){

    const io=new IntersectionObserver(
      entries=>{

        entries.forEach(entry=>{

          if(!entry.isIntersecting)return;

          nav.forEach(
            x=>x.classList.remove("active")
          );

          const link=nav.find(
            x=>x.getAttribute("href")===`#${entry.target.id}`
          );

          link?.classList.add("active");

        });

      },
      {
        rootMargin:"-38% 0px -55% 0px"
      }
    );

    [
      "about",
      "work",
      "archive",
      "thinking",
      "contact"
    ]
      .map(id=>document.getElementById(id))
      .filter(Boolean)
      .forEach(x=>io.observe(x));

  }


  /* =====================================================
     CURSOR LIGHT
  ===================================================== */

  const cursor=
    document.querySelector(".cursor-light");

  if(
    cursor &&
    !reduced &&
    matchMedia("(pointer:fine)").matches
  ){

    let tx=0;
    let ty=0;
    let x=0;
    let y=0;
    let frame=false;

    addEventListener(
      "pointermove",
      e=>{

        tx=e.clientX;
        ty=e.clientY;

        document.body.classList.add(
          "pointer"
        );

        if(frame)return;

        frame=true;

        requestAnimationFrame(()=>{

          x+=(tx-x)*.16;
          y+=(ty-y)*.16;

          cursor.style.left=`${x}px`;
          cursor.style.top=`${y}px`;

          frame=false;

        });

      },
      {
        passive:true
      }
    );

  }


  /* =====================================================
     PROJECT TILT
  ===================================================== */

  if(
    !reduced &&
    matchMedia("(pointer:fine)").matches
  ){

    document
      .querySelectorAll(".project")
      .forEach(project=>{

        const visual=
          project.querySelector(
            ".project-visual"
          );

        if(!visual)return;

        project.addEventListener(
          "pointermove",
          e=>{

            const r=
              project.getBoundingClientRect();

            const px=
              (e.clientX-r.left)/r.width;

            const py=
              (e.clientY-r.top)/r.height;

            visual.style.transform=
              `perspective(1400px)
               rotateX(${(0.5-py)*4}deg)
               rotateY(${(px-0.5)*4}deg)`;

            visual.style.setProperty(
              "--x",
              `${px*100}%`
            );

            visual.style.setProperty(
              "--y",
              `${py*100}%`
            );

          }
        );

        project.addEventListener(
          "pointerleave",
          ()=>{

            visual.style.transform=
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


  /* =====================================================
     LIGHTBOX
  ===================================================== */

  const lightbox=
    document.getElementById("lightbox");

  const lightboxImage=
    document.getElementById("lightboxImage");

  const caption=
    document.getElementById("lightboxCaption");


  function openLightbox(src,text){

    lightbox?.classList.add("open");

    document.body.classList.add(
      "locked"
    );

    if(lightboxImage){
      lightboxImage.src=src;
    }

    if(caption){
      caption.textContent=text;
    }

  }


  function closeLightbox(){

    lightbox?.classList.remove(
      "open"
    );

    document.body.classList.remove(
      "locked"
    );

  }


  document
    .getElementById("lightboxClose")
    ?.addEventListener(
      "click",
      closeLightbox
    );


  lightbox?.addEventListener(
    "click",
    e=>{
      if(e.target===lightbox){
        closeLightbox();
      }
    }
  );


  /* =====================================================
     MIRA
  ===================================================== */

  const miraButton=
    document.getElementById("miraButton");

  const miraPanel=
    document.getElementById("miraPanel");

  const miraClose=
    document.getElementById("miraClose");

  const messages=
    document.getElementById("messages");

  const typing=
    document.getElementById("typing");

  const form=
    document.getElementById("miraForm");

  const input=
    document.getElementById("miraInput");

  let miraOpen=false;
  let timer=null;


  const knowledge={

    projects:{
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

    particle:{
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

    camlab:{
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

    skills:{
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

    creative:{
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

    thinking:{
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

    future:{
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

    about:{
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

    contact:{
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


  function openMira(){

    miraOpen=true;

    miraPanel?.classList.add(
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
          duration:500,
          easing:"ease-out"
        }
      );

    }

    setTimeout(
      ()=>input?.focus(),
      300
    );

  }


  function closeMira(){

    miraOpen=false;

    miraPanel?.classList.remove(
      "open"
    );

    miraButton?.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  function addMessage(
    text,
    type="bot",
    source=null
  ){

    if(!messages)return;

    const box=
      document.createElement("div");

    box.className=
      `message ${type}`;

    box.textContent=text;

    if(source){

      const br=
        document.createElement("br");

      const button=
        document.createElement("button");

      button.className="source";
      button.type="button";
      button.textContent=
        source.label;

      button.onclick=()=>{

        closeMira();

        const target=
          document.querySelector(
            source.target
          );

        target?.scrollIntoView({
          behavior:
            reduced
              ? "auto"
              : "smooth",
          block:"start"
        });

        if(
          target &&
          !reduced
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

      };

      box.append(
        br,
        button
      );

    }

    messages.appendChild(box);

    messages.scrollTo({
      top:messages.scrollHeight,
      behavior:
        reduced
          ? "auto"
          : "smooth"
    });

  }


  function response(question){

    const q=
      question.toLowerCase();


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


    let best=null;
    let score=0;


    Object.values(
      knowledge
    ).forEach(item=>{

      let current=0;

      item.keys.forEach(key=>{

        if(q.includes(key)){
          current+=
            key.length>5
              ? 2
              : 1;
        }

      });


      if(current>score){

        score=current;
        best=item;

      }

    });


    return best || {
      text:
        "I don't have a specific answer for that yet. Try asking about projects, skills, creative work, thinking or future direction."
    };

  }


  function ask(question){

    if(!question.trim())return;

    if(!miraOpen){
      openMira();
    }

    addMessage(
      question,
      "user"
    );

    typing?.classList.add(
      "show"
    );

    miraButton?.classList.add(
      "thinking"
    );

    const result=
      response(question);

    clearTimeout(timer);

    timer=setTimeout(
      ()=>{

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
                target:result.target,
                label:result.label
              }
            : null
        );

        setTimeout(
          ()=>{
            miraButton?.classList.remove(
              "responding"
            );
          },
          700
        );

      },
      reduced
        ? 100
        : 500+Math.random()*400
    );

  }


  miraButton?.addEventListener(
    "click",
    ()=>{
      miraOpen
        ? closeMira()
        : openMira();
    }
  );


  miraClose?.addEventListener(
    "click",
    closeMira
  );


  form?.addEventListener(
    "submit",
    e=>{

      e.preventDefault();

      const q=
        input?.value.trim();

      if(!q)return;

      input.value="";

      ask(q);

    }
  );


  document
    .querySelectorAll(".quick button")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{
          ask(button.dataset.q);
        }
      );

    });


  /* MIRA POINTER */

  if(
    !reduced &&
    matchMedia("(pointer:fine)").matches
  ){

    miraButton?.addEventListener(
      "pointermove",
      e=>{

        const r=
          miraButton.getBoundingClientRect();

        const x=
          ((e.clientX-r.left)/r.width-.5)*8;

        const y=
          ((e.clientY-r.top)/r.height-.5)*8;

        const orb=
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
      ()=>{

        const orb=
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


  /* =====================================================
     KEYBOARD
  ===================================================== */

  document.addEventListener(
    "keydown",
    e=>{

      if(e.key!=="Escape")return;

      closeLightbox();
      closeMira();
      closeMenu();
      closeProfile();

    }
  );


  /* =====================================================
     FIRST VISIT MIRA PULSE
  ===================================================== */

  try{

    if(
      !sessionStorage.getItem(
        "mira-presence"
      ) &&
      !reduced
    ){

      setTimeout(
        ()=>{

          miraButton?.animate(
            [
              {
                transform:"scale(1)"
              },
              {
                transform:"scale(1.12)"
              },
              {
                transform:"scale(1)"
              }
            ],
            {
              duration:900,
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

  }catch(e){}


  /* =====================================================
     SCROLL AMBIENCE
  ===================================================== */

  const a=
    document.querySelector(".glow-a");

  const b=
    document.querySelector(".glow-b");

  let scrollFrame=false;


  addEventListener(
    "scroll",
    ()=>{

      if(
        reduced ||
        scrollFrame
      ){
        return;
      }

      scrollFrame=true;

      requestAnimationFrame(
        ()=>{

          const max=
            document.documentElement.scrollHeight-
            innerHeight;

          const progress=
            max
              ? scrollY/max
              : 0;

          if(a){
            a.style.transform=
              `translateY(${progress*100}px)`;
          }

          if(b){
            b.style.transform=
              `translateY(${-progress*130}px)`;
          }

          scrollFrame=false;

        }
      );

    },
    {
      passive:true
    }
  );


  /* =====================================================
     IMAGE FALLBACK
  ===================================================== */

  document.addEventListener(
    "error",
    e=>{

      if(
        e.target?.tagName==="IMG"
      ){

        e.target.style.background=
          "#111015";

      }

    },
    true
  );

});
