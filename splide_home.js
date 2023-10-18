// function initSplide() {
//   let splides = $(".splide");

//   for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
//     // Create a new Splide instance
//     let splide = new Splide(splides[i], {
//       // Default options for all breakpoints
//       perPage: 3.5,
//       perMove: 1,
//       autoplay: true,
//       pauseOnHover: true, // Disable pause on hover
//       focus: 0,
//       type: "loop",
//       drag: false,
//       gap: "0",
//       arrows: false,
//       interval: 0,
//       pagination: false,
//       speed: 80000,
//       easing: "linear",
//       dragAngleThreshold: 60,
//       autoWidth: false,
//       rewind: true,
//       rewindSpeed: 400,
//       waitForTransition: false,
//       updateOnMove: true,
//       trimSpace: false,
//       classes: {
//         arrows: "splide__arrows",
//         prev: "splide__arrow splide__arrow--prev",
//         next: "splide__arrow splide__arrow--next"
//       },
//       breakpoints: {
//         991: {
//           perPage: 2,
//           gap: "3vw",
//           type: "loop",
//           perMove: 1,
//           autoplay: false,
//           interval: 0,
//           speed: 800,
//           drag: true,
//           arrows: true
//         },
//         767: {
//           perPage: 1,
//           gap: "3vw",
//           type: "loop",
//           perMove: 1,
//           autoplay: false,
//           interval: 0,
//           speed: 800,
//           autoWidth: true,
//           drag: true,
//           arrows: true
//         },
//         479: {
//           perPage: 1,
//           gap: "3vw",
//           type: "loop",
//           perMove: 1,
//           autoplay: false,
//           interval: 0,
//           speed: 800,
//           autoWidth: true,
//           drag: true,
//           arrows: true
//         }
//       }
//     });

//     splide.mount(); // Mount the Splide instance
//   }
// }

// // Initial setup
// initSplide();

// Create an array to hold the Splide instances.
let splideInstances = [];

function initSplide() {
  let splides = $(".splide");

  for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
    // Use your existing Splide initializations here and mount each instance

    let splide = new Splide(splides[i], {
      // Default options for all breakpoints
      perPage: 3.5,
      perMove: 1,
      autoplay: true,
      pauseOnHover: true, // Disable pause on hover
      focus: 0,
      type: "loop",
      drag: false,
      gap: "0",
      arrows: false,
      interval: 0,
      pagination: false,
      speed: 80000,
      easing: "linear",
      dragAngleThreshold: 60,
      // autoWidth: false,
      rewind: true,
      rewindSpeed: 400,
      waitForTransition: false,
      // updateOnMove: true,
      // trimSpace: false,
      classes: {
        arrows: "splide__arrows",
        prev: "splide__arrow splide__arrow--prev",
        next: "splide__arrow splide__arrow--next"
      },
      breakpoints: {
        991: {
          perPage: 2,
          gap: "3vw",
          type: "loop",
          perMove: 1,
          autoplay: false,
          interval: 0,
          speed: 2000,
          // autoWidth: false,
          drag: true,
          arrows: true
        },
        767: {
          perPage: 1,
          gap: "3vw",
          type: "loop",
          perMove: 1,
          autoplay: false,
          interval: 0,
          speed: 2000,
          // autoWidth: false,
          drag: true,
          arrows: true
        },
        479: {
          perPage: 1,
          gap: "3vw",
          type: "loop",
          perMove: 1,
          autoplay: false,
          interval: 0,
          speed: 2000,
          // autoWidth: false,
          drag: true,
          arrows: true
        }
      }
    });
    splide.mount(); // Mount the Splide instance

    // Push it into the array.
    splideInstances.push(splide);
  }
}

// Initial setup
initSplide();

// Add debounced resize event to refresh all Splide instances
let resizeTimeout;
window.onresize = function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Loop through the array and refresh each instance.
    for (let i = 0; i < splideInstances.length; i++) {
      splideInstances[i].destroy().mount();
    }
  }, 100); // delay of reinitializing splides
};

// transferred to Webflw 14/09 15:00
