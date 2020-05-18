const db = require("../../config/db")

const Base = require("./Base")

Base.init({ table: 'tutoriais' })

module.exports = {
    ...Base,
    async files(id) {
        const results = await db.query(`
            SELECT * FROM files WHERE tutorial_id = ($1)
        `, [id])

        return results.rows
    },
    async search(params) {
        const { filter } = params

        let query = "",
            filterQuery = `WHERE`

        filterQuery = `
            ${filterQuery}
            tutoriais.title ILIKE '%${filter}%'
            OR tutoriais.description ILIKE '%${filter}%'
        `

        query = `
            SELECT tutoriais.*
            FROM tutoriais
            ${filterQuery}
        `

        const results = await db.query(query)
        return results.rows
    }
}