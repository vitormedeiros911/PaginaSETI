const { hash } = require("bcryptjs");

const User = require("./src/app/models/User");

async function createUser() {
    try {
        const password = await hash("guaira@2020", 8);

        await User.create({
            name: "Administrador",
            email: "seti@guaira.pr.gov.br",
            password,
            type: "admin"
        });

        return console.log("Admin user has been created.");

    } catch (error) {
        console.error(error);
    }
}

async function init() {
    await createUser();
}

init();