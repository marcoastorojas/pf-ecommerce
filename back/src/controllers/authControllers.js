const { request, response } = require("express")
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")


const { User, Role, Person, Status } = require("../db")
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/googleVerify");

const postRol = async (req = request, res = response) => {
    const { name } = req.body
    if (!name) res.status(400).json({ errors: { name: "este campo es obligatorio" } })
    if (await Role.findOne({ where: { name } })) return res.status(400).json({ errors: { name: "el nombre esta repetido" } })
    const newRol = await Role.create({ name })
    res.status(201).json(newRol)
}

const registerUser = async (req = request, res = response) => {
    const { password, role, name, ...rest } = req.body
    const { id: roleId } = await Role.findOne({ where: { name: role } })
    //encriptando la contraseña
    const encrypted = bcrypt.hashSync(password, 10)

    const newUser = await User.create({ ...rest, password: encrypted, roleId })

    await Promise.allSettled([
        Person.create({ name, userId: newUser.uid }),
        Status.create({ userId: newUser.uid })
    ])
    const token = await generateJWT(newUser.uid)
    res.status(200).json({ user: newUser, token })


}

const googleAuth = async (req = request, res = response) => {
    try {
        const { token } = req.headers
        const { name, email, image, lastname } = await googleVerify(token)
        const [role, roleCreated] = await Role.findOrCreate({ where: { name: "USER_ROLE" }, defaults: { name: "USER_ROLE" } })
        let user = await User.findOne({ where: { email } })
        if (!user) { // crea si no existe
            user = await User.create({
                email,
                password: "",
                google: true,
                image,
                roleId: role.id || roleCreated.id
            })
            await Promise.allSettled([
                Person.create({ name, lastname, userId: user.uid }),
                await Status.create({ userId: user.uid })
            ])
        }

        const newtoken = await generateJWT(user.uid)

        res.status(201).json({ data: user, token: newtoken })

    } catch (error) {
        res.status(400).json({ msg: "el token de google no es valido" })
    }

}

const loginUser = async (req = request, res = response) => {
    const { email_user, password } = req.body

    try {
        //buscar user por  email_user
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email_user },
                    { username: email_user }
                ],
            },
            include: [
                { model: Person, as: "info" },
                { model: Status, as: "status" }
            ]
        })

        if (!user) {
            return res.status(401)
                .json({ errors: { email_user: `no existe un usuario con el email o username ${email_user}` } })
        }
        // si no existe un usuario email_username  o si existe pero fue eliminado ( status=false )
        const status = await Status.findOne({ where: { userId: user.uid } })
        if (!status.active) {
            return res.status(401)
                .json({ errors: { email_user: `no existe un usuario con el email o username ${email_user}` } })
        }

        //validando contraseña con la contraseña encriptada solo si encontro un usuario con el email o username
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if (!isValidPassword) {
            return res.status(401)
                .json({ errors: { password: `la contraseña es incorrecta` } })
        }

        const token = await generateJWT(user.uid)

        res.status(200).json({ user, token })


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const renewJWT = async (req = request, res = response) => {
    const { uid } = req.userJWT
    const user = await User.findOne({ where: { uid } })
    const token = await generateJWT(uid)
    res.status(200).json({ user, token })
}



const getAllUsers = async (req = request, res = response) => {
    const users = await User.findAll()
    res.status(201).json({ data: users })

}
const infoUser = async (req = request, res = response) => {
    const { id: uid } = req.params
    const user = await User.findOne({
        where: { uid },
        include: [
            { model: Person, as: "info" },
            { model: Status, as: "status" }
        ]
    })
    res.status(201).json(user)

}



module.exports = {
    postRol,
    registerUser,
    getAllUsers,
    infoUser,
    loginUser,
    renewJWT,
    googleAuth
}
