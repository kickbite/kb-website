// var $swiperPaginationBullet = $(".swiper-pagination .swiper-pagination-bullet");
// var $swiperWrapperSlider = $(".swiper-wrapper [data-slider]");
// var $swiperPagination = $(".swiper-pagination");

// $swiperPaginationBullet.each(function (index) {
//   var slide = $swiperWrapperSlider.eq(index + 1);
//   var sliderValue = slide.attr("data-slider");
//   $(this).attr("bullet-target", sliderValue);
// });

// // Event delegation for click action on $cardsListMarquee
// $(document).on("click", "[data-marquee]", function () {
//   var marqueeValue = $(this).attr("data-marquee");
//   var correspondingBullet = $swiperPagination.find(
//     '[bullet-target="' + marqueeValue + '"]'
//   );
//   correspondingBullet.trigger("click");

//   $("html, body").animate(
//     {
//       scrollTop: $("#slider").offset().top
//     },
//     800
//   );
// });

// function initSplide() {
//   let splides = $(".splide");

//   for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
//     // Create a new Splide instance
//     let splide = new Splide(splides[i], {
//       // Default options for all breakpoints
//       perPage: 3.5,
//       perMove: 1,
//       autoplay: "true",
//       pauseOnHover: true, // Disable pause on hover
//       focus: 0,
//       type: "loop",
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
//           perPage: 2.5,
//           gap: "3vw",
//           arrows: "slide",
//           autoplay: false,
//           interval: 0,
//           speed: 600
//         },
//         767: {
//           perPage: 1,
//           gap: "3vw",
//           arrows: "slide",
//           autoplay: false,
//           interval: 0,
//           speed: 600
//         },
//         479: {
//           perPage: 1,
//           gap: "3vw",
//           arrows: "slide",
//           autoplay: false,
//           interval: 600,
//           speed: 1500
//         }
//       }
//     });

//     splide.mount(); // Mount the Splide instance
//   }
// }

// // Initial setup
// initSplide();

// function softRefresh() {
//   var windowWidth = window.innerWidth;

//   if (windowWidth === 479 || windowWidth === 767 || windowWidth === 991) {
//     window.location.reload();
//   }
// }

// window.addEventListener("resize", softRefresh);

// $(document).ready(function () {
//   var flipList = $("#flip-list");
//   var originalChildren = $('[data-item="flip-item"]', flipList);

//   // Duplicate the original children 5 times
//   for (var i = 0; i < 5; i++) {
//     flipList.append(originalChildren.clone());
//   }

//   var flipItems = $('[data-item="flip-item"]');

//   // Run the looped animation
//   function runAnimationLoop() {
//     flipItems.each(function (index) {
//       var translateYValue = (index + 1) * -100;
//       var delay = 1000 * index; // Delay of 1 second between each transform

//       setTimeout(
//         function () {
//           $(this).css("transform", "translateY(" + translateYValue + "%)");
//         }.bind(this),
//         delay
//       );
//     });

//     // Wait for the animation to complete and then restart the loop
//     setTimeout(function () {
//       flipItems.css("transform", "");
//       runAnimationLoop();
//     }, flipItems.length * 1000); // Wait for all elements to animate fully
//   }

//   // Start the animation loop
//   runAnimationLoop();
// });
// navbar behaviour starts here

$(document).ready(function () {
  var navbar = $(".navbar");
  var navLink = $("#nav-link");
  const scrollingBkg = "#F2F0FF";
  const minWinWidthJumpToWhite = 991;
  const minHeightForWhiteBkg = 80;

  // Function to handle background and filter
  var handleBackgroundAndFilter = function (bgColor, filterValue) {
    navbar.css("background-color", bgColor);
    navLink.css("filter", filterValue);
  };

  // Scrolling effects for desktop
  var scrollEffectsDesktop = function () {
    if ($(window).scrollTop() < minHeightForWhiteBkg) {
      handleBackgroundAndFilter("transparent", "saturate(0%) contrast(200%)");
    } else {
      handleBackgroundAndFilter(scrollingBkg, "saturate(0%) contrast(200%)");
    }
  };

  // Scrolling effects for mobile
  var scrollEffectsMobile = function () {
    if ($(window).scrollTop() < minHeightForWhiteBkg) {
      handleBackgroundAndFilter("white", "saturate(0%) contrast(200%)");
    } else {
      handleBackgroundAndFilter("white", "none");
    }
  };

  // Check window size on load
  if ($(window).width() < minWinWidthJumpToWhite) {
    handleBackgroundAndFilter("white", "saturate(0%) contrast(200%)");
  } else {
    scrollEffectsDesktop();
  }

  // Check window size on resize
  $(window).resize(function () {
    if ($(this).width() < minWinWidthJumpToWhite) {
      handleBackgroundAndFilter("white", "saturate(0%) contrast(200%)");
    } else {
      scrollEffectsDesktop();
    }
  });

  // Check scroll distance on scroll
  $(window).scroll(function () {
    if ($(window).width() < minWinWidthJumpToWhite) {
      scrollEffectsMobile();
    } else {
      scrollEffectsDesktop();
    }
  });

  // mouseenter function
  navbar.mouseenter(function () {
    if ($(window).width() >= minWinWidthJumpToWhite) {
      handleBackgroundAndFilter("white", "none");
    }
  });

  // mouseleave function
  navbar.mouseleave(function () {
    if ($(window).width() >= minWinWidthJumpToWhite) {
      scrollEffectsDesktop();
    }
  });
});

// rotator starts here

$.extend($.easing, {
  lessBouncy: function (x, t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return (
      b + c * (33 * tc * ts + -106 * ts * ts + 126 * tc + -67 * ts + 15 * t)
    );
  }
});
$(".rotator").css("opacity", 0);
$(document).ready(function () {
  var index = 0;
  var items = $(".rotator .items");
  var itemAmt = items.length;
  var cycleInterval;
  var cycleTimeInterval = 1600;

  var maxItemWidth = Math.max(
    ...items.map(function () {
      return $(this).outerWidth(true);
    })
  );

  $(".rotator").css("height", $(".items").outerHeight());
  $(".rotator").css("opacity", 1);
  $(".rotator").css("width", maxItemWidth);

  $(window).resize(function () {
    $(".rotator").css("height", $(".items").outerHeight());
  });

  function cycleItems() {
    var currentItem = items.eq(index);
    var nextItem = index === itemAmt - 1 ? items.eq(0) : items.eq(index + 1);

    $(".rotator").css("width", nextItem.outerWidth());
    nextItem.css("top", "100%");
    currentItem.animate(
      { top: "-100%", opacity: 0 },
      2000,
      "lessBouncy",
      function () {
        $(this).css("opacity", 0);
      }
    );
    nextItem
      .css("opacity", 0)
      .animate({ top: "0", opacity: 1 }, cycleTimeInterval, "lessBouncy");
    index++;
    if (index > itemAmt - 1) {
      index = 0;
    }
  }

  // Start cycling
  cycleInterval = setInterval(cycleItems, cycleTimeInterval);

  // Visibility change event
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      // If the page is hidden, clear the interval
      clearInterval(cycleInterval);
    } else {
      // If the page is visible, start the interval
      cycleInterval = setInterval(cycleItems, cycleTimeInterval);
    }
  });
});

// navbar behaviour starts here

$(document).ready(function () {
  var navbar = $(".navbar");
  var navLink = $("#nav-link");
  const scrollingBkg = "#F2F0FF";
  const minWinWidthJumpToWhite = 991;
  const minHeightForWhiteBkg = 80;

  // Function to handle background and filter
  var handleBackgroundAndFilter = function (bgColor, filterValue) {
    navbar.css("background-color", bgColor);
    navLink.css("filter", filterValue);
  };

  // Scrolling effects for desktop
  var scrollEffectsDesktop = function () {
    if ($(window).scrollTop() < minHeightForWhiteBkg) {
      handleBackgroundAndFilter("transparent", "saturate(0%) contrast(200%)");
    } else {
      handleBackgroundAndFilter(scrollingBkg, "saturate(0%) contrast(200%)");
    }
  };

  // Scrolling effects for mobile
  var scrollEffectsMobile = function () {
    if ($(window).scrollTop() < minHeightForWhiteBkg) {
      handleBackgroundAndFilter("white", "saturate(0%) contrast(200%)");
    } else {
      handleBackgroundAndFilter("white", "none");
    }
  };

  // Check window size on load
  if ($(window).width() < minWinWidthJumpToWhite) {
    handleBackgroundAndFilter("white", "saturate(0%) contrast(200%)");
  } else {
    scrollEffectsDesktop();
  }

  // Check window size on resize
  $(window).resize(function () {
    if ($(this).width() < minWinWidthJumpToWhite) {
      handleBackgroundAndFilter("white", "saturate(0%) contrast(200%)");
    } else {
      scrollEffectsDesktop();
    }
  });

  // Check scroll distance on scroll
  $(window).scroll(function () {
    if ($(window).width() < minWinWidthJumpToWhite) {
      scrollEffectsMobile();
    } else {
      scrollEffectsDesktop();
    }
  });

  // mouseenter function
  navbar.mouseenter(function () {
    if ($(window).width() >= minWinWidthJumpToWhite) {
      handleBackgroundAndFilter("white", "none");
    }
  });

  // mouseleave function
  navbar.mouseleave(function () {
    if ($(window).width() >= minWinWidthJumpToWhite) {
      scrollEffectsDesktop();
    }
  });
});

// rotator starts here

$.extend($.easing, {
  lessBouncy: function (x, t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return (
      b + c * (33 * tc * ts + -106 * ts * ts + 126 * tc + -67 * ts + 15 * t)
    );
  }
});
$(".rotator").css("opacity", 0);
$(document).ready(function () {
  var index = 0;
  var items = $(".rotator .items");
  var itemAmt = items.length;
  var cycleInterval;
  var cycleTimeInterval = 1600;

  var maxItemWidth = Math.max(
    ...items.map(function () {
      return $(this).outerWidth(true);
    })
  );

  $(".rotator").css("height", $(".items").outerHeight());
  $(".rotator").css("opacity", 1);
  $(".rotator").css("width", maxItemWidth);

  $(window).resize(function () {
    $(".rotator").css("height", $(".items").outerHeight());
  });

  function cycleItems() {
    var currentItem = items.eq(index);
    var nextItem = index === itemAmt - 1 ? items.eq(0) : items.eq(index + 1);

    $(".rotator").css("width", nextItem.outerWidth());
    nextItem.css("top", "100%");
    currentItem.animate(
      { top: "-100%", opacity: 0 },
      2000,
      "lessBouncy",
      function () {
        $(this).css("opacity", 0);
      }
    );
    nextItem
      .css("opacity", 0)
      .animate({ top: "0", opacity: 1 }, cycleTimeInterval, "lessBouncy");
    index++;
    if (index > itemAmt - 1) {
      index = 0;
    }
  }

  // Start cycling
  cycleInterval = setInterval(cycleItems, cycleTimeInterval);

  // Visibility change event
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      // If the page is hidden, clear the interval
      clearInterval(cycleInterval);
    } else {
      // If the page is visible, start the interval
      cycleInterval = setInterval(cycleItems, cycleTimeInterval);
    }
  });
});

// slider starts here

const createSlider = (sliderElement, start, map1, map2) => {
  noUiSlider.create(sliderElement, {
    start: [start],
    padding: [30, 0],
    snap: true,
    connect: [true, false],
    range: {
      min: 30,
      "16%": 30,
      "32%": 60,
      "48%": 100,
      "64%": 200,
      "80%": 400,
      "95%": 800,
      "100%": 810,
      max: 810
    }
  });

  sliderElement.noUiSlider.on("update", function (values, handle) {
    let tabs = $("[data-box='slider-tab']");
    let activeTabIndex = tabs.index(tabs.filter(".is-active"));
    let sliderValue = Math.round(values[handle]);
    calculateAndDisplaySavings(activeTabIndex, sliderValue);

    let value = Math.round(values[handle]);
    $(`#${sliderElement.id}-val`).text(value);

    if (
      map1.hasOwnProperty(value.toString()) &&
      map2.hasOwnProperty(value.toString())
    ) {
      let calculatedValue1 = map1[value.toString()];
      let calculatedValue2 = map2[value.toString()];
      $(`#calculated-${sliderElement.id}-monthly`).text(calculatedValue1);
      $(`#calculated-${sliderElement.id}-annually`).text(calculatedValue2);

      let costValueMonthly = calculatedValue1 / (value * 1000);
      let costValueAnnually = calculatedValue2 / (value * 1000);

      $(`#cost-${sliderElement.id}-monthly`).text(
        isNaN(costValueMonthly) ? "-" : costValueMonthly.toFixed(3)
      );
      $(`#cost-${sliderElement.id}-annually`).text(
        isNaN(costValueAnnually) ? "-" : costValueAnnually.toFixed(3)
      );

      let tabs = $("[data-box='slider-tab']");
      let activeTabIndex = tabs.index(tabs.filter(".is-active"));
      let sliderValue = Number($(`#${sliderElement.id}-val`).text()) * 1000;

      let calculatedValue1Numeric = isNaN(calculatedValue1)
        ? null
        : Number(calculatedValue1);
      let calculatedValue2Numeric = isNaN(calculatedValue2)
        ? null
        : Number(calculatedValue2);

      let savingsValue;
      if (savingTable.hasOwnProperty(calculatedValue1Numeric)) {
        savingsValue = savingTable[calculatedValue1Numeric];
      } else if (savingTable.hasOwnProperty(calculatedValue2Numeric)) {
        savingsValue = savingTable[calculatedValue2Numeric];
      }

      // if (savingsValue !== undefined) {
      //   console.log(savingsValue);
      //   $("#savings").text(savingsValue);
      // }

      if (activeTabIndex === 0) {
        // Monthly tab
        let monthValue = $("#calculated-slider-monthly").text();
        $("#picked").text(monthValue);

        let sessionCostMonthly = Number(monthValue) / sliderValue;
        $("#cost-session").text(
          isNaN(sessionCostMonthly) ? "-" : sessionCostMonthly.toFixed(3)
        );
      } else if (activeTabIndex === 1) {
        // Annually tab
        let yearValue = $("#calculated-slider-annually").text();
        $("#picked").text(yearValue);
        let sessionCostAnnually = Number(yearValue) / sliderValue;
        $("#cost-session").text(
          isNaN(sessionCostAnnually) ? "-" : sessionCostAnnually.toFixed(3)
        );
      }
    }
  });
};

let sliderMappingMonthly = {
  "30": 450,
  "60": 600,
  "100": 750,
  "200": 1000,
  "400": 1500,
  "800": 2000,
  "810": "Get a quote"
};
let sliderMappingAnnually = {
  "30": 405,
  "60": 540,
  "100": 675,
  "200": 900,
  "400": 1350,
  "800": 1800,
  "810": "Get a quote"
};

let savingTable = {
  405: 12095,
  450: 12050,
  540: 11960,
  600: 11900,
  675: 11825,
  750: 11750,
  900: 11600,
  1000: 11500,
  1350: 11150,
  1500: 11000,
  1800: 10700,
  2000: 10500
};

const slider = document.getElementById("slider");
createSlider(slider, 60, sliderMappingMonthly, sliderMappingAnnually);

// Handle resize events
let handleElements = $('[data-handle="0"]');
let anchorElements = $("[data-anchor]");
$(window)
  .resize(function () {
    handleElements.each(function (index) {
      if (window.innerWidth > 767) {
        if (anchorElements[index]) {
          $(this).append(anchorElements[index]);
        }
      } else {
        var dataAnchor = $(this).children("[data-anchor]");
        if (dataAnchor.length) {
          $("#slider").append(dataAnchor);
        }
      }
    });
  })
  .trigger("resize");

// Handle tab click events
$("[data-box='slider-tab']").on("click", function () {
  $("[data-box='slider-tab']")
    .removeClass("is-active")
    .each(function () {
      const indicator = $(this).find("[data-role='indicator']")[0];
      indicator.innerHTML =
        '<svg id="inactive" width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="1" width="31" height="31" rx="15.5" stroke="black"></rect></svg>';
    });

  $(this).addClass("is-active");
  const indicator = $(this).find("[data-role='indicator']")[0];
  indicator.innerHTML =
    '<svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.5" width="32" height="32" rx="16" fill="#FB8F37"></rect><path d="M11 16.25L14.5 19.75L21 13.25" stroke="white" stroke-width="1.5"></path></svg>';

  // slider.noUiSlider.set(slider.noUiSlider.get());
  updateSliderValues();
  const activeTabIndex = $("[data-box='slider-tab']").index(
    $(this).addClass("is-active")
  );
  const sliderValue = Math.round(slider.noUiSlider.get());
  calculateAndDisplaySavings(activeTabIndex, sliderValue);
});

function updateSliderValues() {
  slider.noUiSlider.set(slider.noUiSlider.get());
}
slider.noUiSlider.on("change", function () {
  updateSliderValues();
});

// Function to calculate and display savings
function calculateAndDisplaySavings(activeTabIndex, sliderValue) {
  let map = activeTabIndex === 0 ? sliderMappingMonthly : sliderMappingAnnually;
  let calculatedValue = map.hasOwnProperty(sliderValue.toString())
    ? map[sliderValue.toString()]
    : null;

  if (calculatedValue) {
    let savingsValue =
      savingTable[isNaN(calculatedValue) ? null : Number(calculatedValue)];
    $("#savings").text(
      savingsValue ? savingsValue.toLocaleString("en-US") : "-"
    );
  }
}
