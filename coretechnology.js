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

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio === 1) {
      gsap.to(headers[lastBlockIndex], { onComplete: () => headers[lastBlockIndex].classList.add("auto-margin") });
    } else {
      gsap.to(headers[lastBlockIndex], { onComplete: () => headers[lastBlockIndex].classList.remove("auto-margin") });
    }
  });
});

observer.observe(blocks[lastBlockIndex]);
