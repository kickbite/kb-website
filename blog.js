$(document).ready(function () {
  var sb = $('[data-item="search-bar"]');
  var sBox = $('[data-item="search-box"]');
  var sClose = $('[data-item="search-close"]');

  if (!sb.is(":focus")) sClose.hide();

  sb.on("focus", function () {
    if ($(window).width() > 767) {
      $(this).add(sBox).addClass("is-active");
      sClose.show();
    }
  });

  sb.on("blur", function () {
    if ($(window).width() > 767) {
      $(this).add(sBox).removeClass("is-active").end().val("");
      sClose.hide();
    }
  });

  sClose.on("click", function () {
    if ($(window).width() > 767) sb.val("").blur();
  });

  $(document).on("keypress", function (e) {
    if (e.which === 47 && $(window).width() > 767) {
      e.preventDefault();
      sb.focus();
    }
  });
});

$(document).ready(function () {
  var element = $('[fs-cmsfilter-element="clear"]').remove();
  element.prependTo('[data-item="fiters"]');
});

$(document).ready(function () {
  var clearElement = $('[fs-cmsfilter-element="clear"]');
  var checkboxes = $('[data-item="fiters"] input[type="checkbox"]').not(clearElement.find("input"));
  var searchBar = $('[data-item="search-bar"]');
  var queryElement = $('[data-item="search-query"]');
  var listElement = $('[fs-cmsfilter-element="list"]');
  var filtersState = 0;
  // Global filters state object

  var config = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ["class"],
    attributeOldValue: true,
  };

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") {
        if ($(mutation.target).is("label.is-active")) {
          filtersState += 1;
          console.log(filtersState);
          if (mutation.target !== clearElement.get(0)) {
            clearElement.removeClass("is-active");
          }
        } else if (mutation.oldValue.includes("is-active")) {
          filtersState = Math.max(0, filtersState - 1);
          // Make sure it doesn't go negative
        }
      }
    });
  });

  var targetNode = $('[data-item="fiters"]').get(0);
  observer.observe(targetNode, config);

  function updateCountAndQuery() {
    setTimeout(function () {
      var resultsCount = listElement.children().length;
      var searchValue = searchBar.val();
      queryElement.text(`${searchValue}`);

      // Re-check after DOM changes
      adjustClearElementClass();
    }, 200);
  }

  function adjustClearElementClass() {
    // Checks filtersState for any 'is-active' filter
    if (!Object.values(filtersState).includes(true)) {
      clearElement.addClass("is-active");
    } else {
      clearElement.removeClass("is-active");
    }
  }

  checkboxes.change(function () {
    if (checkboxes.is(":checked")) {
      $('[data-item="list-all"]').css("display", "grid");
      $('[data-item="category"]').css("display", "none");
      clearElement.removeClass("is-active");
    } else {
      $('[data-item="list-all"]').css("display", "none");
      $('[data-item="category"]').css("display", "grid");
      clearElement.addClass("is-active");
    }
    adjustClearElementClass();
    updateCountAndQuery();
  });

  searchBar.on("input", updateCountAndQuery);

  clearElement.click(function () {
    // disconnect observer before initiating class changes
    observer.disconnect();

    $(this).addClass("is-active");
    $('[data-item="list-all"]').css("display", "none");
    $('[data-item="category"]').css("display", "grid");
    updateCountAndQuery();
    adjustClearElementClass();

    // Re-observe after operations are done
    observer.observe(targetNode, config);
  });

  if (!checkboxes.is(":checked")) {
    clearElement.addClass("is-active");
    $('[data-item="list-all"]').css("display", "none");
    $('[data-item="category"]').css("display", "grid");
    updateCountAndQuery();
  }
});
