const { request, response } = require("express")
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")


const { User, Role, Person, Status } = require("../db")
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/googleVerify");

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

    const { dataValues } = newUser
    const { password: pass, ...userWithoutPass } = dataValues
    const token = await generateJWT(newUser.uid)
    res.status(200).json({ user: { ...userWithoutPass, name }, token })


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
                username: "",
                image,
                roleId: role.id || roleCreated.id
            })
            await Promise.allSettled([
                Person.create({ name, lastname, userId: user.uid }),
                await Status.create({ userId: user.uid })
            ])
        }
        const { dataValues } = user
        const { password, ...userWithoutPass } = dataValues
        const newtoken = await generateJWT(user.uid)

        res.status(201).json({ user: { ...userWithoutPass, name }, token: newtoken })

    } catch (error) {
        res.status(400).json({ msg: error.message })
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
        const { name } = await Person.findOne({ where: { userId: user.uid } })
        const { dataValues } = user
        const { password: pass, ...userWithoutPass } = dataValues
        res.status(200).json({ user: { ...userWithoutPass, name }, token })


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const renewJWT = async (req = request, res = response) => {
    const { uid } = req.userJWT
    const { dataValues } = await User.findOne({ where: { uid } })
    const { password, ...user } = dataValues
    const { name } = await Person.findOne({ where: { userId: uid } })
    const token = await generateJWT(uid)
    res.status(200).json({ user: { ...user, name }, token })
}



const getAllUsers = async (req = request, res = response) => {
    const users = await User.findAll()
    res.status(201).json({ data: users })

}
const infoUser = async (req = request, res = response) => {
    const { id: uid } = req.params
    const { dataValues } = await User.findOne({
        where: { uid },
        include: [
            { model: Person, as: "info" },
            { model: Status, as: "status" }
        ]
    })
    const { password, ...rest } = dataValues

    res.status(201).json(rest)

}

const postRol = async (req = request, res = response) => {
    const { name } = req.body
    if (!name) res.status(400).json({ errors: { name: "este campo es obligatorio" } })
    if (await Role.findOne({ where: { name } })) return res.status(400).json({ errors: { name: "el nombre esta repetido" } })
    const newRol = await Role.create({ name })
    res.status(201).json(newRol)
}
const getRols = async (req = request, res = response) => {
    const rols = await Role.findAll({})
    res.status(200).json({ data: rols })
}
const getRol = async (req = request, res = response) => {
    const { id } = req.params
    const rol = await Role.findByPk(id)
    if (!rol) return res.status(404).json({ error: `el rol con el id: ${id} no existe` })
    res.status(200).json(rol)
}
const changeRol = async (req = request, res = response) => {
    const { id } = req.params
    const { role } = req.body
    if (!id || !role) return res.status(400).json({ message: "los campos id y role son obligatorios" })

    const user = await User.findByPk(id)
    if (!user) return res.status(400).json({ errors: { userId: "el usuario no existe" } })
    const rol = await Role.findOne({ where: { name: role } })
    if (!rol) {
        const validRoles = await Role.findAll()
        return res.status(400).json({ errors: { role: `el rol: ${role} no esta contenido en los roles validos ${validRoles.map(rol => rol.name)}` } })
    }

    await User.update({ roleId: rol.id }, { where: { uid: user.uid } })
    return res.status(200).json({ message: `rol cambiado a ${role}` })

}

module.exports = {
    postRol,
    registerUser,
    getAllUsers,
    infoUser,
    loginUser,
    renewJWT,
    googleAuth,
    getRol,
    getRols,
    changeRol
}
