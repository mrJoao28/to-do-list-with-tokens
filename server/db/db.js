const mongoose = require("mongoose");

const acctiveDB = (url)=>{
    return mongoose.connect(url);
}

module.exports = acctiveDB;