// $(document).ready(function () {
//   var sb = $('[data-item="search-bar"]');
//   var sBox = $('[data-item="search-box"]');
//   var sClose = $('[data-item="search-close"]');

//   if (!sb.is(":focus")) sClose.hide();

//   sb.on("focus", function () {
//     if ($(window).width() > 767) {
//       $(this).add(sBox).addClass("is-active");
//       sClose.show();
//     }
//   });

//   sb.on("blur", function () {
//     if ($(window).width() > 767) {
//       $(this).add(sBox).removeClass("is-active").end().val("");
//       sClose.hide();
//     }
//   });

//   sClose.on("click", function () {
//     if ($(window).width() > 767) sb.val("").blur();
//   });

//   $(document).on("keypress", function (e) {
//     if (e.which === 47 && $(window).width() > 767) {
//       e.preventDefault();
//       sb.focus();
//     }
//   });
// });

// $(document).ready(function () {
//   var element = $('[fs-cmsfilter-element="clear"]').remove();
//   element.prependTo('[data-item="fiters"]');
// });

// $(document).ready(function () {
//   var clearElement = $('[fs-cmsfilter-element="clear"]');
//   var checkboxes = $('[data-item="fiters"] input[type="checkbox"]').not(clearElement.find("input"));
//
//   var queryElement = $('[data-item="search-query"]');
//   var listElement = $('[fs-cmsfilter-element="list"]');
//   var filtersState = 0;

//   var config = {
//     attributes: true,
//     childList: true,
//     subtree: true,
//     attributeFilter: ["class"],
//     attributeOldValue: true,
//   };

//   var observer = new MutationObserver(function (mutations) {
//     mutations.forEach(function (mutation) {
//       if (mutation.type === "attributes") {
//         if ($(mutation.target).is("label.is-active")) {
//           filtersState += 1;
//           if ($('[data-item="list-all"]').css("display") !== "grid" && mutation.target !== clearElement.get(0)) {
//             clearElement.removeClass("is-active");
//           }
//         } else if (mutation.oldValue.includes("is-active")) {
//           filtersState = Math.max(0, filtersState - 1);
//         }
//       }
//     });
//   });

//   var targetNode = $('[data-item="fiters"]').get(0);
//   observer.observe(targetNode, config);

var searchBar = $('[data-item="search-bar"]');

function updateCountAndQuery() {
  setTimeout(function () {
    var queryElement = $('[data-item="search-query"]');
    var searchValue = searchBar.val();
    queryElement.text(`${searchValue}`);

    // adjustClearElementClass();
  }, 200);
}

// function adjustClearElementClass() {
//   if (!Object.values(filtersState).includes(true)) {
//     if ($('[data-item="list-all"]').css("display") !== "grid") {
//       clearElement.addClass("is-active");
//     }
//   } else {
//     clearElement.removeClass("is-active");
//   }
// }

// checkboxes.change(function () {
//   if (checkboxes.is(":checked")) {
//     $('[data-item="list-all"]').css("display", "grid");
//     $('[data-item="category"]').css("display", "none");
//     clearElement.removeClass("is-active");
//   } else {
//     $('[data-item="list-all"]').css("display", "none");
//     $('[data-item="category"]').css("display", "grid");
//     if ($('[data-item="list-all"]').css("display") !== "grid") {
//       clearElement.addClass("is-active");
//     }
//   }
//   adjustClearElementClass();
//   updateCountAndQuery();
// });

searchBar.on("input", updateCountAndQuery);

// clearElement.click(function () {
//   observer.disconnect();
//   $('[data-item="list-all"]').css("display", "none");
//   $('[data-item="category"]').css("display", "grid");
//   if ($('[data-item="list-all"]').css("display") !== "grid") {
//     $(this).addClass("is-active");
//   }
//   updateCountAndQuery();
//   adjustClearElementClass();
//   observer.observe(targetNode, config);
// });

// if (!checkboxes.is(":checked") && $('[data-item="list-all"]').css("display") !== "grid") {
//   clearElement.addClass("is-active");
//   $('[data-item="list-all"]').css("display", "none");
//   $('[data-item="category"]').css("display", "grid");
//   updateCountAndQuery();
// }
// });
