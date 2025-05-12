const cvModel= require("../models/cvSchema")

const uploadCv= (req,res)=>{
    const cv= req.body
    const newCv= new cvModel({
        cv
    })

    newCv.save()
    .then((result)=>{
        res.status(201).json({
            data:result,
            message: "your CV was uploaded successfully"
        })
    })
    .catch((error)=>{
        res.status(501).json({
            data:error,
            message: "error in uploading CV"
        })
    })
}


module.exports= {uploadCv}