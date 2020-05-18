const express = require("express")
const routes = express.Router()

const PageController = require("../app/controllers/PageController")

const tutoriais = require("./tutoriais")
const users = require("./users")

routes.get("/seti/home", PageController.index)
routes.get("/seti/sobre", PageController.aboutUs)
routes.post("/seti/home", PageController.contactUs)

routes.get("/seti/sistemas", PageController.sistemasPage)
routes.get("/seti/sistemas/SobreSarcophagus", PageController.aboutSarcophagus)
routes.post("/seti/sistemas/SobreSarcophagus", PageController.SarcophagusRequest)

routes.use("/seti/users", users)
routes.use("/seti/tutoriais", tutoriais)

routes.get("/", function (req, res) {
    return res.redirect("/seti/home")
})
routes.get("/home", function (req, res) {
    return res.redirect("/seti/home")
})
routes.get("/seti", function (req, res) {
    return res.redirect("/seti/home")
})

module.exports = routes