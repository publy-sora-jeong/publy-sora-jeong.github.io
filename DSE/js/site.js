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


$(document).ready(function () {



	// main _ tab menu 
	mainBbs();
	// skip to content 
	skipContents();

	$('.main-visual').slick({
		infinite: true,
		dots: false,
		speed: 1000,
		autoplay: false,
		autoplaySpeed: 5000,
		fade: true,
		cssEase: 'linear',
		arrows: false
	})

	$('.sub-visual').slick({
		infinite: true,
		dots: false,
		speed: 1000,
		autoplay: false,
		autoplaySpeed: 5000,
		fade: true,
		cssEase: 'linear',
		arrows: false
	})

	$('.main-banner').not('.slick-initialized').slick({
		infinite: true,
		dots: false,
		speed: 400,
		autoplay: false,
		autoplaySpeed: 3000,
		//fade: true,
		cssEase: 'linear',
		arrows: false,

		responsive: [{
				breakpoint: 9999,
				settings: "unslick"
			},
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					centerMode: false,
					fade: false,
					arrows: true,
					dots: false
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					centerMode: false,
					fade: false,
					arrows: true,
					dots: false
				}
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					centerMode: false,
					fade: false,
					arrows: true,
					dots: false
				}
			}
		]
	});


	$('.sub-depth').on('click', function () {
		$(this).find('ul').slideDown(200);
		$(this).addClass('on');
	});
	$('.sub-depth').on('mouseleave', function () {
		$(this).find('ul').slideUp(200);
		$(this).removeClass('on');
	})



	//ellipsis 
	$(".dot").each(function () {
		$(this).dotdotdot({
			ellipsis: "\u2026",
			wrap: "word",
			watch: true,
			tolerance: 0
		});
	});

	//mobile icon - 
	$(".m-nav").removeClass("on");
	$(".m-nav-ico").toggle(
		function () {
			$(this).addClass("on");
			$(".m-nav-bg").addClass("on");
			$(".m-nav")
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
			$(".m-nav-bg").removeClass("on");
			$(".m-nav")
				.stop()
				.delay(100)
				.animate({
						right: -270
					},
					300
				)
				.removeClass("on");
		}
	);

	//mobile Nav > Slide up & down
	$(".m-nav > ul > li  > a ").on("click", function (e) {
		e.preventDefault();
		if ($(".m-nav").hasClass("on")) {
			$(".m-nav > ul li").removeClass("selected");
			$(".m-nav .m-sub-nav")
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


});


//SKIP TO CONTENT
function skipContents() {
	$('.skiptoContent').focusin(function () {
		$(this).animate({
			top: 0,
			height: 30,
			opacity: 1
		}, 0);
	});
	$('.skiptoContent').focusout(function () {
		$(this).animate({
			top: -30,
			height: 0,
			opacity: 0
		}, 150);
	});
}
//Notice
function mainBbs() {
	var oldIndex = 0;
	$('.tab_top li').on('click', function () {
		var thisIndex = $('.tab_top li').index(this);
		$('div.tab_cont').removeClass('selected');
		$('.tab_top li').removeClass('selected');
		$('div.tab_cont').eq(thisIndex).addClass('selected');
		$('.tab_top li').eq(thisIndex).addClass('selected');
		return false;
	});
};

function tabs() {
	$('.tab-list li').click(function (e) {
		var thisIndex = $('.tab-list li').index(this);

		$('div.tab-cnt').removeClass('on');
		$('.tab-list li').removeClass('on');
		$('div.tab-cnt').eq(thisIndex).addClass('on');
		$('.tab-list li').eq(thisIndex).addClass('on');

		return false;
	});
}