// I made this for you
let backdoor = {
  end_the_chaos: "Set me equal to `true`"
};

(()=>{
  const userSettings = getUserSettings();

  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext("2d");
  const title = document.getElementById("title");

  const CHAOS_LEVEL = 1000;

  function randomX() {
    return randomInteger(0, canvas.width);
  }
  function randomY() {
    return randomInteger(0, canvas.height);
  }

  // Draw stuff
  let step = 0;
  let MS_PER_FRAME = 100;
  let flicker = false;
  function render(timestamp) {
    let progress = timestamp - step;

    if (flicker) {
      context.save();
      context.fillText(userSettings.console_access, canvas.width / 2, canvas.height / 2);
      context.restore();

      title.innerHTML = randomString(10);
    }

    if (progress > MS_PER_FRAME) {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < CHAOS_LEVEL; i++) {
        context.save();
        context.translate(randomX(), randomY());
        context.rotate(randomAngle());
        context.fillText(randomChar(), 0, 0);
        //context.fillText(randomChar(), randomX(), randomY());
        context.restore();
      }

      flicker = !flicker;
      step = timestamp;
    }

    if (backdoor.end_the_chaos !== true) {
      window.requestAnimationFrame(render);
    }
    else {
      title.innerHTML = "Well Done"
      fadeInMessage("Well Done.");
    }
  }

  console.log("Hey");
  console.log("Type: `backdoor`");
  window.requestAnimationFrame(render);


  function fadeInMessage(message) {
    context.save();
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    context.clearRect(x, y - parseFloat(context.font), context.measureText(message).width, parseFloat(context.font));

    context.fillStyle = "#0000FF";
    context.textAlign = 'left';

    (function fade() {
      context.globalAlpha = 0.1;
      context.fillStyle = "#0000FF";
      context.fillText(message, x, y);

      window.requestAnimationFrame(fade);
    })();

    context.restore();
  }
})();
