const path = require("path");
const { request, response } = require("express");


const cargarArchivo = (req=request, res=response)=>{
    if(!req.files || Object.keys(req.files).length === 0 ){
        res.status(400).json({msg:"no hay archivos que subir"});
        return;
    }

    
    if(!req.files.archivo){
        res.status(400).json({msg:"no hay archivos que subir"});
        return;
    }

    const {archivo } = req.files;

    const uploadPath = path.join(__dirname ,"../uploads/" , archivo.name);

    archivo.mv(uploadPath, (err)=>{
        if(err){
            return res.status(500).json({err})
        }

        res.send({msg: "File uploaded to " + uploadPath});
    })
    
}

module.exports = {
    cargarArchivo,
}