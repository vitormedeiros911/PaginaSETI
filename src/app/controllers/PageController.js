const mailer = require("../../lib/mailer")

const images = [
    '/images/backgrounds/1.jpg',
    '/images/backgrounds/2.jpg',
    '/images/backgrounds/3.jpg',
    '/images/backgrounds/4.jpg',
]

let randomImage = images[Math.ceil(Math.random() * images.length - 1)]

module.exports = {
    index(req, res) {
        try {
            return res.render("seti/pages/index", { randomImage })
        } catch (error) {
            console.error(error);
        }
    },
    aboutUs(req, res) {
        return res.render("seti/pages/about/aboutUs", { randomImage })
    },
    async contactUs(req, res) {
        try {
            let { name, email, municipio_empresa, phoneNumber, text, assunto } = req.body

            assunto.toUpperCase()

            await mailer.sendMail({
                to: "seti@guaira.pr.gov.br",
                from: "seti@guaira.pr.gov.br",
                subject: `${assunto}`,
                html: `<p> ${text} </p>

    <p>Remetente: <strong>${name} - ${email} - ${phoneNumber} - ${municipio_empresa}</strong></p>`
            })

            return res.render("seti/pages/index", {
                success: "Mensagem enviada com sucesso",
                randomImage
            })

        } catch (error) {
            console.error(error)
            return res.render("seti/pages/index", {
                error: "Erro inesperado, tente novanemente mais tarde",
                randomImage
            })
        }

    },
    sistemasPage(req, res) {
        try {
            return res.render("seti/pages/sistemas.njk", { randomImage })
        } catch (error) {
            console.error(error)
        }
    },
    aboutSarcophagus(req, res) {
        try {
            return res.render("seti/pages/about/sarcophagus.njk", { randomImage })

        } catch (error) {
            console.error(error);
        }
    },
    async SarcophagusRequest(req, res) {
        try {

            let { name, email, municipio, phoneNumber, text, estado } = req.body

            await mailer.sendMail({
                to: "seti@guaira.pr.gov.br",
                from: "seti@guaira.pr.gov.br",
                subject: `Solicitação do sistema SARCOPHAGUS de: ${municipio} - ${estado}`,
                html: `<p>${text}</p>
    
    <p>Remetente: <strong>${name} - ${phoneNumber} - ${email}</strong></p>`
            })

            return res.render("seti/pages/about/sarcophagus", {
                success: "Mensagem enviada com sucesso",
                randomImage
            })

        } catch (error) {
            console.error(error)
            return res.render("seti/pages/about/sarcophagus", {
                error: "Erro inesperado, tente novanemente mais tarde"
            })
        }
    },
}