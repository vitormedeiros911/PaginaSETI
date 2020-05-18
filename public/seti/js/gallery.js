const ImageGallery = {
    highlight: document.querySelector(".gallery .highlight >img"),
    previews: document.querySelectorAll(".gallery-preview img"),
    setImage(e) {
        const { target } = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
        target.classList.add('active')

        ImageGallery.highlight.src = target.src
        Lightbox.image.src = target.src
    }
}

const Lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
    open() {
        Lightbox.target.style.opacity = 1
        Lightbox.target.style.top = 0
        Lightbox.target.style.bottom = 0
        Lightbox.closeButton.style.top = 0
        $(window).scroll(function () {
            $('header').removeClass("sticky");
        });
    },
    close() {
        $(window).scroll(function () {
            $('header').addClass("sticky");
        });
        Lightbox.target.style.opacity = 0
        Lightbox.target.style.top = "-100%"
        Lightbox.target.style.bottom = "inital"
        Lightbox.closeButton.style.top = "-80px"
    }
}