(() => {
  const steps = document.querySelectorAll(".step");
  const wave = document.querySelector(".wave-art");

  if (!("IntersectionObserver" in window)) {
    steps.forEach((step) => step.classList.add("is-visible"));
    wave?.classList.add("is-drawn");
    return;
  }

  const reveal = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
  );

  steps.forEach((step) => reveal.observe(step));

  if (wave) {
    const draw = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-drawn");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    draw.observe(wave);
  }
})();
