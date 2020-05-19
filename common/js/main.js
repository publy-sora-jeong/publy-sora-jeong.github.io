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
    0.8, {
      repeat: -1,
      y: 10,
      opacity: 0.2,
      ease: Expo.easeInOut,
      yoyo: true,
    },
    0.1
  );


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


  $(window).on('scroll', function () {
    var scroll = $(this).scrollTop();
    activeBtn(scroll);
  })

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
  var base = -100;
  for (var i = 0; i < section_len; i++) {
    if (scroll >= posArray[i] + base && scroll < posArray[i + 1] + base) {
      $section.removeClass('active')
      $section.eq(i).addClass('active');
    }
  }
}