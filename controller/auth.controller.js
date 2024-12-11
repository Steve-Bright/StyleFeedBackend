import Merchant from "../model/merchant.model.js"
import {fMsg, fError, encode} from "../utils/libby.js"

export const merchantRegister = async(req, res, next) => {
    try{
        let {
            email,
            password,
            confirmPassword,
            phoneNumber,
            shopName,
            shopLocation,
            website,
            productsCategories
        } = req.body;

        const merchantEmail = await Merchant.findOne({email})
        
        if(!email && !password){
            return fError(res, "Where is the password? bitch ", 404)
        }
        
        if(merchantEmail){
            return fError(res, "Email already exists", 409)
        }

        const merchantPhone = await Merchant.findOne({phoneNumber})
        if(merchantPhone){
            return fError(res, "Phone already exists", 409)
        }

        if(password != confirmPassword){
            return fError(res, "Passwords do not match with the confirmed password", 400)
        }

        const hashedPassword = encode(password)
        console.log("this should work")
        const newMerchant = await Merchant.create({
            email, password: hashedPassword, phoneNumber, shopName, shopLocation, website, productsCategories 
        })

        
        const merchant = newMerchant.toObject();
        delete merchant.password

        fMsg(res, "Merchant Registered Successfully", merchant, 200)
    }catch(error){
        next(error)
    }
}