const data = {
  andromeda: {
    title: "gal. di andromeda",
    description:
      "La Galassia di Andromeda è una galassia a spirale gigante che dista circa 2,538 milioni di anni luce dalla Terra in direzione della costellazione di Andromeda, da cui prende il nome. Si tratta della galassia di grandi dimensioni più vicina alla nostra, la Via Lattea; è visibile anche a occhio nudo ed è tra gli oggetti più lontani visibili senza l'ausilio di strumenti.",
  },
  backwards: {
    title: "ngc 4622",
    description:
      "Una magnifica galassia a spirale, NGC 4622, distante circa 200 milioni di anni luce in direzione della costellazione del Centauro, sta confondendo le idee agli astronomi. Le osservazioni effettuate dal telescopio spaziale “Hubble” (HST) mostrano infatti che una parte del disco di questa galassia ruota attorno al nucleo in senso opposto rispetto alla norma.",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector(".webgl");
  const galaxyDiv = document.querySelector(".galaxy-description");
  const countdown = document.querySelector(".countdown");
  const galHeader = document.querySelector(".galaxy-description h1");
  const galParagraph = document.querySelector(".galaxy-description p");
  const galBtn = document.querySelector("#next-galaxy");
  const datGui = document.querySelector(".dg.ac");
  const countdownSound = document.querySelector("#button-sound");
  const themeSound = document.querySelector("#theme-sound");
  const ctaSound = document.querySelector("#countdown-song");

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
    countdownSound.volume = 0.3;
    const countdownInterval = setInterval(() => {
      seconds--;
      countdownSound.play();
      document.querySelector(".countdown span").textContent = seconds;
      if (seconds <= 0) {
        // countdown finished
        clearInterval(countdownInterval);
        countdown.classList.add("invisible");
        setTimeout(() => {
          countdown.classList.add("d-none");
          canvas.classList.remove("invisible");
          galaxyDiv.classList.remove("invisible");
        }, 1800);
      }
    }, 1000);
  };

  const ctaButton = document.querySelector(".text-section .button");
  const textSection = document.querySelector(".text-section");
  ctaButton.addEventListener("click", () => {
    ctaSound.play();
    themeSound.play();
    textSection.classList.add("off-screen");
    countdown.classList.remove("invisible");
    startCountdown();
  });

  const galBtnHandler = () => {
    ctaSound.play();
    galBtn.removeEventListener("click", galBtnHandler);
    setTimeout(() => {
      galBtn.addEventListener("click", galBtnHandler);
    }, 2000);
    gsap.timeline({ duration: 1.4, ease: "power4.out" }).from(galaxyDiv, {
      opacity: 0,
      onComplete: () => {
        const header = galHeader.innerHTML.toLowerCase();
        if (header === "via lattea") {
          galHeader.innerHTML = data.andromeda.title;
          galParagraph.innerHTML = data.andromeda.description;
        } else if (header === "gal. di andromeda") {
          galHeader.innerHTML = data.backwards.title;
          galParagraph.innerHTML = data.backwards.description;
        } else {
          galBtn.classList.add("d-none");
          datGui.classList.add("visible");
          galaxyDiv.classList.add("top-55");
          galHeader.innerHTML = "crea la tua galassia";
          galParagraph.innerHTML =
            "Modifica i valori qui sopra e prova a creare la tua galassia personalizzata! Trascina il mouse per godertela da ogni sua prospettiva. Usa lo scroll per zoomare e trascina il mouse tenendo premuto il tasto destro per spostare la camera.";
        }
      },
    });
  };

  galBtn.addEventListener("click", galBtnHandler);
});
