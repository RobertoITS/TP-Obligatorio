const jwt = require('jsonwebtoken')

const generateJWT = (uid) => {
    return new Promise((resolve, rejected) => {
        const payload = { uid }

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
            if(err){
                console.log(err);
                rejected
            }
            else {
                resolve(token)
            }
        })
    })
}

export default generateJWT