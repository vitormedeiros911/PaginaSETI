const Tutorial = require('../models/Tutorial')

const { date } = require('../../lib/date')

async function getImages(tutorialId) {
    let files = await Tutorial.files(tutorialId)
    files = files.map(file => ({
        ...file,
        src: `${file.path.replace("public", "")}`
    }))

    return files
}

async function format(tutorial) {
    try {
        const files = await getImages(tutorial.id)

        tutorial.img = files[0].src
        tutorial.files = files
        const { year, day, hour, minutes, month } = date(tutorial.updated_at)

        tutorial.published = {
            day: `${day}/${month}/${year}`,
            hour: `${hour}h${minutes}m`,
        }

        return tutorial

    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    load(service, filter) {
        this.filter = filter
        return this[service]()
    },
    async tutorial() {
        try {
            const tutorial = await Tutorial.findOne(this.filter)
            
            return format(tutorial)

        } catch (error) {
            console.error(error);
        }
    },
    async tutoriais() {
        try {
            const tutoriais = await Tutorial.findAll(this.filter)
            const tutoriaisPromise = tutoriais.map(format)

            return Promise.all(tutoriaisPromise)
        } catch (error) {
            console.error(error);
        }
    },
    format,
}
