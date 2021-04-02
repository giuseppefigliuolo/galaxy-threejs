const data = {
  andromeda: {
    title: "Gal. di Andromeda",
    description:
      "La Galassia di Andromeda è una galassia a spirale gigante che dista circa 2,538 milioni di anni luce dalla Terra in direzione della costellazione di Andromeda, da cui prende il nome. Si tratta della galassia di grandi dimensioni più vicina alla nostra, la Via Lattea; è visibile anche a occhio nudo ed è tra gli oggetti più lontani visibili senza l'ausilio di strumenti.",
  },
  backwards: {
    title: "NGC 4622",
    description:
      "Una magnifica galassia a spirale, NGC 4622, distante circa 200 milioni di anni luce in direzione della costellazione del Centauro, sta confondendo le idee agli astronomi. Le osservazioni effettuate dal telescopio spaziale “Hubble” (HST) mostrano infatti che una parte del disco di questa galassia ruota attorno al nucleo in senso opposto rispetto alla norma.",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector(".webgl");
  const galaxyP = document.querySelector(".galaxy-description");
  const countdown = document.querySelector(".countdown");
  const galBtn = document.querySelector("#next-galaxy");

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

  galBtn.addEventListener("click", () => {
    console.log(data);
  });

  // next galaxy function
  const nextGalaxy = () => {
    console.log();
  };
});
