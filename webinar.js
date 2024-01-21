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
//     if (e.which == 47 && $(window).width() > 767) {
//       e.preventDefault();
//       sb.focus();
//     }
//   });
// });
