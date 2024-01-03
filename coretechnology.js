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

function observeBlocks() {
  blocks.forEach((block, index) => {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(headers[index], { onComplete: () => headers[index].classList.add("auto-margin") });
        } else {
          gsap.to(headers[index], { onComplete: () => headers[index].classList.remove("auto-margin") });
        }
      });
    });
    observer.observe(block);
  });
}

if (window.innerWidth > 767) {
  observeBlocks();
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 767) {
    observeBlocks();
  }
});
