import express from "express"
import multer from "multer"
import { createProduct, createVariation } from "../controller/product.controller.js"
import {validateToken} from "../utils/libby.js"

const router = express.Router()
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post("/create", validateToken(), upload.fields([{name: "imageUrls", maxCount: 3}]), createProduct)
router.post("/createVariation", validateToken(),  upload.fields([{name: "imageUrls", maxCount: 3}]), createVariation)

export default router;