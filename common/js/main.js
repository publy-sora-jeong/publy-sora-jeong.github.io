;
(function () {
  var AccessibleNav = function () {
    this.status = false;
    this.anchor = [];
  };

  AccessibleNav.prototype = {
    initialize: function () {
      var that = this;
      that.hook = jQuery(that.options.hook);
      that.listParent = that.options.listParent;
      that._map();

      that.anchor.on('focus', function () {
        that._focus.apply(that, [this, 'focus']);
      }).on('focusout', function () {
        that.status = false;
        setTimeout(function () {
          if (that.status === false) {
            that._blur();
          }
        }, 12);
      }).on('focusin', function () {
        that.status = true;
      }).on('mouseenter', function () {
        that._focus.apply(that, [this, 'mouseover']);
      });

      that.hook.on('mouseleave', function () {
        jQuery(this).find(that.listParent).removeClass(that.options.mouseoverClass);
        that.hook.removeClass(that.options.selectClass);
      });
    },
    _map: function () {
      var that = this;

      that.hook.find('a').each(function () {
        that.anchor = jQuery.merge(jQuery(this), that.anchor);
      });
    },
    _focus: function (el, type) {
      var that = this,
        _class = type === 'focus' ? that.options.focusClass : that.options.mouseoverClass;

      jQuery(el).closest(that.hook).addClass(that.options.selectClass);

      jQuery(el).closest(that.listParent).addClass(_class)
        .siblings().removeClass(_class);
    },
    _blur: function () {
      var that = this;

      that.hook.removeClass(that.options.selectClass)
        .find(that.listParent).removeClass(that.options.focusClass);
    }
  };

  var gnb = new AccessibleNav();

  return {
    load: function () {
      var that = this;
      jQuery(window).on('load', function () {
        gnb.options = {
          hook: '.nav-menu',
          listParent: 'li.nav-item',
          selectClass: 'selected',
          focusClass: 'focus',
          mouseoverClass: 'over'
        };

        gnb.initialize();
      });
    }
  };
})().load();




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