const jwt= require("jsonwebtoken")

const SECRT= process.env.SECRT
const TOKEN_EXP_TIME= process.env.TOKEN_EXP_TIME

const generateToken=(user)=>{

  const payload= {
userId: user._id,
role: user.role
    }

    const options= {
        expiresIn:TOKEN_EXP_TIME
    
    }

    return jwt.sign(payload,SECRT,options)
}


module.exports = generateToken