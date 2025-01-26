const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  const tl = gsap.timeline();
  tl.from("#nav", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
  }).to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
  }).from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
  });
}

function initCircleMouseFollower() {
  const minicircle = document.querySelector("#minicircle");
  let timeout;
  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", function (event) {
      clearTimeout(timeout);
      const xscale = gsap.utils.clamp(0.8, 1.2, event.clientX - xprev);
      const yscale = gsap.utils.clamp(0.8, 1.2, event.clientY - yprev);

      xprev = event.clientX;
      yprev = event.clientY;

      minicircle.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(${xscale}, ${yscale})`;

      timeout = setTimeout(() => {
          minicircle.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1, 1)`;
      }, 100);
  });
}

document.querySelectorAll(".elem").forEach(function (elem) {
  let rotate = 0;
  let diffrot = 0;

  elem.addEventListener("mouseleave", function () {
      gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5,
      });
  });

  elem.addEventListener("mousemove", function (event) {
      const diff = event.clientY - elem.getBoundingClientRect().top;
      diffrot = event.clientX - rotate;
      rotate = event.clientX;
      gsap.to(elem.querySelector("img"), {
          opacity: 1,
          ease: Power3,
          top: diff,
          left: event.clientX,
          rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
  });
});

initCircleMouseFollower();
firstPageAnim();
