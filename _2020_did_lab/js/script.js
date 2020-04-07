$(document).ready(function () {


  //////////////////////////SLIDER  ---
  ///////SLIDER FOR COMMON USE 
  $('.banner-container ul').slick({
    arrows: true,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: $('.btn-ban-prev'),
    nextArrow: $('.btn-ban-next'),
  });

  $('.btn-ban-pause').click(function (e) {
    e.preventDefault();
    $('.footer-banner ul').slick('slickPause');
  });

  ///////SLIDER FOR MAIN PAGE

  $('.btn-go-top').on('click', function () {
    $('html, body').stop().animate({
      scrollTop: 0
    }, 500);
  });


  ///////- MAIN 02 GALLERY 
  $('.main-gallery-slider').slick({
    infinite: true,
    dots: false,
    arrows: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  });

  ///////- MAIN 03 STUDY ARCHIVE 
  $('.study-slider').slick({
    infinite: true,
    dots: true,
    arrows: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 2,
    appendDots: $('.dots-container2'),
    prevArrow: $('.prev-slide2'),
    nextArrow: $('.next-slide2'),
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  ///////- MAIN 04 PROJECT
  $('.project-slider').slick({
    infinite: true,
    dots: true,
    arrows: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    //fade: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    appendDots: $('.dots-container3'),
    prevArrow: $('.prev-slide3'),
    nextArrow: $('.next-slide3'),
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  ///////- MAIN 05 NEWS/
  newsSlider1();

  $('.news-nav li').on('click', function (e) {
    e.preventDefault();
    //$('.news-list, .news-list2').hide();
    var idx = $(this).index();
    console.log(idx);
    $('.news-nav li').removeClass('on');
    $(this).addClass('on');

    if (idx == 0) {
      $('.news-list2').slick('unslick');
      $('.news-list2').removeClass('on');
      $('.news-list').addClass('on');
      newsSlider1();

    } else {
      $('.news-list').slick('unslick');
      $('.news-list').removeClass('on');
      $('.news-list2').addClass('on');
      newsSlider2();
    }
  })

  ///////SLIDER FOR SUB PAGE
  ///////- SUB 01 FACILITY -SYNC SLIDER (THUMBNAIL TO LARGE IMAGE)
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    focusOnSelect: true
  });

  //////////////////////////---END SLIDER

  //////////////////////////COMMON USE SCRIPT ---

  var $subNav = $('.section-sub .sub-nav');
  var subNavLiCount = $('.section-sub .sub-nav li').length;
  console.log(subNavLiCount);

  $subNav.removeClass('sub-nav-type02 sub-nav--type03 sub-nav--type04 sub-nav--type05 sub-nav--type06');
  if (subNavLiCount == 2) {
    $subNav.addClass('sub-nav-type02');
  } else if (subNavLiCount == 3) {
    $subNav.addClass('sub-nav--type03');
  } else if (subNavLiCount == 4) {
    $subNav.addClass('sub-nav--type04');
  } else if (subNavLiCount == 5) {
    $subNav.addClass('sub-nav--type05');
  } else if (subNavLiCount == 6) {
    $subNav.addClass('sub-nav--type06');
  }


  ///////HEADER SITEMAP
  if ($(window).width() > 768) {
    $('.header-top--left li a').on('mouseenter', function () {
      $('.header-sitemap').fadeIn(400);
      $(this).addClass('sitemap-opened');
    })

    $('.header-sitemap').on('mouseleave', function () {
      $('.header-sitemap').fadeOut();
    })
  }

  $(window).on('resize', function () {

    if ($(window).width() > 768) {
      $('.header-top--left li a').on('mouseenter', function () {
        $('.header-sitemap').fadeIn(400);
        $(this).addClass('sitemap-opened');
      })

      $('.header-sitemap').on('mouseleave', function () {
        $('.header-sitemap').fadeOut();
      })
    }


  })

  $('.btn-fix-nav').on('click', function () {
    $(this).toggleClass('on');
    $('.fixed-nav').toggleClass('on');
  });

  var scrollTop = $(window).scrollTop();
  if (scrollTop >= 45) {
    $('.header-top').addClass('fixed');
  }

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


  $(window).on('scroll', function () {
    $('.header-sitemap').hide();

    var scrollTop = $(this).scrollTop();

    if (scrollTop > 0) {
      $('.header-top').addClass('fixed');
    } else {
      $('.header-top').removeClass('fixed');
    }
  })


  ///////ELLIPSIS 
  $(".dot").each(function () {
    $(this).dotdotdot({
      ellipsis: "\u2026",
      wrap: "letter",
      height: null,
      watch: true,
      tolerance: 0
    });
  });


  //////////////////////////---COMMON USE SCRIPT END 


  //////////////////////////SUB SCRIPT ---

  ////// INPUT PLACEHOLDER ANIMATION
  $(".t-input").focus(function () {
    $(this)
      .parents(".place-ani")
      .addClass("focused");
    $(this)
      .parents(".tool-input")
      .addClass("focused");
  });

  $(".t-input").blur(function () {
    var inputValue = $(this).val();
    if (inputValue == "") {
      $(this).removeClass("filled");
      $(this)
        .parents(".place-ani")
        .removeClass("focused");
      $(this)
        .parents(".tool-input")
        .removeClass("focused");
    } else {
      $(this).addClass("filled");
    }
  });


  ////// FAQ TOGGLE 
  $('.faq dl dt').on('click', function () {
    if ($(this).hasClass('on')) {
      $(this).removeClass('on');
      $(this).next().removeClass('on');
    } else {
      $(this).addClass('on');
      $(this).next().addClass('on');
    }
  })

  $(".customfileinput").customFileinput({
    buttontext: "파일첨부",
    customboxwidth: 234
  });

  //////////////////////////---SUB SCRIPT END


});


function tabs() {
  var oldIndex = 0;

  $('.tab-top li').click(function () {
    var thisIndex = $('.tab-top li').index(this);

    $('div.tab-cont').removeClass('selected');
    $('.tab-top li').removeClass('selected');

    $('div.tab-cont').eq(thisIndex).addClass('selected');
    $('.tab-top li').eq(thisIndex).addClass('selected');

    return false;
  });

};

function newsSlider1() {
  $('.news-list').not('.slick-initialized').slick({
    infinite: true,
    dots: false,
    arrows: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: $('.news-prev'),
    nextArrow: $('.news-next'),
    responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // centerMode: true
        }
      }
    ]
  });
}

function newsSlider2() {
  $('.news-list2').not('.slick-initialized').slick({
    infinite: true,
    dots: false,
    arrows: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: $('.news-prev'),
    nextArrow: $('.news-next'),
    responsive: [{
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // centerMode: true
        }
      }
    ]
  });
}