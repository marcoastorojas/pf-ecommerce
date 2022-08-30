

const isValidEmail = (email) => {

    let re = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/g
    return email.match(re)
}

module.exports = { isValidEmail }