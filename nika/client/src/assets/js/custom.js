$(document).ready(function () {
    let menuToggled = false;
    let faded = false;
    let footOpend = false;
    let menuText = $('#menu-content .toggle-content-text');
    let menuLinks = $('#menu-content .links-content');
    let footer = $('.hidden-footer');

    $('#toggle-icon').on({
        click: function () {
            $(this).toggleClass('rotate', '');
            menuToggled = !menuToggled;
            if (!faded) {
                menuText.fadeOut(0);
                menuLinks.fadeIn(0);
                faded = !faded;
            } else {
                menuText.fadeIn(0);
                menuLinks.fadeOut(0);
                faded = !faded;
            }
            if ($(window).scrollTop() > 2) {
                $('.menu-animation').toggleClass('restore');
                menuText.fadeOut(0);
                menuLinks.fadeIn(0);
                $('.bottom-part').fadeToggle(20);
                faded = !faded;
            } else if (faded) {
                // faded = false;
            }
            setTimeout(() => {
                let footerTop = $('.side-bar-header').prop('scrollHeight') ;//menu-title
                footer.css({top: footerTop});
            }, 35)

        }
    });
    $('#menu-content .toggle-content a').on({
        click: function () {
            menuText.fadeIn(0);
            menuLinks.fadeOut(0);
            faded = !faded;


            $('#toggle-icon').toggleClass('rotate', '');

            $(window).scrollTop(0);
            faded = false;
        }
    });
    $('.menu-title').on({
        click: function () {
            menuText.fadeIn(0);
            menuLinks.fadeOut(0);
            faded = !faded;

            if (menuToggled) {
                $('#toggle-icon').toggleClass('rotate', '');
                menuToggled = !menuToggled;
            }

            $(window).scrollTop(0);
            faded = false;
        }
    });

    $(function () {
        $(window).scroll(function (e) {
            let footerTop = $('.side-bar-header').prop('scrollHeight') ;
            // console.log($(window).scrollTop());
            if ($(window).scrollTop() > 52) {
                $('.menu-animation').removeClass('restore');
                $('.side-bar-logo').fadeOut(0);
                $('.bottom-part').fadeOut(20);
                $('.side-bar-header').addClass('menu-animation');

                $('#toggle-icon').removeClass('rotate');
                menuToggled = false;

            } else {

                $('.side-bar-logo').fadeIn();
                $('.bottom-part').fadeIn();
                $('.side-bar-header').removeClass('menu-animation');

                menuText.fadeIn(0);
                menuLinks.fadeOut(0);
                // faded = faded;
            }


            if (($('html').prop('scrollHeight')) - $(window).height() - 20 < $(window).scrollTop()) {

                footer.fadeIn(500);
                footer.css({top: footerTop});
                footOpend = true;
            } else {
                footer.fadeOut(500);
                footOpend = false;
            }


        });
    })
});
