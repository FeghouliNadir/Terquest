jQuery(document).ready(function ($) {
    if ($(window).width() < 768) {
        $('.theme-services__single').click(function () {
            $('.theme-services__single').removeClass('active');
            $(this).addClass('active');
        });
        $(document).click(function (e) {
            if (!$(e.target).closest('.theme-services__single').length) {
                $('.theme-services__single').removeClass('active');
            }
        });
    } else {
        $('.theme-services__single').hover(
            function () {
                $(this).addClass('active');
            },
            function () {
                $(this).removeClass('active');
            }
        );
    }

    $('.theme-header__hamburger').click(function () {
        $(this).toggleClass('active');
        $('.theme-nav').toggleClass('active');
    });

    $('.theme-nav a').click(function () {
        $('.theme-header__hamburger').removeClass('active');
        $('.theme-nav').removeClass('active');
    });

    $('.theme-reviews__slider').slick({
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,
        autoplaySpeed: 1000
    });
});