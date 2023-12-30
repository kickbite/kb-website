// let headers = document.querySelectorAll("[data-item='header']");
// let blocks = document.querySelectorAll("[data-item='block']");

// blocks.forEach((block, index) => {
//   let observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         gsap.to(headers[index], { onComplete: () => headers[index].classList.add("auto-margin") });
//       } else {
//         gsap.to(headers[index], { onComplete: () => headers[index].classList.remove("auto-margin") });
//       }
//     });
//   });
//   observer.observe(block);
// });

let headers = document.querySelectorAll("[data-item='header']");
let blocks = document.querySelectorAll("[data-item='block']");
let lastBlockIndex = blocks.length - 1;

let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && (window.innerWidth > 479 || entry.intersectionRatio === 1)) {
      gsap.to(headers[lastBlockIndex], { onComplete: () => headers[lastBlockIndex].classList.add("auto-margin") });
    } else {
      gsap.to(headers[lastBlockIndex], { onComplete: () => headers[lastBlockIndex].classList.remove("auto-margin") });
    }
  });
});

// Observe all blocks for large screens, the last one for small screens
if (window.innerWidth > 479) {
  blocks.forEach((block) => observer.observe(block));
} else {
  observer.observe(blocks[lastBlockIndex]);
}

// Resize handler to switch mode if required
window.addEventListener("resize", () => {
  let largeScreenMode = window.innerWidth > 479;

  if (largeScreenMode) {
    observer.disconnect();
    blocks.forEach((block) => observer.observe(block));
  } else {
    observer.disconnect();
    observer.observe(blocks[lastBlockIndex]);
  }
});
