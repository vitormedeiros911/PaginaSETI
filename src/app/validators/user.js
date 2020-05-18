const User = require("../models/User")
const { compare } = require('bcryptjs')

async function show(req, res, next) {
    const { userId: id } = req.session

    const user = await User.findOne({ where: { id } })

    if (!user) return res.render("user/register", {
        error: "Usuário não encontrado!"
    })

    req.user = user

    next()
}
async function post(req, res, next) {

    let { name, email, password, passwordRepeat } = req.body

    const user = await User.findOne({
        where: { email },
        or: { name }
    })

    if (user) return res.render("admin/users/register", {
        user: req.body,
        error: 'Usuário já cadastrado!'
    })

    if (password != passwordRepeat) {
        return res.render("admin/users/register", {
            user: req.body,
            error: 'Senhas não combinam'
        })
    }

    next()
}
async function update(req, res, next) {

    const { id, NewPassword, passwordRepeat } = req.body

    if (NewPassword != passwordRepeat) {
        return res.render("admin/users/edit", {
            user: req.body,
            error: 'Senhas não combinam'
        })
    }

    const user = await User.findOne({ where: { id } })

    req.user = user

    next()
}

module.exports = {
    post,
    show,
    update
}