var posArray;
var section_len;
var $section;


$(document).ready(function () {
      initDom();
      savePosition();


      var mainVisualSwiperSlider = new Swiper('.visual .swiper-container', {
            navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
            },
            pagination: {
                  el: '.swiper-pagination',
                  clickable: true
            },
            effect: 'fade',
            autoplay: {
                  delay: 2500,
                  disableOnInteraction: false,
            },
            speed: 2000,
            loop: true,
            observer: true,
            observeParents: true,
      });


      var mainProductSwiperSlider = new Swiper('.product-cnt .swiper-container', {
            navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
            },
            //effect: 'fade',
            autoplay: {
                  delay: 1000,
                  disableOnInteraction: false,
            },
            speed: 1000,
            loop: true,
            observer: true,
            observeParents: true,
      });


      //dot ellipsis
      $(".gnews .news-cnt").each(function () {
            $(this).dotdotdot({
                  ellipsis: "\u2026",
                  wrap: "word",
                  watch: true,
                  tolerance: 0
            });
      });


      $('.product-tab li ').on('click', function (e) {

            e.preventDefault();
            var idx = 0;

            idx = $(this).index();
            console.log(idx);

            $('.product-tab li ').removeClass('on');
            $('.product-tab li ').eq(idx).addClass('on');

            $('.product-cnt').hide()
            $('.product-cnt').eq(idx).show();


      })


      var awardsSwiper = undefined;

      function initAwards() {
            var screenWidth = $(window).width();
            if (screenWidth < 641 && awardsSwiper == undefined) {
                  awardsSwiper = new Swiper('.awards .swiper-container', {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        navigation: {
                              nextEl: '.awards .swiper-button-next',
                              prevEl: '.awards .swiper-button-prev',
                        }

                  });
            } else if (screenWidth > 640 && awardsSwiper != undefined) {
                  awardsSwiper.destroy();
                  awardsSwiper = undefined;
                  jQuery('.awards .swiper-wrapper').removeAttr('style');
                  jQuery('.awards .swiper-slide').removeAttr('style');
            }
      }


      //Swiper plugin initialization
      initAwards();

      //Swiper plugin initialization on window resize
      $(window).on('resize', function () {
            initAwards();
      });



      $(window).on('scroll', function () {
            var scroll = $(this).scrollTop();
            activeBtn(scroll);
      })






});

function initDom() {

      $section = $('.section');
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