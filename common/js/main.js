$(function () {
  // var filter = "win16|win32|win64|mac|macintel";

  // if (navigator.platform) {
  //   if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
  //     //mobile
  //     // $(".wrap").addClass("on");
  //     // $(".wrap2").addClass("on");
  //   } else {
  //     //pc
  //     $("html").mousemove(function (e) {
  //       //마우스 움직일때마다
  //       var x = e.pageX; //넓이값 변수 마우스움직일때마다 x값 계산
  //       var y = e.pageY; //높이값 변수 마우스움직일때마다 y값 계산
  //       $(".mouse").css({
  //         top: y,
  //         left: x,
  //       }); // 변수처리된 x y 값 css상으로 구현

  //       setTimeout(function () {
  //         $(".cursor-t1").css({
  //           top: y,
  //           left: x,
  //         });
  //       }, 150);
  //       setTimeout(function () {
  //         $(".wrap #cursor_t2").css({
  //           top: y,
  //           left: x,
  //         });
  //       }, 250);
  //       setTimeout(function () {
  //         $(".wrap #cursor_t3").css({
  //           top: y,
  //           left: x,
  //         });
  //       }, 350);
  //       setTimeout(function () {
  //         $(".wrap #cursor_t4").css({
  //           top: y,
  //           left: x,
  //         });
  //       }, 400);

  //       $(".grid-item").on("mouseenter", function () {
  //         $(".mouse").addClass("hover");
  //         $(".mouse").removeClass("bounce");
  //         $(this).addClass("hover");
  //       });

  //       $(".grid-item").on("mouseleave", function () {
  //         $(".mouse").removeClass("hover");
  //         $(".mouse").addClass("bounce");
  //         $(this).removeClass("hover");
  //       });
  //     });
  //   }
  // }

  var $grid = $(".grid").isotope({
    itemSelector: ".grid-item",
    getSortData: {
      name: ".name",
      category: "[data-category]",
    },
    // layout mode options
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



  // $('.item-container > a ').on('click', function (e) {
  //   e.preventDefault();
  //   $(this).parent().addClass('click');
  //   window.setTimeout(function () {
  //     $('.item-container ').removeClass('click');
  //   }, 1000);

  // })
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

  // var randomNum = 0;
  // setInterval(() => {
  //   randomNum = Math.floor(Math.random() * 50); //0 ~ 9
  //   console.log(randomNum);
  // }, 300);

  var circle = new TimelineMax({
    paused: false,
  });

  var circle2 = new TimelineMax({
    paused: false,
  });

  var typo = new TimelineMax({});

  typo.staggerFrom(
    ".visual-typo ul  li",
    2, {
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
});