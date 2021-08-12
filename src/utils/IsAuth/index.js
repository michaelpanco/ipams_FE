import { getCookie } from '../Cookie'
import config from '../../config/app'

const jwt = require('jsonwebtoken')

const isAuth = () => {

    const jwt_verification =jwt.verify(getCookie('token'), config.jwt_secret, function(err) {
        return (err) ? false : true
    })

    return jwt_verification
};

export default isAuth