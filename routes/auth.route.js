import express from "express";
import {merchantRegister, merchantLogin} from "../controller/auth.controller.js";
import {validateBody} from "../utils/validator.js"
import { MerchantSchema } from "../utils/schema.js";

const router = express.Router();

router.post("/merchant/register", validateBody(MerchantSchema.register), merchantRegister)
router.post("/merchant/login", merchantLogin)

export default router;