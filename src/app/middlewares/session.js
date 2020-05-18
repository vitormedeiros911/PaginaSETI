function onlyUsers(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/seti/users/login")
    }

    next()
}

function isLoggedRedirect(req, res, next) {
    if(req.session.userId) {
        return res.redirect("/seti/users/tutoriais")
    }

    next()
}

module.exports = {
    onlyUsers,
    isLoggedRedirect
}