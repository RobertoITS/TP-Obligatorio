const { response, request } = require('express');
const { validationResult } = require('express-validator');

const fieldValidator = (req = request, res = response, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            error: errors.mapped()
        })
    }

    next()
}

export const validator = {
    fieldValidator
}