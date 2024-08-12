const jwt=require('jsonwebtoken')

const generateToken=(user)=>{
    const token=jwt.sign({
        id:user.id,
        email:user.email,
        username:user.username
    },'INDIAN',{expiresIn:'24h'})

    return token;
}

module.exports=generateToken;