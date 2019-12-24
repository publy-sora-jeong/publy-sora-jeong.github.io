$(document).ready(function() {
  initDom();

  $("#nav-button").on("click", function() {
    $(this).toggleClass("active");
    var hasToggleClass = $(this).hasClass("active");
    if (hasToggleClass) {
      $("nav").addClass("active");
    } else {
      $("nav").removeClass("active");
    }
  });
  //scroll event
  $(window).on("scroll", function() {
    var scroll = $(this).scrollTop();
    console.log(scroll);
    scrollBox1(scroll);
    savePos(scroll);
    activeBtn(scroll);
    headerfix(scroll);
  });
});

var $obj1;
var $header;
//var $navi_li, $section, $body, posArr, len, $obj1;
var posArr, $section, len;

function initDom() {
  $obj1 = $(".obj-01");
  $obj2 = $(".obj-02");
  $obj3 = $(".obj-03");
  $obj4 = $(".obj-04");
  $obj5 = $(".obj-05");
  $header = $(".header");
  $section = $(".section");
  len = $(".section").length;
}

function headerfix(scroll) {
  if (scroll > 100) {
    $header.addClass("fixed");
  } else {
    $header.removeClass("fixed");
  }
}

function scrollBox1(scroll) {
  $obj1.css({
    transform: "translateY(" + scroll / 2 + "px)"
  });
  $obj2.css({
    transform: "translateY(" + scroll / 2.5 + "px)",
    "transition-delay": "0.5s"
  });
  $obj3.css({
    transform: "translateY(" + scroll / 6 + "px)"
  });
  $obj4.css({
    transform: "translateY(" + scroll / 5 + "px)",
    "transition-delay": "0.5s"
  });
  $obj5.css({
    transform: "translateY(" + scroll / 8 + "px)"
  });
}

//세로위치값을 배열에 담는 함수정의
function savePos() {
  posArr = [];
  //len = $navi_li.length;
  for (var i = 0; i < len; i++) {
    posArr.push($section.eq(i).offset().top);
  }
  posArr.push($section.last().offset().top + $section.last().height());
}

//버튼활성화 함수정의
function activeBtn(scroll) {
  var base = -500;
  for (var i = 0; i < len; i++) {
    if (scroll >= posArr[i] + base && scroll < posArr[i + 1] + base) {
      // $navi_li.removeClass('on');
      // $navi_li.eq(i).addClass('on');

      //$section.removeClass('on');
      $section.eq(i).addClass("on");
    }
  }
}
