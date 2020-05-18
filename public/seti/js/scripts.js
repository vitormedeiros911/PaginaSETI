const Mask = {
    apply(input, func) {
        setTimeout(function () {
            input.value = Mask[func](input.value)
        }, 1)
    },
    phone(value) {
        value = value.replace(/\D/g, "")

        if (value.length > 11) {
            value = value.slice(0, -1)
        }

        value = value.replace(/(\d{2})(\d)/, "($1) $2")

        value = value.replace(/(\d)(\d{4})$/, "$1-$2")


        return value
    }
}

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('header').addClass("sticky");
    } else {
        $('header').removeClass("sticky");
    }
});
