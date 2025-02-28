const errorResponse = (res, statusCode, error) => {
    res.status(statusCode).send({status: 'error', error})
}
const successResponse = (res, statusCode, message, data) => {
    res.status(statusCode).send({status: 'success', message: message, data})
}


module.exports = {errorResponse , successResponse};