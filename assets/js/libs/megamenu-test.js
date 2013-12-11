// Item Name : Responsive Mega Menu Complete Set
// Item URI : http://codecanyon.net/item/mega-menu-complete-set/152825
// Author URI : http://codecanyon.net/user/Pixelworkshop/
// Version : 3.3
// Stable version as of: November 27 2013
(function (e) {
    function r() {
        var n = e(this),
            r = e(".dropdown_container, .dropdown_fullwidth", n),
            i = n.children(".dropdown_flyout_level");
        r = e(r).add(i);
        switch (t.menu_effect) {
        case "hover_fade":
            e(r).fadeIn(t.menu_speed_show);
            break;
        case "hover_slide":
            e(r).slideDown(t.menu_speed_show);
            break;
        case "hover_toggle":
            e(r).show(t.menu_speed_show);
            break;
        case "click_fade":
            n.click(function () {
                e(r).fadeIn(t.menu_speed_show)
            });
            break;
        case "click_slide":
            n.click(function () {
                e(r).slideDown(t.menu_speed_show)
            });
            break;
        case "click_toggle":
            n.click(function () {
                e(r).show(t.menu_speed_show)
            })
        }
    }

    function i() {
        var n = e(this),
            r = e(".dropdown_container, .dropdown_fullwidth, .dropdown_flyout_level", n);
        switch (t.menu_effect) {
        case "hover_fade":
        case "click_fade":
            e(r).fadeOut(t.menu_speed_hide);
            break;
        case "hover_slide":
        case "click_slide":
            e(r).slideUp(t.menu_speed_hide);
            break;
        case "hover_toggle":
        case "click_toggle":
            e(r).toggle(t.menu_speed_hide)
        }
    }

    function s() {
        var n = e("body").innerWidth();
        if (n < 960 && t.menu_responsive === 1) e(".megamenu").children("li").hide(0), e(".dropdown_container, .dropdown_fullwidth").css({
            left: "0",
            top: "auto",
            width: n
        }).hide(), e(".dropdown_first").css({
            left: "0"
        }).hide(), e(".dropdown_flyout_level, .dropdown_flyout_level_left").css({
            left: "0",
            top: "0"
        }).hide(), e(".megamenu_button").show(0);
        else {
            e(".dropdown_container").css({
                left: "auto",
                top: "auto"
            }).hide(), e(".dropdown_fullwidth").css({
                left: "-1px",
                top: "auto"
            }).hide();
            var r = document.getElementById("global-nav"),
                i;
            i = r.getBoundingClientRect().left;
            var s = "-" + i + "px";
            e(".dropdown_fullwidth").css({
                position: "absolute",
                left: "0",
                right: "0",
                width: n,
                top: "36px",
                "margin-left": s
            }), e(".dropdown_flyout_level").css({
                left: "95%",
                top: "-21px"
            }).hide(), e(".dropdown_flyout_level_left").css({
                left: "-108%",
                right: "100%"
            }).hide(), e(".megamenu").children("li").show(0), e(".megamenu_button").hide(0)
        }
        e(".megamenu_container_vertical").find(".dropdown_container, .dropdown_fullwidth").css({
            top: "0"
        })
    }
    var t = {
        menu_effect: "click_fade",
        menu_click_outside: 0,
        menu_show_onload: 0,
        menu_responsive: 1,
        hoverIntentConfig: {
            sensitivity: 2,
            interval: 100,
            over: r,
            timeout: 200,
            out: i
        }
    }, n = {
            init: function (n) {
                return t = e.extend(1, t, n), this.each(function () {
                    var n = e(this),
                        r = e(n).children("li"),
                        i = e(r).children(".megamenu_drop"),
                        o = e(r).find(".dropdown_container, .dropdown_fullwidth"),
                        u = e(r).find(".dropdown_parent"),
                        a = e(u).children("a"),
                        f = e(u).find(".dropdown_flyout_level"),
                        l = e(".megamenu_button");
                    menuItemElement = e(r).add(u), menuDropDownElement = e(o).add(f);
                    if ("ontouchstart" in document.documentElement && t.menu_responsive === 1) {
                        e(window).width() < 960 ? (e(o).css({
                            top: "auto"
                        }).hide(), e(f).css({
                            left: "0",
                            top: "0"
                        }).hide(), e(r).hide(0), e(l).show(0)) : s(), e(l).children("a").hammer().on("tap", function (t) {
                            e(r).not(":eq(0)").toggle(0)
                        }), e(menuItemElement).toggleClass("noactive"), e(i).hammer().on("tap", function (t) {
                            t.preventDefault();
                            var n = e(this),
                                i = n.closest(r);
                            return i.toggleClass("active noactive").find(o).toggle(0), n.parent(r).siblings().addClass("noactive").removeClass("active").find(o).hide(0), !1
                        }), e(a).hammer().on("tap", function () {
                            var t = e(this);
                            return t.parent(u).toggleClass("active noactive").find(f).first().toggle(0), t.parent(u).siblings().addClass("noactive").removeClass("active").find(f).hide(0), t.parent(u).siblings().find(u).addClass("noactive").removeClass("active"), !1
                        }), e(document).hammer().on("tap", function () {
                            e(menuItemElement).addClass("noactive"), e(menuDropDownElement).hide(0)
                        }), e(n).hammer().on("tap", function (e) {
                            e.stopPropagation()
                        }), e(window).bind("orientationchange", function () {
                            e(menuItemElement).addClass("noactive"), e(menuDropDownElement).hide(0)
                        });
                        return
                    }
                    s(), e(window).resize(function () {
                        s()
                    }), e(l).children("a").click(function () {
                        e(l).toggleClass("megamenu_button_active"), e(r).not(":eq(0)").toggle(0)
                    }), t.menu_click_outside === 1 && (e(document).click(function () {
                        e(menuItemElement).removeClass("active"), e(menuDropDownElement).hide(0)
                    }), e(n).click(function (e) {
                        e.stopPropagation()
                    }));
                    switch (t.menu_effect) {
                    case "open_close_fade":
                        var c = "fadeToggle",
                            h = "fadeOut";
                        break;
                    case "open_close_slide":
                        var c = "slideDown",
                            h = "fadeOut";
                        break;
                    case "open_close_toggle":
                        var c = "toggle",
                            h = "fadeOut"
                    }
                    switch (t.menu_effect) {
                    case "hover_fade":
                    case "hover_slide":
                    case "hover_toggle":
                    case "click_fade":
                    case "click_slide":
                    case "click_toggle":
                        e(r).hoverIntent(t.hoverIntentConfig), e(u).hoverIntent(t.hoverIntentConfig);
                        break;
                    case "open_close_fade":
                    case "open_close_slide":
                    case "open_close_toggle":
                        e(".megamenu > li:nth-child(" + t.menu_show_onload + ")").find(o).show().closest(r).toggleClass("active"), e(r).unbind("mouseenter mouseleave").bind("click", function (t) {
                            var n = e(this),
                                r = n.find(o),
                                i = t.target.nodeName;
                            e(t.target).hasClass("megamenu_drop") && (n.siblings().hasClass("active") ? (n.siblings().removeClass("active"), n.siblings().find(o).hide(), n.toggleClass("active"), r.show()) : (n.siblings().removeClass("active"), n.toggleClass("active"), n.hasClass("active") ? r.slideDown() : r.slideUp()))
                        }), e(u).unbind("mouseenter mouseleave").click(function () {
                            var n = e(this);
                            n.siblings().removeClass("active").find(f)[h](t.menu_speed_hide), n.siblings().find("li").removeClass("active"), n.toggleClass("active").find(f).first().delay(t.menu_speed_delay)[c](t.menu_speed_show).click(function (e) {
                                e.stopPropagation()
                            })
                        })
                    }
                })
            },
            update: function (n) {
                t = e.extend(1, t, n)
            }
        };
    e.fn.megaMenuCompleteSet = function (t) {
        if (n[t]) return n[t].apply(this, Array.prototype.slice.call(arguments, 1));
        if (typeof t == "object" || !t) return n.init.apply(this, arguments);
        e.error("No found method " + t)
    }
})(jQuery);