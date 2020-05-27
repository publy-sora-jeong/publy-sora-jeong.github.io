var posArray;
var section_len;
var $section;

$(function () {
  initDom();
  savePosition();

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




  // x: Math.floor(Math.random()) + 150,
  // y: Math.floor(Math.random()) - 400,


  $('.menu-btn').on('click', function () {
    $('#menu').stop().animate({
      right: '-50%'
    });
  });

  $(window).on('scroll', function () {
    var scroll = $(this).scrollTop();
    activeBtn(scroll);
  });

  $('#navigation > ul > li').on('mouseenter', function () {
    $(this).addClass('on');
  });


  var swiper = new Swiper('.works-slide', {
    slidesPerView: 'auto',
    speed: 600,
    loop: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });


});

function initDom() {
  $section = $('section');
}

function savePosition() {
  posArray = [];
  section_len = $section.length;
  for (var i = 0; i < section_len; i++) {
    posArray.push($section.eq(i).offset().top);
  }
  posArray.push($section.last().offset().top + $section.last().height())
  console.log(posArray);
}

function activeBtn(scroll) {
  var base = -300;
  for (var i = 0; i < section_len; i++) {
    if (scroll >= posArray[i] + base && scroll < posArray[i + 1] + base) {
      $section.removeClass('active')
      $section.eq(i).addClass('active');

      $('#navigation li').removeClass('active');
      $('#navigation li').eq(i).addClass('active');
    }
  }
}