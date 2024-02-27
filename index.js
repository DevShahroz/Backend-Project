const express = require("express");
const errorHandler = require("./middleware/ErrorHandler");
const connectdb = require("./Config/dbConnection");
const dotenv =  require("dotenv").config();
connectdb();
const app = express();

const port = process.env.port || 5000;

app.use(express.json());
app.use("/api/contacts",require("./Routes/ContactRoutes"));
app.use("/api/users",require("./Routes/UserRoutes"));

app.use(errorHandler);

app.listen(port,()=>
{
    console.log(`server running on port ${port}`);
});