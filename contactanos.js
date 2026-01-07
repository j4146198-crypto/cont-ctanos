(() => {
  const track = document.querySelector(".hero-track");
  const slides = track ? Array.from(track.querySelectorAll(".hero-slide")) : [];
  const dotsContainer = document.querySelector(".hero-dots");
  const prev = document.querySelector(".hero-arrow.prev");
  const nextBtn = document.querySelector(".hero-arrow.next");
  if (!track || !slides.length || !dotsContainer || !prev || !nextBtn) return;

  let current = 0;
  let timerId = null;
  let isLocked = false;

  const updateLockState = () => {
    isLocked = slides.some((slide) => slide.classList.contains("info-open"));
  };

  const setInfoState = (slide, open) => {
    const toggle = slide.querySelector(".hero-toggle");
    const info = slide.querySelector(".hero-info");
    if (!toggle || !info) return;
    const openText = toggle.dataset.open || "Ver informacion";
    const closeText = toggle.dataset.close || "Ocultar informacion";
    toggle.dataset.open = openText;
    toggle.dataset.close = closeText;
    slide.classList.toggle("info-open", open);
    info.setAttribute("aria-hidden", open ? "false" : "true");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? closeText : openText;
    updateLockState();
  };

  const closeAllInfo = () => {
    slides.forEach((slide) => setInfoState(slide, false));
  };

  const setActive = (index) => {
    if (isLocked) return;
    slides.forEach((slide, idx) => slide.classList.toggle("active", idx === index));
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsContainer.querySelectorAll(".hero-dot").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === index);
    });
    closeAllInfo();
    current = index;
  };

  slides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hero-dot";
    dot.setAttribute("aria-label", `Ir al mensaje ${idx + 1}`);
    dot.addEventListener("click", () => {
      if (isLocked) return;
      setActive(idx);
      restart();
    });
    dotsContainer.appendChild(dot);
  });

  setActive(0);

  const next = () => setActive((current + 1) % slides.length);
  const prevSlide = () => setActive((current - 1 + slides.length) % slides.length);

  const start = () => {
    timerId = window.setInterval(next, 8000);
  };

  const stop = () => {
    if (timerId) window.clearInterval(timerId);
  };

  const restart = () => {
    stop();
    start();
  };

  const hero = document.querySelector(".hero-slider");
  if (hero) {
    hero.addEventListener("mouseenter", stop);
    hero.addEventListener("mouseleave", start);
  }

  slides.forEach((slide) => {
    const toggle = slide.querySelector(".hero-toggle");
    const closeBtn = slide.querySelector(".hero-close");
    if (!toggle) return;
    setInfoState(slide, false);
    toggle.addEventListener("click", () => {
      const isOpen = slide.classList.contains("info-open");
      setInfoState(slide, !isOpen);
      if (!isOpen) {
        stop();
      } else {
        restart();
      }
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        setInfoState(slide, false);
        restart();
      });
    }
  });

  prev.addEventListener("click", () => {
    if (isLocked) return;
    prevSlide();
    restart();
  });

  nextBtn.addEventListener("click", () => {
    if (isLocked) return;
    next();
    restart();
  });

  start();
})();
