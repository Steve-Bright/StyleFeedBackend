import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoConnection from "./dbconnection/mongoConnect.js";

dotenv.config();
let serverPort = process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(serverPort, () => {
    mongoConnection()
})