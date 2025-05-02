 
 const authorization = (endPointPermission)=>{

    return (req,res,next)=>{
        const userPermission= req.token.role.permissions
        if(userPermission.includes(endPointPermission)){
            next()
        }else {
            res.status(403).json({
                message: "Unauthorized"
            })
        }
    }
 }

 module.exports= authorization