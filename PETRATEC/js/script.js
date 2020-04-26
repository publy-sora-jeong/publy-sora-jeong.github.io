var active_index, $navi_li, $panel_li, len, class_name, speed;
var arrNewsHeight, maxNewsHeight;
var $headerWrap, $gnb, $gnb_li, $gnb_li_a, $gnb_ul, $gnb_ul_li_a, isDone;
var posArr, section_len, $tag_section;

var isOpen;


var target_index;
var $current;

var $mainBiz;

var $body;




$(document).ready(function () {
  initDom();






  /**/
  //  savePosition();

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
  $('.main-visual-wrap').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    //console.log(nextSlide);

  });

  $('.main-visual-wrap').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    //console.log(nextSlide);

  });



  $('.case-slider-for').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    //fade: true,
    //centerMode: true,
    asNavFor: '.case-slider-nav',
    responsive: [{
      breakpoint: 1400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,

      }
    }]
  });
  $('.case-slider-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    asNavFor: '.case-slider-for',
    dots: false,
    arrows: false,
    //centerMode: true,
    focusOnSelect: true
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

  //SUBPAGE SUB NAV LI WIDTH 
  var liCount = $('.sub-nav ul > li ').length;
  console.log(liCount);
  if (liCount == 2) {
    $('.sub-nav ').addClass('sub-nav--02');
  } else if (liCount == 3) {
    $('.sub-nav ').addClass('sub-nav--03');
  } else if (liCount == 4) {
    $('.sub-nav ').addClass('sub-nav--04');
  } else if (liCount == 5) {
    $('.sub-nav ').addClass('sub-nav--05');
  } else if (liCount == 6) {
    $('.sub-nav ').addClass('sub-nav--06');
  }

  //////////////
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



  /*
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


  	
  */
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

  //$tag_section = $(".section");

  $mainBiz = $('.biz-wrap ');



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
        width: "3000px",
        //height: getSubMaxHeight(),
        height: 300,
        //backgroundColor: "#fff",
        position: "absolute",
        left: "50%",
        top: 77,
        display: "none",
        marginLeft: -1500,
        //borderBottom: "2px solid #ffce39",
        borderTop: "3px solid #07486a"
      })
    );

    $gnb_ul.height(230);
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

function savePosition() {
  posArr = [];
  section_len = $tag_section.length;

  for (var i = 0; i < section_len; i++) {
    posArr.push($tag_section.eq(i).offset().top);
  }

  posArr.push($tag_section.last().offset().top + $tag_section.last().height());
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