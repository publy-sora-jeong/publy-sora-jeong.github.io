//vars

$(document).ready(function () {
  // initDon();
  // savePosition();
  var isScrolled = true;
  var scroll_index = 0;
  var max = 3;

  visual();

  var vids = $("#sec03-vid");
  $.each(vids, function () {
    this.controls = false;
  });

  //MAIN PRE LOADING IMAGE
  setTimeout(function () {
    $("#sec01").addClass("active");
    $(".loading").fadeOut(500, function () {
      $(this).remove();
    });
    $("html body").css({
      background: "none"
    });
  }, 1500);

  $("html, body").on("mousewheel DOMMouseScroll", function (e) {
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();

    if (screenWidth > 1024 && screenHeight > 768) {
      if (isScrolled) {
        isScrolled = false;
        var E = e.originalEvent;
        if (E.wheelDelta < 0) {
          scroll_index == max ? (scroll_index = max) : scroll_index++;
          //console.log("Scroll Down");
          pageSlide(scroll_index);
        } else {
          scroll_index == 0 ? (scroll_index = 0) : scroll_index--;
          //console.log("Scroll Up");
          pageSlide(scroll_index);
        }
        setTimeout(function () {
          isScrolled = true;
          //console.log("scroll animation finished");
        }, 2000);
      }
    }
  });

  $(".btnPageNext, .btnPagePrev ").on("click", function (idx) {
    var idx = $(this).data("page");
    pageSlide(idx);
  });
});

function pageSlide(idx) {
  console.log(idx);
  $("section").removeClass("active");
  $("section")
    .eq(idx)
    .addClass("active");
}

function resize() {
  var winH = $(window).outerHeight();
  var winW = $(window).outerWidth();
  $("#container").css("height", winH);
  if (winW <= 768) {
    $(".sec01").css("height", winH - $(".topbanner").outerHeight());
  } else {
    $(".sec01").css("height", "auto");
  }
}

function visual() {
  var idx = 0;
  var delay = 3000;
  var visual = $("#sec01 .main-visual--item");
  var text = $(".sec01 .visualText");
  var timer = setInterval(function () {
    idx == 0 ? (idx = 1) : (idx = 0);
    visual
      .eq(idx)
      .fadeIn(1500)
      .siblings()
      .fadeOut(1500);
    text
      .eq(idx)
      .show()
      //.siblings(".visualText")
      .hide();
  }, delay);
}