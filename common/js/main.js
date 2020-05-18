$(function () {
  initDom();

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

  //WAVIFY
  var wave1 = $("#feel-the-wave").wavify({
    height: 80,
    bones: 4,
    amplitude: 60,
    color: "rgba(255 ,255,255, 0.8)",
    speed: 0.15,
  });

  var wave2 = $("#feel-the-wave-two").wavify({
    height: 60,
    bones: 3,
    amplitude: 40,
    color: "rgba(255 ,255,255,0.7)",
    speed: 0.25,
  });

  //MAIN VISUAL
  var circle = new TimelineMax({
    paused: false,
  });

  var circle2 = new TimelineMax({
    paused: false,
  });

  var typo = new TimelineMax({});

  typo.staggerFrom(
    ".visual-typo ul  li",
    2,
    {
      repeat: -1,
      y: 30,
      opacity: 0,
      ease: Expo.easeInOut,
      yoyo: true,
    },
    0.1
  );
  typo.staggerFrom(".visual-subtext span", 2, {
    repeat: -1,
    rotation: 0,
    ease: Expo.easeInOut,
    scale: 1,
    yoyo: true,
  });

  typo.reverse();
  circle
    .to(".circle1", 5, {
      x: Math.floor(Math.random()) + 150,
      y: Math.floor(Math.random()) - 400,
      rotation: 45,
      repeat: -1,
      opacity: 0,
    })
    .to(".circle2", 4, {
      x: Math.floor(Math.random()) + 50,
      y: Math.floor(Math.random()) - 400,
      rotation: 45,
      repeat: -1,
      opacity: 0,
      delay: 0,
    })
    .to(".circle3", 3, {
      x: Math.floor(Math.random()) + 150,
      y: Math.floor(Math.random()) - 400,
      rotation: 45,
      repeat: -1,
      opacity: 0,
      delay: 0,
    });
  circle2
    .to(".circle4", 5, {
      x: Math.floor(Math.random()) + 80,
      y: Math.floor(Math.random()) - 400,
      rotation: 45,
      repeat: -1,
      opacity: 0,
    })
    .to(".circle5", 5, {
      x: Math.floor(Math.random()) + 20,
      y: Math.floor(Math.random()) - 300,
      rotation: 45,
      repeat: -1,
      opacity: 0,
    })
    .to(".circle6", 4, {
      x: Math.floor(Math.random()) + -70,
      y: Math.floor(Math.random()) - 400,
      rotation: 45,
      repeat: -1,
      opacity: 0,
    })
    .to(".circle7", 5, {
      x: Math.floor(Math.random()) - 40,
      y: Math.floor(Math.random()) - 200,
      rotation: 45,
      repeat: -1,
      opacity: 0,
    });

  circle.play();
  circle2.play();

  typo.play();

  var menu = new TimelineMax({
    paused: true,
  });

  menu.to(".btn-line-1", 0.3, {
    rotation: -45,
    y: 10,
    ease: Expo.easeInOut,
  });
  menu.to(".btn-line-3", 0.3, {
    rotation: 45,
    y: -10,
    ease: Expo.easeInOut,
  });
  menu.to(".btn-line-2", 0.3, {
    width: 0,
  });

  menu.to("#menu", {
    right: 0,
  });

  menu.reverse();

  $(document).on("click", ".menu-btn", function () {
    menu.reversed(!menu.reversed());
  });
  $(document).on("click", ".menu-data a", function () {
    menu.reversed(!menu.reversed());
  });

  var isScrolled = true;
  var scrollIndex = 0;
  var max = 1;

  //$('html, body').on('mousewheel, DOMMouseScroll', function (e) {});
  // $('html, body').on('mousewheel DOMMouseScroll', function (e) {
  //   var E = e.originalEvent;

  //   if (isScrolled) {
  //     isScrolled = false;

  //     if (E.wheelDelta < 0) {
  //       //console.log('DOWN')
  //       $('section').removeClass('active');

  //       if (scrollIndex == max) {
  //         scrollIndex = max;
  //         $('section').eq(scrollIndex).addClass('active');
  //       } else {
  //         scrollIndex++;
  //         $('section').eq(scrollIndex).addClass('active');
  //         console.log(scrollIndex);
  //       }

  //     } else {
  //       //console.log('UP')
  //       $('section').removeClass('active');
  //       if (scrollIndex == 0) {
  //         scrollIndex = 0;

  //       } else {
  //         $('section').eq(scrollIndex).addClass('active')
  //         scrollIndex--;
  //         console.log(scrollIndex);
  //       }

  //     }

  //     setTimeout(() => {
  //       isScrolled = true;
  //     }, 1000);
  //   }
  // });

  $(".about-box-wrap .box").on("click", function () {
    $(".about").addClass("box-animate");
    $(".about-box-wrap").removeClass("on");
    $(".about-box-wrap").addClass("on");
    $(".about-box-wrap .box").removeClass("box-on");
    $(this).addClass("box-on");
  });
  //END
});

function initDom() {}
