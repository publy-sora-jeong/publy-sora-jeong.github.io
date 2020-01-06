//vars
var slideIdx;
var slideItem;
var slideIndicator;
var interv;
var slideLen;
var speed;


$(document).ready(function () {

  init();
  //MAIN ABOUT LOREM SLIDER



  interv = setInterval(() => {
    aboutSlider();
  }, speed);

  //aboutSlider();
  aboutSliderPager();



});

function init() {
  slideIdx = 0;
  slideItem = $('.about .slide-item');
  slideIndicator = $('.about .slide-pager > a ');
  slideLen = slideItem.length - 1;
  speed = 5000;
}
//MAIN ABOUT LOREM SLIDER
function aboutSlider(idx) {

  slideIdx++;
  if (slideIdx <= slideLen) {
    slideItem.removeClass('active');
    slideItem.eq(slideIdx).addClass('active');
    slideIndicator.removeClass('active');
    slideIndicator.eq(slideIdx).addClass('active');
  } else {
    slideIdx = 0;
    slideItem.removeClass('active');
    slideIndicator.removeClass('active');
    slideItem.eq(slideIdx).addClass('active');
    slideIndicator.eq(slideIdx).addClass('active ');
  }
}

function aboutSliderPager() {
  slideIndicator.on('click', function (evt, idx) {
    evt.preventDefault();
    idx = $(this).index();
    aboutSlider(idx);
  });

}