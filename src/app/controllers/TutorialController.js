const { unlinkSync } = require("fs")

const Tutorial = require('../models/Tutorial')
const File = require('../models/File')

const sharp = require("../../lib/sharp")

const LoadTutorial = require('../services/LoadTutorial')

const images = [
    '/images/backgrounds/1.jpg',
    '/images/backgrounds/2.jpg',
    '/images/backgrounds/3.jpg',
    '/images/backgrounds/4.jpg',
]

let randomImage = images[Math.ceil(Math.random() * images.length - 1)]

module.exports = {
    async index(req, res) {
        try {
            const allTutorials = await LoadTutorial.load('tutoriais')
            const tutoriais = allTutorials
                .filter((tutorial, index) => index > 5 ? false : true)

            return res.render("seti/pages/tutoriais/index", { tutoriais, randomImage })

        } catch (error) {
            console.error(error);
        }
    },
    async search(req, res) {
        try {
            let params = {}

            const { filter } = req.query

            params.filter = filter

            let tutoriais = await Tutorial.search(params)

            const tutoriaisPromise = await tutoriais.map(LoadTutorial.format)

            tutoriais = await Promise.all(tutoriaisPromise)

            const search = {
                term: req.query.filter,
                total: tutoriais.length
            }

            return res.render("seti/pages/tutoriais/index", { tutoriais, search, randomImage })

        } catch (error) {
            console.log(error)
        }
    },
    create(req, res) {
        return res.render("admin/tutoriais/create.njk")
    },
    async post(req, res) {
        try {

            let { title, description } = req.body

            let tutorial_id = await Tutorial.create({
                title,
                description
            })

            const filesPromise = req.files.map(file => {

                sharp.resizeImage(file)

                return File.create({ name: `resized-${file.filename}`, path: file.path, tutorial_id })
            })

            await Promise.all(filesPromise)

            const tutoriais = await LoadTutorial.load('tutoriais')

            return res.render(`admin/tutoriais/index`, {
                tutoriais,
                success: "Tutorial criado com sucesso"
            })

        } catch (error) {
            console.error(error);
        }
    },
    async show(req, res) {
        try {
            const tutorial = await LoadTutorial.load('tutorial', {
                where: {
                    id: req.params.id
                }
            })

            return res.render("seti/pages/tutoriais/show", { tutorial, randomImage })

        } catch (error) {
            console.error(error)
        }
    },
    async edit(req, res) {
        try {
            const tutorial = await LoadTutorial.load('tutorial', {
                where: {
                    id: req.params.id
                }
            })

            return res.render("admin/tutoriais/edit", { tutorial })

        } catch (error) {
            console.error(error)
        }
    },
    async put(req, res) {
        try {
            if (req.files.length != 0) {
                const newFilesPromise = req.files.map(file => {

                    sharp.resizeImage(file)

                    return File.create({ name: `resized-${file.filename}`, path: file.path, tutorial_id: req.body.id })
                })

                await Promise.all(newFilesPromise)
            }

            if (req.body.removed_files) {
                const removedFiles = req.body.removed_files.split(",")
                const lastIndex = removedFiles.length - 1
                removedFiles.splice(lastIndex, 1)

                const removedFilesPromise = removedFiles.map(id => File.delete(id))

                await Promise.all(removedFilesPromise)
            }

            await Tutorial.update(req.body.id, {
                title: req.body.title,
                description: req.body.description,
            })

            const tutoriais = await LoadTutorial.load('tutoriais')

            return res.render(`admin/tutoriais/index`, {
                tutoriais,
                success: "Tutorial atualizado com sucesso."
            })

        } catch (error) {
            console.error(error)
        }
    },
    async delete(req, res) {
        try {
            const files = await Tutorial.files(req.body.id)

            await Tutorial.delete(req.body.id)

            files.map(file => {
                try {
                    unlinkSync(file.path)
                } catch (error) {
                    console.error(error)
                }
            })

            const tutoriais = await LoadTutorial.load('tutoriais')

            return res.render('admin/tutoriais/index', {
                tutoriais,
                success:"Tutorial excluido com sucesso!"
            })

        } catch (error) {
            console.error(error)
            return res.render('admin/tutoriais/index', {
                tutoriais,
                error:"Algo de errado aconteceu, tente novamente"
            })
        }

    },
    async listTutoriais(req, res) {
        try {
            const tutoriais = await LoadTutorial.load('tutoriais')

            return res.render("admin/tutoriais/index", { tutoriais })

        } catch (error) {
            console.error(error);
        }
    }
}