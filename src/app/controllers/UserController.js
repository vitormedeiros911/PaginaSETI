const { hash } = require("bcryptjs")

const User = require("../models/User")

module.exports = {
    registerForm(req, res) {
        return res.render("admin/users/register.njk")
    },
    async post(req, res) {
        try {
            let { name, email, password, userType } = req.body

            password = await hash(password, 8)

            await User.create({
                name,
                email,
                password,
                type: userType
            })

            const users = await User.findAll()

            return res.render("admin/users/index", {
                users,
                success: "Usuário criado com sucesso"
            })

        } catch (error) {
            console.error(error);
        }
    },
    async edit(req, res) {
        try {
            const user = await User.findOne({
                where:
                    { id: req.params.id }
            })

            return res.render("admin/users/edit", { user })

        } catch (error) {
            console.error(error);
        }
    },
    async update(req, res) {
        try {
            const { user } = req
            let { name, email, userType, NewPassword } = req.body

            await User.update(user.id, {
                name,
                email,
                type: userType
            })

            if (NewPassword) {
                password = NewPassword
                password = await hash(password, 8)
                await User.update(user.id, {
                    password
                })
            }

            const users = await User.findAll()

            return res.render("admin/users/index", {
                users,
                success: "Conta atualizada com sucesso"
            })


        } catch (error) {
            console.error(error)
            return res.render("admin/users/index", {
                error: error
            })
        }
    },
    async delete(req, res) {
        try {
            await User.delete(req.body.id)

            const users = await User.findAll()

            if (req.session.userId == req.body.id) {
                req.session.destroy()
            }

            return res.render("admin/users/index", {
                users,
                success: "Conta deletada com sucesso"
            })

        } catch (error) {
            console.error(error)
            return res.render("admin/users/index", {
                users,
                error: "Erro ao tentar deletar a conta."
            })
        }
    },
    async listUsers(req, res) {
        try {
            const users = await User.findAll()

            return res.render("admin/users/index", { users })

        } catch (error) {
            console.error(error);
        }
    }
}