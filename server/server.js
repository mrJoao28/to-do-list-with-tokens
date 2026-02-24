const express = require("express");
const acctiveDB = require("./db/db");


require("dotenv");

const PORT = process.env.PORT;
const URL = process.env.URL;
const app = express();

app.use(express.json());
app.use("/to-do-list",require("./routes/routes"))

const start = async ()=>{
    await acctiveDB(URL);
    app.listen(PORT,()=>{console.log(`the server is running on ${PORT} port`)});
}

start();

