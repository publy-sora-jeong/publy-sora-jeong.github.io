var active_index, $navi_li, $panel_li, len, class_name, speed;
var arrNewsHeight, maxNewsHeight;
var $headerWrap, $gnb, $gnb_li, $gnb_li_a, $gnb_ul, $gnb_ul_li_a, isDone;
var posArr, section_len, $tag_section;

var $sitemapBtn;
var $sitemap;
var isOpen;

var timer;

var target_index;
var $current;

var $btnPlay;


$(document).ready(function () {
  initDon();
  savePosition();

  $(window).on("scroll", function () {
    var scroll = $(this).scrollTop();
    activeBtn(scroll);

    var hasClassAbout = $(".main-about").hasClass("on");
    if (hasClassAbout) {
      $(".figure-counter").each(function () {
        $(this)
          .prop("Counter", 0)

          .animate({
            Counter: $(this).data("value")
          }, {
            duration: 1500,
            easing: "swing",
            step: function (now) {
              $(this).text(this.Counter.toFixed(0));
            }
          });
      });
    }
  });

  $(window).on('resize', function () {
    var windowWidth = $(window).width();
    console.log(windowWidth);

    if (windowWidth > 1024) {

      isSitemapOpen = $('.gnb-sitemap').hasClass('on');
      if (isSitemapOpen) {
        sitemapClose();
      }
    }
  })

  $gnb_li.on("mouseenter", function () {
    $(this).addClass("on");
  });

  $gnb_li.on("mouseleave", function () {
    $(this).removeClass("on");
  });

  $gnb.on("mouseenter", openSub);
  $gnb.on("mouseleave", closeSub);
  $gnb.on("focusin", openSub);


  $btnPlay.on('click', function (e) {
    e.preventDefault();
    $(this).addClass('on');

    timer = setInterval(function () {

      $current = $panel_li.filter("." + class_name).index(); //현재슬라이더 

      if (active_index != len - 1) {
        active_index++;
      } else {
        active_index = 0;
      }

      showNext(active_index);
      $navi_li.removeClass('on');
      $navi_li.eq(active_index).addClass('on');

    }, 5000);
  })



  $(".main-news .section-container li").each(function (i) {
    arrNewsHeight.push($(this).height());
    maxNewsHeight = Math.max(maxNewsHeight, arrNewsHeight[i]);
    $(this).height(maxNewsHeight + 50);
  });

  $navi_li.on("click", function (e) {
    e.preventDefault();
    showThis(this);
    clearInterval(timer);
    $('.btn-play').removeClass('on');
  });

  $sitemapBtn.on("click", function (e) {
    e.preventDefault();
    sitemapOpen();
  });

  $('html, body').on('click', '.btn-gnb-close', function () {
    sitemapClose();
  });

  isOpen = false;
  $(".gnb-sitemap > ul > li > a").on("click", function () {
    $(".gnb-sitemap > ul > li > a")
      .removeClass("on")
      .parent()
      .children("ul")
      .slideUp(300);
    isOpen = false;
    console.log(isOpen);

    if (!isOpen) {
      $(this)
        .addClass("on")
        .parent()
        .children("ul")
        .slideDown(500, function () {
          isOpen = true;
          console.log(isOpen);
        });
    } else {
      $(this)
        .removeClass("on")
        .parent()
        .children("ul")
        .slideUp();
      isOpen = false;
      console.log(isOpen);
    }
  });
});

function initDon() {
  //VISUAL
  active_index = 0;
  $panel_li = $(".panel > li");
  $navi_li = $(".panel-navi > li");
  len = $(".panel-navi > li").length;
  class_name = "on";
  speed = 1000;

  //MAIN NEWS
  arrNewsHeight = [];
  maxNewsHeight = 0;

  //GNB
  $headerWrap = $(".header-wrap");
  $gnb = $("#gnb > ul");
  $gnb_li = $gnb.children("li");
  $gnb_li_a = $gnb_li.children("a");
  $gnb_ul = $gnb.find("ul");
  $gnb_ul_li_a = $gnb_ul.find("a");
  isDone = true;

  $tag_section = $(".section");

  countFirst = $(".about-figure strong").eq(0);
  countSecond = $(".about-figure strong").eq(1);
  countThird = $(".about-figure strong").eq(2);

  $sitemapBtn = $(".gnb-all a ");
  $sitemap = $(".gnb-sitemap");

  $btnPlay = $('.btn-play');
}

function activeBtn(scroll) {
  var base = -300;
  for (var i = 0; i < section_len; i++) {
    if (scroll >= posArr[i] + base && scroll < posArr[i + 1] + base) {
      //$navi_li.removeClass('on');
      //$navi_li.eq(i).addClass('on');

      $tag_section.removeClass("on");
      $tag_section.eq(i).addClass("on");
    }
  }
}

function openSub() {
  var isBgGnb = $(".bgGnb").length;
  if (!isBgGnb) {
    $gnb.append(
      $('<div class="bgGnb">').css({
        width: "2000px",
        height: getSubMaxHeight(),
        backgroundColor: "#fff",
        position: "absolute",
        left: "50%",
        top: 100,
        display: "none",
        marginLeft: -1000,
        borderBottom: "2px solid #f88184",
        borderTop: "1px solid #333"
      })
    );

    $gnb_ul.height(getSubMaxHeight);
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


function showThis(evt2) {
  target_index = $(evt2).index();
  $current = $panel_li.filter("." + class_name);

  if (target_index > active_index || target_index < active_index) {
    $current
      .stop()
      .animate({
          opacity: 0
        },
        speed,
        function () {
          $(this).hide().removeClass("on");

        }
      );

    $panel_li
      .eq(target_index)
      .stop().show()
      .animate({
          opacity: 1
        },
        speed,
        function () {
          $(this).addClass("on");
        }
      );

    active_index = target_index;
    activateButton(active_index);
  }

  if (target_index == active_index) {
    return false;
  }
}

function showNext(idx) {
  $panel_li.removeClass('on').stop().animate({
    opacity: 0.1
  });
  $panel_li
    .eq(idx)
    .show()
    .stop().animate({
        opacity: 1
      },
      speed,
      function () {
        $(this).addClass("on");
      }
    );
}


function activateButton() {
  $navi_li.removeClass("on");
  $navi_li.eq(active_index).addClass("on");
}

function savePosition() {
  posArr = [];
  section_len = $tag_section.length;

  for (var i = 0; i < section_len; i++) {
    posArr.push($tag_section.eq(i).offset().top);
  }

  posArr.push(
    $tag_section.last().offset().top + $tag_section.last().height()
  );
}

function sitemapOpen() {
  $sitemap.addClass("on");

  $("html, body").css("overflow", "hidden");

  $("header").append(
    $('<div class="sitemapBg">')
    .css({
      position: "fixed",
      top: 0,
      right: "-100%",
      background: "rgba(34,34,34,0.9)",
      width: "100%",
      height: "100%",
      zIndex: 5000
    })
    .stop()
    .delay(100)
    .animate({
        right: 0
      },
      500,
      function () {
        $sitemap.find("a").css({
          opacity: 1
        });
        $(".btn-gnb-close").addClass('on');
      }
    ).append(
      $('<a href="#" class="btn-gnb-close"><em class="line1"></em><em class="line2"></em>')
    )
  )
}

function sitemapClose() {
  //$(".btn-gnb-close").on("click", function () {
  $sitemap.find("a").css({
    opacity: 0
  });
  $(".sitemapBg")
    .stop()
    .animate({
        right: "-100%"
      },
      1000,
      function () {
        $(this).remove();
        $(".gnb-sitemap").removeClass("on");
        $(".gnb-sitemap-depth2").slideUp(0, function () {
          isOpen = false;
          $(".gnb-sitemap > ul > li > a").removeClass("on");
        });
      }
    );

  $(".btn-gnb-close").find('em').css({
    'transform': 'rotate(0deg)'
  }).stop().fadeOut(500, function () {
    $(this).remove();
  });
  //$sitemap.removeClass("on");
  $("html, body").css("overflow", "auto");
}