const bcryptjs = require("bcryptjs");
const { genSaltSync, hashSync, compareSync } = bcryptjs

const jsonwebtoken = require("jsonwebtoken");
const { sign, verify } = jsonwebtoken

const jwt_secret = process.env.JWT_SECRET




const generateHashedValue = (password) => {
    const salt = genSaltSync(10)
    return hashSync(password, salt)
}

const isPasswordCorrect = (password1, password2) => {
    return compareSync(password1, password2)
} 

const createAccessToken = (id) => {
    const token = sign({id}, jwt_secret, {expiresIn: "1h"})
    return token
}

const createRefreshToken = (id) => {
    const token = sign({id}, jwt_secret, {expiresIn: "30d"})
    return token
}

const isTokenValid = (token) => {
    return verify(token, jwt_secret)
}


module.exports ={generateHashedValue , isPasswordCorrect, createAccessToken, createRefreshToken, isTokenValid}