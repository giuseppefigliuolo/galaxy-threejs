document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector(".webgl");
  const galaxyP = document.querySelector(".galaxy-description");
  const itineraryBtn = document.querySelector(".galaxy-description .button");
  const countdown = document.querySelector(".countdown");

  // landing page animation
  gsap
    .timeline({ duration: 1, ease: "power4.out" })
    .from("h1 span", {
      opacity: 0,
      y: 200,
    })
    .from(".subheader span", {
      opacity: 0,
      y: 200,
    })
    .from(".button", {
      opacity: 0,
    });

  const startCountdown = () => {
    let seconds = document.querySelector(".countdown span").textContent;
    const countdownInterval = setInterval(() => {
      seconds--;
      document.querySelector(".countdown span").textContent = seconds;
      if (seconds <= 0) {
        // countdown finished
        clearInterval(countdownInterval);
        countdown.classList.add("invisible");
        setTimeout(() => {
          countdown.classList.add("d-none");
          canvas.classList.remove("invisible");
          galaxyP.classList.remove("invisible");
        }, 1800);
      }
    }, 1000);
  };

  const ctaButton = document.querySelector(".text-section .button");
  const textSection = document.querySelector(".text-section");
  ctaButton.addEventListener("click", () => {
    textSection.classList.add("off-screen");
    countdown.classList.remove("invisible");
    startCountdown();
  });

  itineraryBtn.addEventListener("click", () => {
    console.log("ciao");
  });
});
