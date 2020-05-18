const express = require("express")
const routes = express.Router()

const TutorialController = require("../app/controllers/TutorialController")

routes.get("/index", TutorialController.index)
routes.get("/search", TutorialController.search)

routes.get("/:id", TutorialController.show)

module.exports = routes