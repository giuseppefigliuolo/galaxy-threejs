document.addEventListener("DOMContentLoaded", () => {
  gsap.from("h1 span", {
    duration: 1,
    opacity: 0,
    y: 200,
    ease: "power4.out",
  });
  gsap.from(".subheader span", {
    duration: 1,
    opacity: 0,
    y: 200,
    ease: "power4.out",
    delay: 0.5,
    onComplete: () => {
      document.querySelector(".button").classList.remove("hidden");
    },
  });
});
