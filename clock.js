function enable(arr) {
  //biome-ignore lint:
  arr.forEach((e) => e.classList.remove("hidden"));
}

function disable(arr) {
  //biome-ignore lint:
  arr.forEach((e) => e.classList.add("hidden"));
}

function render_digit(obj, num) {
  const top = obj.querySelector(".line-top");
  const center = obj.querySelector(".line-center");
  const bottom = obj.querySelector(".line-bottom");
  const top_left = obj.querySelector(".line-top-left");
  const top_right = obj.querySelector(".line-top-right");
  const bottom_left = obj.querySelector(".line-bottom-left");
  const bottom_right = obj.querySelector(".line-bottom-right");
  if (num === 0) {
    enable([top, bottom, top_left, top_right, bottom_left, bottom_right]);
    disable([center]);
  } else if (num === 1) {
    enable([top_right, bottom_right]);
    disable([top, center, bottom, top_left, bottom_left]);
  } else if (num === 2) {
    enable([top, top_right, center, bottom_left, bottom]);
    disable([bottom_right, top_left]);
  } else if (num === 3) {
    enable([top, center, bottom, top_right, bottom_right]);
    disable([top_left, bottom_left]);
  } else if (num === 4) {
    enable([top_left, center, top_right, bottom_right]);
    disable([top, bottom, bottom_left]);
  } else if (num === 5) {
    enable([top, bottom_right, center, bottom, top_left]);
    disable([top_right, bottom_left]);
  } else if (num === 6) {
    enable([top, bottom_right, center, bottom, top_left, bottom_left]);
    disable([top_right]);
  } else if (num === 7) {
    enable([top, top_right, bottom_right]);
    disable([center, bottom, top_left, bottom_left]);
  } else if (num === 8) {
    enable([
      top,
      top_right,
      bottom_right,
      center,
      bottom,
      top_left,
      bottom_left,
    ]);
    disable([]);
  } else if (num === 9) {
    enable([top_left, center, top, top_right, bottom_right]);
    disable([bottom, bottom_left]);
  } else {
    enable([
      top,
      top_right,
      bottom_right,
      center,
      bottom,
      top_left,
      bottom_left,
    ]);
    disable([]);
  }
}

function reset() {
  //biome-ignore lint:
  document.querySelectorAll(".digit").forEach((e) => render_digit(e, 0));
}

function formatTime(seconds) {
  const totalHours = Math.floor(seconds / 3600);
  const totalMinutes = Math.floor((seconds % 3600) / 60);
  const totalSeconds = seconds % 60;

  const h1 = Math.floor(totalHours / 10);
  const h2 = totalHours % 10;

  const m1 = Math.floor(totalMinutes / 10);
  const m2 = totalMinutes % 10;

  const s1 = Math.floor(totalSeconds / 10);
  const s2 = totalSeconds % 10;

  return [h1, h2, m1, m2, s1, s2];
}

window.onload = () => {
  const start_button = document.querySelector("#start");
  const reset_button = document.querySelector("#reset");
  let pause = true;
  let counter = 0;
  reset();
  reset_button.addEventListener("click", () => reset());
  reset_button.addEventListener("click", () => {
    pause = true;
    counter = 0;
  });
  //biome-ignore lint:
  start_button.addEventListener("click", () => (pause = !pause));
  start_button.addEventListener("click", () => {
    if (pause) {
      start_button.innerHTML = "Start";
    } else {
      start_button.innerHTML = "Pause";
    }
  });
  setInterval(() => {
    if (!pause) {
      counter++;
      const digits = formatTime(counter);
      const digitElements = document.querySelectorAll(".digit");

      if (digitElements.length !== 6) {
        console.error("Expected exactly 6 .digit elements in the HTML.");
        return;
      }

      digitElements.forEach((digitElement, index) => {
        render_digit(digitElement, digits[index]);
      });
    }
  }, 1000);
};
