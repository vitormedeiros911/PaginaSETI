const express = require("express")
const routes = express.Router()

const SessionController = require("../app/controllers/SessionController")
const UserController = require("../app/controllers/UserController")
const TutorialController = require("../app/controllers/TutorialController")

const UserValidator = require("../app/validators/user")
const TutorialValidator = require("../app/validators/tutorial")
const SessionValidator = require("../app/validators/session")

const { isLoggedRedirect, onlyUsers } = require("../app/middlewares/session")
const multer = require("../app/middlewares/multer")

routes.get('/login', isLoggedRedirect, SessionController.loginForm)
routes.get("/forgot-password", SessionController.forgotForm)
routes.get("/password-reset", SessionController.resetForm)
routes.get('/logout', SessionController.logout)

routes.post('/login', isLoggedRedirect, SessionValidator.login, SessionController.login)
routes.post("/forgot-password", SessionValidator.forgot, SessionController.forgot)
routes.post("/password-reset", SessionValidator.reset, SessionController.reset)

routes.get("/index", onlyUsers, UserController.listUsers)
routes.get("/register",  onlyUsers, UserController.registerForm)
routes.get("/:id/edit", onlyUsers, UserController.edit)

routes.post("/register", onlyUsers, UserValidator.post, UserController.post)

routes.put("/", onlyUsers, UserValidator.update, UserController.update)

routes.delete("/index", onlyUsers, UserController.delete)

routes.get("/tutoriais", onlyUsers, TutorialController.listTutoriais)
routes.get("/novoTutorial", onlyUsers, TutorialController.create)
routes.get("/tutorial/:id/edit", onlyUsers, TutorialController.edit)

routes.post("/novoTutorial", onlyUsers, multer.array("photos", 15), TutorialValidator.post, TutorialController.post)
routes.put("/tutorial", onlyUsers, multer.array("photos", 15), TutorialValidator.put, TutorialController.put)
routes.delete("/tutoriais", onlyUsers, TutorialController.delete)

module.exports = routes