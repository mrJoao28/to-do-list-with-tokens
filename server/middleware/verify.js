const jwt = require("jsonwebtoken");
require("dotenv").config();


const verify = (req,res,next) =>{
    const header = req.header['authorization'] ?.split(" ")[1] || " ";
    try{
        const decoded = jwt.verify(header,process.env.TOKEN)
        res.json({"data":decoded});
        next();
    }catch(err){
        res.status(500).json({"message":err.message})
    }

}

module.exports = verify;