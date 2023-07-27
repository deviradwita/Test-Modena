const { verifyToken } = require('../helpers/jwt');
const {User} = require('../models');



async function authentication (req, res, next) {
    try {
        const access_token = req.headers.access_token
       
        if(!access_token) {
            throw {name : "InvalidToken"}
        }

        const payload = verifyToken(access_token)
     
        const foundUser = await User.findByPk(payload.id)
       
        if(!foundUser){
            throw {name : "InvalidToken"}
        }
        req.user = {
            id : foundUser.id,
            email: foundUser.email
        }

        next()
        
    } catch (error) {
       
        next(error);
      
    }
}

module.exports= authentication 