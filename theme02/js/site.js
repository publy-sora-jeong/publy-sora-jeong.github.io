//vars 

$(document).ready(function () {
  // initDon();
  // savePosition();
  var isScrolled = true;
  var scroll_index = 0;
  var max = 2;


  $('html, body').on("mousewheel DOMMouseScroll", function (e) {
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();

    if (screenWidth > 1024 && screenHeight > 768) {
      if (isScrolled) {
        isScrolled = false;
        var E = e.originalEvent;
        if (E.wheelDelta < 0) {
          scroll_index == max ? scroll_index = max : scroll_index++;

          console.log('Scroll Down');
          $('section').removeClass('active');
          $('section').eq(scroll_index).addClass('active');
        } else {
          scroll_index == 0 ? scroll_index = 0 : scroll_index--;
          console.log('Scroll Up');
          $('section').removeClass('active');
          $('section').eq(scroll_index).addClass('active');
        };
        setTimeout(function () {
          isScrolled = true;
          console.log('scroll animation finished');
        }, 100);

      }
    }
  })


  function slideM(t) {
    $('#container > section').removeClass('on').eq(idx).addClass('off');

    setTimeout(function () {
      $('#container > section').removeClass('off');
    }, 1000);

    idx = t;
    scroll_index = idx;

    $('#container > section').eq(idx).removeClass('off').addClass('on');
    slideIdx();
  };



});



function resize() {
  var winH = $(window).outerHeight();
  var winW = $(window).outerWidth();
  $('#container').css('height', winH);
  if (winW <= 768) {
    $('.sec01').css('height', winH - $('.topbanner').outerHeight());
  } else {
    $('.sec01').css('height', 'auto');
  }
}




//랜덤값 추출
function randomNumber(min, max, point) {
  return ((Math.random() * (max - min)) + min).toFixed(point);
};

//완료 인터렉션
function complateEffect(wrap, length) {
  if (length > 20) length = 20;
  var $wrap = $(wrap),
    $itemLength = length,
    rdClass, rdClass2, rdLeft, rdTop, rdDelay, rdDirection, rdSpeed,
    rdLeftAry = [];
  for (var i = 0; i < $itemLength; i++) {
    rdClass = randomNumber(1, 3, 0);
    //rdColor = randomNumber(1,3,0);
    rdColor = (i % 3) + 1;
    rdLeft = randomNumber(0, 20, 0) * 5;
    rdTop = randomNumber(4, 18, 0) * 5;
    rdDelay = randomNumber(0, 30, 0) * 100;
    rdDirection = randomNumber(1, 6, 0);
    rdSpeed = randomNumber(30, 70, 0) * 100;

    if (rdLeftAry.indexOf(rdLeft) >= 0) { //left 랜덤값 겹치지않게
      i--;
    } else {
      rdLeftAry.push(rdLeft);
      if ($wrap.hasClass('type2')) {
        //코인
        rdSpeed = randomNumber(30, 70, 0) * 50;
        $wrap.prepend('<span class="item size' + rdClass + '" style="left:' + rdLeft + '%;animation:confettiDrop ' + rdSpeed + 'ms infinite ease-out ' + rdDelay + 'ms;"></span>');
      } else if ($wrap.hasClass('type3')) {
        //깜빡임
        rdSpeed = randomNumber(30, 70, 0) * 50;
        $wrap.prepend('<span class="item item' + rdClass + ' color' + rdColor + '" style="left:' + rdLeft + '%;top:' + rdTop + '%;animation:confettiFlash ' + rdSpeed + 'ms infinite"></span>');
      } else {
        //꽃가루
        $wrap.prepend('<span class="item color' + rdColor + '" style="left:' + rdLeft + '%;animation:confettiSwing' + rdDirection + ' ' + (rdSpeed / 2) + 'ms infinite ' + rdDelay + 'ms, confettiDrop ' + rdSpeed + 'ms infinite ease-out ' + rdDelay + 'ms;"></span>');
      }
    }
  }
};




/* id background-fixed solution */
function ie_backgroundFixed() {
  if (navigator.userAgent.match(/Trident\/7\./)) {
    $('html,body').on('mousewheel', function () {
      event.preventDefault();

      var wheelDelta = event.wheelDelta;
      var currentScrollPosition = window.pageYOffset;
      window.scrollTo(0, currentScrollPosition - wheelDelta);
    });

    $('html, body').keydown(function (e) {
      var wheelDelta = event.wheelDelta;
      var currentScrollPosition = window.pageYOffset;

      switch (e.which) {
        case 38: //up
          e.preventDefault();
          window.scrollTo(0, currentScrollPosition - 120);
          break;

        case 40: //down
          e.preventDefault();
          window.scrollTo(0, currentScrollPosition + 120);
          break;
      }
    });
  };
}