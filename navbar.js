// navbar behaviour starts here

$(document).ready(function () {
  var navbar = $(".navbar");
  var navLink = $("#nav-link");
  const scrollingBkg = "#F2F0FF";
  const minWinWidthJumpToWhite = 991;
  const minHeightForWhiteBkg = 40;

  // Function to handle background and filter
  var handleBackgroundAndFilter = function (bgColor, filterValue) {
    navbar.css("background-color", bgColor);
    navLink.css("filter", filterValue);
  };

  // Scrolling effects for desktop
  var scrollEffectsDesktop = function () {
    if ($(window).scrollTop() < minHeightForWhiteBkg) {
      handleBackgroundAndFilter("transparent", "saturate(0%) contrast(300%)");
    } else {
      handleBackgroundAndFilter(scrollingBkg, "saturate(0%) contrast(300%)");
    }
  };

  // Scrolling effects for mobile
  var scrollEffectsMobile = function () {
    if ($(window).scrollTop() < minHeightForWhiteBkg) {
      handleBackgroundAndFilter("white", "saturate(0%) contrast(300%)");
    } else {
      handleBackgroundAndFilter("white", "none");
    }
  };

  // Check window size on load
  if ($(window).width() < minWinWidthJumpToWhite) {
    handleBackgroundAndFilter("white", "saturate(0%) contrast(300%)");
  } else {
    scrollEffectsDesktop();
  }

  // Check window size on resize
  $(window).resize(function () {
    if ($(this).width() < minWinWidthJumpToWhite) {
      handleBackgroundAndFilter("white", "saturate(0%) contrast(300%)");
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

  // navbar behavior on mobile
  if ($(window).width() < 992) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList") {
          // Check if navbar is opened or closed
          var overlayChildrenCount = $(".w-nav-overlay").children().length;
          var hasScrolled = $(window).scrollTop() < minHeightForWhiteBkg;
          if (overlayChildrenCount > 0) {
            navLink.css("filter", "none");
          } else if (hasScrolled) {
            navLink.css("filter", "saturate(0%) contrast(300%)");
          }
          // If scrolled more than minHeightForWhiteBkg and closed, do nothing.
        }
      });
    });
    var targetNode = document.querySelector(".w-nav-overlay");
    observer.observe(targetNode, { childList: true });
  }
});

// Popup checkboxes

$(document).ready(function () {
  var $form = $("[data-form='popup']");
  var $checkboxes = $form.find("input[type='checkbox']");
  var $item = $("[data-banner='item']");
  var $message = $("[data-banner='message']");
  var $emoji = $("[data-banner='emoji']");

  $checkboxes.change(function () {
    var allChecked =
      $checkboxes.length === $checkboxes.filter(":checked").length;

    $item.toggleClass("yes", allChecked);
    $message.css("color", allChecked ? "#115921" : "");

    if (allChecked) {
      $message.text("Congratulations! You’re ready yet to use Kickbite.");
      $emoji.text("🥳");
    } else {
      $message.text("You’re not ready yet to use Kickbite.");
      $emoji.text("😔");
    }
  });
});

// more info logic button

function toggleContentVisibilityBasedOnClick() {
  var ifClicked = localStorage.getItem("ifClicked");

  if (ifClicked === null) {
    localStorage.setItem("ifClicked", "false");
    ifClicked = "false";
  }

  if (ifClicked === "true") {
    $('[data-content="more-information"]').addClass("initially-hidden");
  } else if (ifClicked === "false") {
    $('[data-content="more-information"]').removeClass("initially-hidden");
  }

  $("[data-modifier='true']").on("click", function (e) {
    localStorage.setItem("ifClicked", "true");
    $('[data-content="more-information"]').addClass("initially-hidden");
  });

  $(".button:not([data-modifier='true'])").on("click", function (e) {
    localStorage.setItem("ifClicked", "false");
    $('[data-content="more-information"]').removeClass("initially-hidden");
  });
}

$(document).ready(toggleContentVisibilityBasedOnClick);

// animation trigger
let animation = lottie.loadAnimation({
  container: document.getElementById("confident"),
  renderer: "svg",
  loop: false,
  autoplay: true,
  path:
    "https://uploads-ssl.webflow.com/64b8df09204bfb1667ac9c4e/65017300f255dded9f361605_new-confident.json"
});

animation.addEventListener("complete", function () {
  $("#button-to-show").css("display", "flex");
});
let animation2 = lottie.loadAnimation({
  container: document.getElementById("get-a-demo"),
  renderer: "svg",
  loop: false,
  autoplay: true,
  path:
    "https://uploads-ssl.webflow.com/64b8df09204bfb1667ac9c4e/64fada86628acf6135862dbb_get-a-demo-no-button.json"
});

animation2.addEventListener("complete", function () {
  $("#button-to-show").css("display", "flex");
});

// collapse first FAQ

$(document).ready(function () {
  $('*[data-order="1"]').click();
});

// transferred to webflow at 14/09 15:00
