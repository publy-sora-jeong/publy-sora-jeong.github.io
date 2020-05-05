var $headerWrap, $gnb, $gnb_li, $gnb_li_a, $gnb_ul, $gnb_ul_li_a, isDone;

var isOpen;

var $mainBiz;


$(document).ready(function () {
  initDom();

  //MAIN VISUAL SLIDER
  $('.main-visual-wrap').slick({
    infinite: true,
    dots: true,
    speed: 1000,
    autoplay: false,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    arrows: true
  });

  //dot ellipsis
  $(".dot").each(function () {
    $(this).dotdotdot({
      ellipsis: "\u2026",
      wrap: "word",
      watch: true,
      tolerance: 0
    });
  });


  //QNA
  $('.qna-list  > dt').on('click', function () {
    $('.qna-list  > dt').removeClass('open');
    $(this).addClass('open');
    $('.qna-list dd').slideUp(300, function () {
      $(this).removeClass('open');
    });
    $(this).next().slideDown(300, function () {
      $(this).addClass('open');
    });
  });

  mainBizSlide();


  $(window).on("resize", function () {
    mainBizSlide();
  });
  $gnb_li.on("mouseenter", function () {
    $(this).addClass("on");
    $('header').addClass('on');
  });

  $gnb_li.on("mouseleave", function () {
    $(this).removeClass("on");
    $('header').removeClass('on');
  });

  $gnb.on("mouseenter", openSub);
  $gnb.on("mouseleave", closeSub);
  $gnb.on("focusin", openSub);

  isOpen = false;

  //MOBILE GNB
  $("#m-gnb").removeClass("on");
  $(".m-gnb-open").toggle(
    function () {
      $(this).addClass("on");
      $("#m-gnb-bg").addClass("on");
      $("#m-gnb")
        .stop()
        .delay(10)
        .animate({
            right: 0
          },
          300
        )
        .addClass("on");
    },
    function () {
      $(this).removeClass("on");
      $("#m-gnb-bg").removeClass("on");
      $("#m-gnb")
        .stop()
        .delay(100)
        .animate({
            right: -300
          },
          300
        )
        .removeClass("on");
    }
  );


  //모바일네비 > Slide up & down
  $("#m-gnb > ul > li  > a ").on("click", function (e) {
    e.preventDefault();
    if ($("#m-gnb").hasClass("on")) {
      $("#m-gnb > ul li").removeClass("selected");
      $("#m-gnb .m-sub-nav")
        .stop()
        .slideUp(500);

      $(this)
        .parent()
        .addClass("selected");
      $(this)
        .parent()
        .find(".m-sub-nav")
        .stop()
        .slideDown(500);
    } else {
      $(this)
        .parent()
        .removeClass("selected");
      $(this)
        .parent()
        .find(".m-sub-nav")
        .stop()
        .slideUp(500);
    }
  });
});

function initDom() {


  //GNB
  $headerWrap = $(".header-wrap");
  $gnb = $("#gnb > ul");
  $gnb_li = $gnb.children("li");
  $gnb_li_a = $gnb_li.children("a");
  $gnb_ul = $gnb.find("ul");
  $gnb_ul_li_a = $gnb_ul.find("a");
  isDone = true;

  $mainBiz = $('.biz-wrap ');

}

function openSub() {
  var isBgGnb = $(".bgGnb").length;
  if (!isBgGnb) {
    $gnb.append(
      $('<div class="bgGnb">').css({
        width: "3000px",
        //height: getSubMaxHeight(),
        height: 350,
        //backgroundColor: "#fff",
        position: "absolute",
        left: "50%",
        top: 77,
        display: "none",
        marginLeft: -1500,
        borderTop: "1px solid #eee"
      })
    );

    //$gnb_ul.height(230);
  }

  if (isDone) {
    isDone = false;
    $gnb_ul.stop().slideDown(500);
    $(".bgGnb")
      .stop()
      .slideDown(500);
  }
}

function closeSub() {
  $gnb_ul.slideUp(300);
  $(".bgGnb").slideUp(300, function () {
    $(this).remove();
    isDone = true;
  });
}

function getSubMaxHeight() {
  var ht_max = 0;
  var ht_arr = [];

  $gnb_li.each(function (i) {
    ht_arr.push(
      $(this)
      .children("ul")
      .height()
    );
    ht_max = Math.max(ht_max, ht_arr[i]);
  });

  return ht_max;
}


function mainBizSlide() {
  $mainBiz.not('.slick-initialized').slick({
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,

    responsive: [{
        breakpoint: 9999,
        settings: "unslick"
      },
      {
        breakpoint: 641,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          fade: true,
          arrows: true,
          dots: false
        }
      }
    ]
  });
}


function tabs() {
  $('.tab-list li').click(function (e) {
    var thisIndex = $('.tab-list li').index(this);

    $('div.tab-cnt').removeClass('on');
    $('.tab-list li').removeClass('on');
    $('div.tab-cnt').eq(thisIndex).addClass('on');
    $('.tab-list li').eq(thisIndex).addClass('on');

    return false;
  });
}

function mainCaseTab() {
  $('.main-case-list  li').click(function () {
    var thisIndex = $('.main-case-list li').index(this);

    $('div.main-case-cnt').removeClass('on');
    $('.main-case-list li').removeClass('on');
    $('div.main-case-cnt').eq(thisIndex).addClass('on');
    $('.main-case-list li').eq(thisIndex).addClass('on');

    return false;
  });
}