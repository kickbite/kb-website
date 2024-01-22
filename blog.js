var searchBar = $('[data-item="search-bar"]');

function updateCountAndQuery() {
  setTimeout(function () {
    var queryElement = $('[data-item="search-query"]');
    var searchValue = searchBar.val();
    var el = $(".category_header .is-query");

    queryElement.text(`"${searchValue}"`);

    if (searchValue.trim() === "") {
      el.css("display", "none");
    } else {
      el.css("display", "flex");
    }

    // adjustClearElementClass();
  }, 200);
}

searchBar.on("input", updateCountAndQuery);
