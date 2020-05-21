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
                $('#lnb').addClass('over');
                $('.header').addClass('over');
            });

            that.hook.on('mouseleave', function () {
                jQuery(this).find(that.listParent).removeClass(that.options.mouseoverClass);
                that.hook.removeClass(that.options.selectClass);
                $('#lnb').removeClass('over');
                $('.header').removeClass('over');
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