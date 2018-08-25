(function($) {
    var allLocation = '';
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 100) {
            $('div#header').addClass('tickTop');
        } else {
            $('div#header').removeAttr('class');
        }
        if ($('#up_scroll').length) {
            if ($(window).scrollTop() > 100) {
                $('#up_scroll').css({
                    'top': '85%'
                });
            } else {
                $('#up_scroll').css({
                    'top': '100%'
                });
            }
        }
    });
    $(document).ready(function() {
        $("link[href*='components/com_rsform/assets/css/front.css']").remove();
        Maps_distributor();
        if ($('#up_scroll').length) {
            $('#up_scroll').click(function() {
                $('html,body').animate({
                    scrollTop: 0
                }, 'slow');
            });
        }
        Menu_plus_mobile();
        if ($('#mob-only').length) {
            var flag = 0;
            $('#mob-only').click(function() {
                if (flag == 0) {
                    $('#menu-navigation ul.nav').slideDown(function() {
                        flag = 1;
                    });
                } else {
                    $('#menu-navigation ul.nav').slideUp(function() {
                        flag = 0;
                    });
                }
            });
        }
        if (typeof WOW === "function") {
            var wow = new WOW({
                animateClass: 'animated',
                offset: 100,
                mobile: false
            });
            wow.init();
        }
        if ($('.section-brands .list_brands').length) {
            $('.section-brands .list_brands').owlCarousel({
                autoplay: true,
                loop: true,
                center: true,
                autoplayTimeout: 3000,
                margin: 80,
                nav: true,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                responsive: {
                    0: {
                        items: 1
                    },
                    560: {
                        items: 1
                    },
                    720: {
                        items: 2
                    },
                    980: {
                        items: 5
                    }
                }
            });
        }
        if ($('.section-distributors .list_brands').length) {
            $('.section-distributors .list_brands').owlCarousel({
                autoplay: true,
                loop: true,
                center: true,
                autoplayTimeout: 3000,
                margin: 80,
                nav: true,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                responsive: {
                    0: {
                        items: 1
                    },
                    560: {
                        items: 1
                    },
                    720: {
                        items: 2
                    },
                    980: {
                        items: 5
                    }
                }
            });
        }
        if ($('.section-client-says .list_clients').length) {
            $('.section-client-says .list_clients').owlCarousel({
                autoplay: true,
                loop: true,
                autoplaySpeed: 500,
                smartSpeed: 500,
                animateIn: 'fadeIn',
                animateOut: 'fadeOut',
                responsive: {
                    0: {
                        items: 1
                    },
                    560: {
                        items: 1
                    },
                    720: {
                        items: 1
                    },
                    980: {
                        items: 1
                    }
                }
            });
        }
        Fullscreen_section();
        Background_parallax();
    });
    $(window).load(function() {
        allLocation = $('#Map_distributor').html();
        if ($('.rsform-block-captcha').length) {
            $('.rsform-block-captcha img').css({
                width: '100%',
                'margin-bottom': 15
            });
        }
        Maps_mobile();
    });
    $(window).resize(function() {
        Menu_plus_mobile();
        Fullscreen_section();
        Background_parallax();
        Maps_mobile();
    });

    function Fullscreen_section() {
        var width_past = -($(window).width() / 2 + 17);
        if ($('.section-fullscreen > img').length) {
            $('.section-fullscreen').each(function() {
                var fullscreen = $(this);
                fullscreen.find('img').hide();
                fullscreen.css({
                    'background-image': 'url(' + fullscreen.find('img').attr('src') + ')',
                    'margin-left': width_past
                });
            });
        }
    }

    function Menu_plus_mobile() {
        if ($('#menu-navigation ul.nav').length) {
            var flag = 0;
            if ($(window).width() < 980) {
                $('#menu-navigation li.parent').each(function() {
                    var parent = $(this);
                    if (!parent.children('.icon_expand').length) {
                        parent.children('a').after('<i class="icon_expand fa fa-plus"></i>');
                        if ($('#menu-navigation li.parent .icon_expand').length) {

                            $('#menu-navigation li.parent .icon_expand').each(function() {

                                $(this).click(function() {

                                    if (flag == 0) {
                                        $(this).next('ul.nav-child').slideDown(function() {

                                            $(this).parent().find('i').removeClass('fa-plus');
                                            $(this).parent().find('i').addClass('fa-minus');
                                            $(this).addClass('scroll_ul');
                                            flag = 1;
                                        })
                                    } else {
                                        $(this).next('ul.nav-child').slideUp(function() {

                                            $(this).parent().find('i').removeClass('fa-minus');
                                            $(this).parent().find('i').addClass('fa-plus');
                                            $(this).removeClass('scroll_ul');
                                            flag = 0;

                                        })
                                    }


                                });
                            });

                        }
                    }
                });
            } else {
                $('#menu-navigation li.parent .icon_expand').remove();
                $('#menu-navigation > ul.nav').removeAttr('style');
                $('#menu-navigation li.parent ul.nav-child').removeAttr('style');

                flag = 0;
            }
        }
    }



    function Background_parallax() {
        if ($('.bg-parallax > img').length) {
            $('.bg-parallax > img').each(function() {
                var img = $(this);
                var parent = $(this).closest('.bg-parallax');
                img.hide();
                parent.css({
                    'background-image': 'url(' + img.attr('src') + ')'
                });
                if (parent.next('.col-text').length) {
                    parent.css({
                        'height': parent.next('.col-text').outerHeight()
                    })
                } else if (parent.prev('.col-text').length) {
                    parent.css({
                        'height': parent.prev('.col-text').outerHeight()
                    })
                } else {
                    parent.css({
                        'height': img.height()
                    })
                }
            });
        }
    }

    function Maps_distributor() {
        if ($('#Map_distributor').length) {
            $('#Map_distributor > area').each(function(i, e) {
                i++;
                $(this).attr('data-state', 'location-' + i);
                $(this).attr('key', 'location-' + i);
            });
            $('#MapsLocation').mapster({
                mapKey: 'data-state',
                fillColor: '7ec242',
                scaleMap: true,
                isSelectable: true,
                fade: true,
                fadeDuration: 500,
                stroke: true,
                strokeColor: '449000',
                onClick: function() {
                    window.open($(this).attr('href'), '_blank');
                    return false;
                }
            });
            $('.location .logo-dis').each(function() {
                var location = $(this);
                location.hover(function() {
                    if ($(this).attr('data-group') != 'undefined') {
                        $('#Map_distributor > area[data-group="' + $(this).attr('data-group') + '"]').mapster('set', true, {
                            fadeDuration: 500,
                            fade: true
                        });
                    }
                    $('#Map_distributor > area[data-state="' + $(this).attr('data-state') + '"]').mapster('set', true, {
                        fadeDuration: 500,
                        fade: true
                    });
                }, function() {
                    $('#Map_distributor area').mapster('set', false, {
                        fadeDuration: 500,
                        fade: true
                    });
                });
            });
        }
    }

    function Maps_mobile() {
        if ($(window).width() <= 980) {
            $('#MapsLocation').mapster('unbind');
            var list = '';
            $('map#Map_distributor area').each(function() {
                list += '<li><a href="' + $(this).attr('href') + '" title="' + $(this).attr('title') + '">' + $(this).attr('title') + '</a></li>';
            });
            if (!$('.location .maps-img img#MapsLocation[data-original]').length) {
                $('.location .maps-img img#MapsLocation').attr('data-original', $('.location .maps-img img#MapsLocation').attr('src'));
            }
            $('.location .maps-img img#MapsLocation').attr('src', baseRoot + $('.location .maps-img img#MapsLocation').attr('data-mobile'));
            if (!$('.location ol.list-location-mobile').length) {
                $('.location').append('<ol class="list-location-mobile">' + list + '</ul>');
            }
            $('#Map_distributor').empty();
        } else {
            if (!$('#Map_distributor area').length) {
                $('#Map_distributor').html(allLocation);
            }
            if ($('.location .maps-img img#MapsLocation[data-original]').length) {
                $('.location .maps-img img#MapsLocation').attr('src', $('.location .maps-img img#MapsLocation').attr('data-original'));
            }
            if ($('.location ol.list-location-mobile').length) {
                $('.location ol.list-location-mobile').remove();
            }
            $('#MapsLocation').mapster({
                mapKey: 'data-state',
                fillColor: '7ec242',
                scaleMap: true,
                isSelectable: true,
                fade: true,
                fadeDuration: 500,
                stroke: true,
                strokeColor: '449000',
                onClick: function() {
                    window.open($(this).attr('href'), '_blank');
                    return false;
                }
            });
        }
    }
}(jQuery));