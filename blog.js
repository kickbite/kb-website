$(document).ready(function () {
  var searchBar = $('[data-item="search-bar"]');
  var el = $(".category_header.is-query");

  // Checking input value on page load
  var initialSearchValue = searchBar.val().trim();
  if (initialSearchValue === "") {
    el.css("display", "none");
  } else {
    el.css("display", "flex");
    queryElement.text(`"${initialSearchValue}"`);
  }

  function updateCountAndQuery() {
    setTimeout(function () {
      var queryElement = $('[data-item="search-query"]');
      var searchValue = searchBar.val().trim();

      queryElement.text(`${searchValue}`);

      if (searchValue === "") {
        el.css("display", "none");
      } else {
        el.css("display", "flex");
      }

      // adjustClearElementClass();
    }, 200);
  }

  searchBar.on("input", updateCountAndQuery);
});
