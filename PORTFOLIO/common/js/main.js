var posArray;
var section_len;
var $section;

$(function () {
  initDom();
  savePosition();

  // $(window).on("beforeunload", function () {
  //   $(window).scrollTop(0);
  // });

  //ISOTOPE
  var $grid = $(".grid").isotope({
    itemSelector: ".grid-item",
    getSortData: {
      name: ".name",
      category: "[data-category]",
    },
    masonry: {
      columnWidth: 0,
    },
  });

  $(".filter-button-group").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({
      filter: filterValue,
    });
  });

  // change is-checked class on buttons
  $('.button-group').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });


  // x: Math.floor(Math.random()) + 150,
  // y: Math.floor(Math.random()) - 400,

  $(".menu-btn").on("click", function () {
    if ($(this).hasClass("open")) {
      $("#menu")
        .stop()
        .animate({
            left: "-100%",
          },
          500,
          "easeInBack",
          function () {
            $(".menu-btn").removeClass("open");
          }
        );
    } else {
      $("#menu")
        .stop()
        .animate({
            left: "-50%",
          },
          500,
          "easeOutBack",
          function () {
            $(".menu-btn").addClass("open");
          }
        );
    }
  });

  $("#menu  ul > li > a").on("click", function (e) {
    e.preventDefault();
    var li_eq = $(this).parent().index();
    var scrollTogo = $section.eq(li_eq).offset().top;
    //console.log($(this).parent().index());
    //console.log($section.eq(li_eq).offset().top);
    if ($(".menu-btn").hasClass("open")) {
      $(this).removeClass("open");
      $("#menu")
        .stop()
        .animate({
            left: "-100%",
          },
          500,
          "easeInBack",
          function () {
            $(".menu-btn").removeClass("open");
            $("html, body").stop().delay(200).animate({
                scrollTop: scrollTogo,
              },
              1000
            );
          }
        );
    }
  });

  $('.btn-close-layer').on('click', function (e) {
    e.preventDefault();

    $('.pf-layer').fadeOut(500, function () {
      $('html, body').css('overflow', 'auto')
    });
  });



  $('.grid-item').on('click', function (e) {
    e.preventDefault();
    var gridID = "'." + $(this).attr('id') + "'"
    console.log(gridID);
    $(gridId).fadeIn(400);

    // $('.pf-layer').attr('id', gridID).fadeIn(500, function () {
    //   $('html, body').css('overflow', 'hidden')
    // });
  });


  $(".desktop").mCustomScrollbar({
    theme: "dark-thick",
    scrollbarPosition: "inside",
    autoExpandScrollbar: "ture",
  });


  $(window).on("scroll", function () {
    var scroll = $(this).scrollTop();
    activeBtn(scroll);
  });

  $("#navigation > ul > li").on("mouseenter", function () {
    $(this).addClass("on");
  });



  //COLOR CODE
  var colorCodeArr = [];
  var colorLen = $('.info-color li').length;


  for (var j = 0; j < colorLen; j++) {
    colorCodeArr.push('#' + $('.info-color li').eq(j).attr('class'));
    $('.info-color li').eq(j).find('.palette').css({
      'background': colorCodeArr[j]
    });
    $('.info-color li').eq(j).find('.color-code').css({
      'color': colorCodeArr[j]
    }).text(colorCodeArr[j]);

  }
  console.log(colorCodeArr)
  var swiper = new Swiper(".works-slide", {
    effect: "coverflow",
    slidesPerView: "auto",
    speed: 600,
    loop: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    centeredSlides: true,
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


  var swiper = new Swiper(".pc-container", {
    slidesPerView: "auto",
    centeredSlides: true,

    speed: 600,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });
});

function initDom() {
  $section = $("section");
}

function savePosition() {
  posArray = [];
  section_len = $section.length;
  for (var i = 0; i < section_len; i++) {
    posArray.push($section.eq(i).offset().top);
  }
  posArray.push($section.last().offset().top + $section.last().height());
  console.log(posArray);
}

function activeBtn(scroll) {
  var base = -300;
  for (var i = 0; i < section_len; i++) {
    if (scroll >= posArray[i] + base && scroll < posArray[i + 1] + base) {
      $section.removeClass("active");
      $section.eq(i).addClass("active");

      $("#navigation li").removeClass("active");
      $("#navigation li").eq(i).addClass("active");
    }
  }
}