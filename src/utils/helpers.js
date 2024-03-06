function validateRequestBody(req, res, next) {
    try {
        if ((!req.body || Object.keys(req.body).length === 0)) {
            throw { message: 'No body was sent', status: 400 };
        }
    } catch (error) {
        console.error(error.message);
        return res.status(error.status).send(error.message);
    }
    next();
}

function errorMiddleware(error, req, res, next) {
    if (!error.status)
        return res.status(500).send(error.message)

    console.log(error.message);
    return res.status(error.status).send({message: error.message, isError: true, content: error.content || null})
}

module.exports = {
    validateRequestBody,
    errorMiddleware
}