const Tutorial = require("../models/Tutorial")

async function post(req, res, next) {

    let { title, description } = req.body

    const keys = Object.keys(title, description)

    const tutorial = await Tutorial.findOne({ where: { title } })

    for (let key of keys) {
        if (req.body[key] == "") {
            return res.render("admin/tutoriais/create", {
                tutorial: req.body,
                error: 'Por favor, volte e preencha todos os campos'
            })
        }
    }

    if (!req.files || req.files == 0) {
        return res.render("admin/tutoriais/create", {
            tutorial: req.body,
            error: "Envie pelo menos uma imagem"
        })
    }

    if (tutorial) return res.render("admin/tutoriais/create", {
        tutorial: req.body,
        error: "Este tutorial possui o mesmo título de outro tutorial já cadastrado"
    })

    next()
}
async function put(req, res, next) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "" && key != "removed_files") {
            return res.render('admin/tutoriais/edit', {
                tutorial: req.body,
                error: 'Por favor, preencha todos os campos'
            })
        }
    }

    next()
}

module.exports = {
    post,
    put
}