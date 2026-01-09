(() => {
  const track = document.querySelector(".hero-track");
  const slides = track ? Array.from(track.querySelectorAll(".hero-slide")) : [];
  const dotsContainer = document.querySelector(".hero-dots");
  const prev = document.querySelector(".hero-arrow.prev");
  const nextBtn = document.querySelector(".hero-arrow.next");
  if (!track || !slides.length || !dotsContainer || !prev || !nextBtn) return;

  let current = 0;
  let timerId = null;

  const setActive = (index) => {
    slides.forEach((slide, idx) => slide.classList.toggle("active", idx === index));
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsContainer.querySelectorAll(".hero-dot").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === index);
    });
    current = index;
  };

  slides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hero-dot";
    dot.setAttribute("aria-label", `Ir al slide ${idx + 1}`);
    dot.addEventListener("click", () => {
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

  prev.addEventListener("click", () => {
    prevSlide();
    restart();
  });

  nextBtn.addEventListener("click", () => {
    next();
    restart();
  });

  start();
})();
