let arrow = document.querySelector('.arrowScroll');
arrow.addEventListener('click', function (event) {
    scrollTo(0, 0)
});

window.addEventListener('scroll', function () {
    arrow.hidden = (window.pageYOffset < document.documentElement.clientHeight);
});