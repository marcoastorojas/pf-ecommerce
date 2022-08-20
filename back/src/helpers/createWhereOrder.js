const { Op } = require("sequelize")



const createWhereAndOrder = (query) => {

    const { name, max, min, asc = false, desc = false } = query

    let where = { [Op.or]: [] }
    let order = []
    if (max || min) { where.price = { [Op.between]: [min || 0, max || 10000000] } }
    if (name) {
        where[Op.or][0] = { title: { [Op.iLike]: `%${name}%` } }
        where[Op.or][1] = { model: { [Op.iLike]: `%${name}%` } }
    } else { delete where[Op.or] }


    if (asc && !desc) { order = [['price', 'ASC']] }
    else if (desc && !asc) { order = [['price', 'DESC']] }

    return { where, order }
}

module.exports = {
    createWhereAndOrder
}
