
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
	//MAIN VISUAL -- 
	var $mainVis_txt = $('.mainVis_txt'),
		$mainVis_h2 = $('.mainVis_txt h2'),
		$mainVis_p = $('.mainVis_txt p'),
		$mainVis_controls = $('.vis_control');

	var mainVisual = $('.visual ul').bxSlider({
		auto: true,
		mode: 'fade',
		autoControls: false,
		controls: false,
		pause: 7000,
		speed: 1000,
		pager: false,
		onSliderLoad: function () {
			init_mainVis();
			motion_mainVis();
		},
		onSlideBefore: function () {
			init_mainVis();
		},
		onSlideAfter: function () {
			motion_mainVis();
		}
	});

	function init_mainVis() {
		if ($(window).width() > 1200) {
			$mainVis_txt.css({
				left: '-47%',
				opacity: 0
			});
		} else {
			$mainVis_txt.css({
				left: '-75%',
				opacity: 0
			});
		}
	}

	function init_mainVis() {
		if ($(window).width() > 1100) {
			$mainVis_txt.css({
				left: '-47%',
				opacity: 0
			});
		} else {
			$mainVis_txt.css({
				left: '-75%',
				opacity: 0
			});
		}
		$mainVis_h2.css({
			opacity: 0
		});
		$mainVis_p.css({
			opacity: 0
		});
		$mainVis_controls.css({
			opacity: 0
		});
	}

	function motion_mainVis() {
		$mainVis_txt.animate({
			left: 0,
			opacity: 1
		}, 2000, 'easeOutCirc');
		$mainVis_h2.stop().delay(1500).animate({
			opacity: 1
		}, 2000);
		$mainVis_p.stop().delay(2000).animate({
			opacity: 1
		}, 2000);
		$mainVis_controls.stop().delay(3000).animate({
			opacity: 1
		}, 1000);
	}

	$('#main_bx-prev').click(function () {
		mainVisual.goToPrevSlide();
		mainVisual.stopAuto();
		mainVisual.startAuto();
	});

	$('#main_bx-next').click(function () {
		mainVisual.goToNextSlide();
		mainVisual.stopAuto();
		mainVisual.startAuto();
	});

	$('.main_banner ul').bxSlider({
		mode: 'horizontal',
		auto: true,
		autoControls: false,
		controls: true,
		speed: 1000,
		pager: false,
		minSlides: 1,
		maxSlides: 6,
		shrinkItems: true
	});

	//-- MAIN VISUAL ENDS

	// main _ tab menu 
	mainBbs();
	// skip to content 
	skipContents();


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
