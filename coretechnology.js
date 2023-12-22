let headers = document.querySelectorAll("[data-item='header']");
let blocks = document.querySelectorAll("[data-item='block']");

blocks.forEach((block, index) => {
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.to(headers[index], { duration: 0.2, marginBottom: "36rem" });
      } else {
        gsap.to(headers[index], { duration: 0.2, marginBottom: "" });
      }
    });
  });
  observer.observe(block);
});
