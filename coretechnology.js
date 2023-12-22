let headers = document.querySelectorAll("[data-item='header']");
let blocks = document.querySelectorAll("[data-item='block']");

blocks.forEach((block, index) => {
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.to(headers[index], { onComplete: () => headers[index].classList.add("margin-auto") });
      } else {
        gsap.to(headers[index], { onComplete: () => headers[index].classList.remove("margin-auto") });
      }
    });
  });
  observer.observe(block);
});
