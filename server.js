import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoConnection from "./dbconnection/mongoConnect.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();
let serverPort = process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/auth", authRoute)
 
app.use((err, req, res, next) => {
    err.status = err.status || 505
    res.status(err.status).json({con: false, msg: err.message})
})

app.listen(serverPort, () => {
    mongoConnection();
    console.log("port : 42651")
})