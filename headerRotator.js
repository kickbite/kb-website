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

// transferred to Webflow 14/09 15:00
