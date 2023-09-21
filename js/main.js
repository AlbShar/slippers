window.addEventListener("DOMContentLoaded", () => {
  //  Timer
  const deadline = "2023-09-22";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
      total: t,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      if (t.total <= 0) {
      hours.innerHTML = '00';
      minutes.innerHTML = '00';
      seconds.innerHTML = '00';
        clearInterval(timeInterval);
        return;
      }

      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      
    }
  }

  setClock(".timer", deadline);

  // Photos
  const mainPhoto = document.querySelector("#main-photo");
  const photoPreviews = document.querySelectorAll(".photos__previews-item");

  function clearClasses() {
    Array.from(photoPreviews).forEach((preview, index) => {
      if (preview.classList.contains("photos__previews-item_active")) {
        preview.classList.remove("photos__previews-item_active");
      }
    });
  }

  function onClickPreview(e) {
    const srcClickElement = e.target.src;
    clearClasses();
    e.target.classList.add("photos__previews-item_active");

    if (mainPhoto.classList.contains("animate-visible")) {
      mainPhoto.classList.remove("animate-visible");
    }
    mainPhoto.classList.add("animate-hidden");

    setTimeout(() => {
      mainPhoto.src = srcClickElement;
      mainPhoto.classList.remove("animate-hidden");
      mainPhoto.classList.add("animate-visible");
    }, 1000);
  }

  Array.from(photoPreviews).forEach((preview, index) => {
    preview.addEventListener("click", onClickPreview);
  });
});
