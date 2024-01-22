$(document).ready(function () {
  var searchBar = $('[data-item="search-bar"]');
  var el = $(".category_header.is-query");
  var fsCmsfilterElement = $('[fs-cmsfilter-element="empty"]');
  var wPaginationWrapper = $(".w-pagination-wrapper");
  var filters = $('[data-item="filters"]');
  var clearElement = $('[fs-cmsfilter-element="clear"]');

  function checkAndUpdateDisplay() {
    if (fsCmsfilterElement.css("display") === "flex") {
      el.css("display", "none");
      wPaginationWrapper.css("display", "none");
    } else {
      el.css("display", "flex");
      wPaginationWrapper.css("display", "grid");
    }
  }

  var observer = new MutationObserver(checkAndUpdateDisplay);
  observer.observe(fsCmsfilterElement[0], {
    attributes: true,
    attributeFilter: ["style"],
  });

  var initialSearchValue = searchBar.val().trim();

  if (initialSearchValue === "") {
    el.css("display", "none");
  } else {
    el.css("display", "flex");
    $('[data-item="search-query"]').text(`"${initialSearchValue}"`);
  }

  function updateCountAndQuery() {
    setTimeout(function () {
      var searchValue = searchBar.val().trim();
      $('[data-item="search-query"]').text(`${searchValue}`);

      if (searchValue === "") {
        el.css("display", "none");
      } else {
        el.css("display", "flex");
      }
    }, 200);
  }

  searchBar.on("input", updateCountAndQuery);

  // Use MutationObserver to monitor for class changes on filter checkboxes
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.target.classList.contains("w--redirected-checked")) {
        clearElement.removeClass("is-active");
      }
    });
  }).observe(filters[0], {
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });

  clearElement.on("click", function () {
    $(this).addClass("is-active");
  });
});
