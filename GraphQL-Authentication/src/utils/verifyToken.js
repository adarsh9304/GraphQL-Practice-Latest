const jwt=require('jsonwebtoken')

const verifyToken=(token)=>{
    try{
        return jwt.verify(token,'INDIAN')
    }
    catch(err){
        throw new Error('Invalid Token')
    }
}

module.exports=verifyToken