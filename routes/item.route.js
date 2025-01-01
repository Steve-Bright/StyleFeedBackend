import express from "express"
import { createProduct } from "../controller/item.controller.js"

const router = express.Router()

router.post("/create", createProduct)

export default router;