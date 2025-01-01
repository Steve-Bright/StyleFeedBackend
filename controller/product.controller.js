import Product from "../model/product.model.js";
import Variation from "../model/variation.model.js";
import {fError, fMsg} from "../utils/libby.js"
import {uploadImageToSupabase} from "../utils/supabaseUpload.js"


export const createProduct = async(req, res, next) => {
    try {
        const {
            name, 
            description, 
            size,
            color,
            originalPrice, 
            discountPercentage,
            discountAmount,
            stock, 
            availability, 
            category} = req.body;
            let merchantId = req.user._id;
        if(!name || !description || !originalPrice || !stock || !availability || !category){
            return fError(res, "Need the required fields")
        }

        let definedCategories = ["clothes","mens_wear","women_wear","childs_wear", "sport_wear","shoes", "accessories"]


        let imageUrls = []
        if(req.files.imageUrls){
            try {
                for (const file of req.files.imageUrls) {
                  const contentPictureUrl = await uploadImageToSupabase(file, "product_images");
                  imageUrls.push(contentPictureUrl); // Save the URL to the array
                }
              } catch (uploadError) {
                return next(new Error(`File upload failed: ${uploadError.message}`));
            }
        }

        let categoryEntry;
        if(category.includes(",")){
            categoryEntry = category.split(",");
        }else{
            categoryEntry = [category]
        }
  

        for(let cat of categoryEntry){
            if(!definedCategories.includes(cat)){
                return fError(res, "Category must be one of the defined ones")
            }
                
        }

        let disAmt = 0;
        if(discountAmount && discountPercentage){
            return fError(res, "Cannot provide both discount amount and discount percentage")
        }else if(discountPercentage){
            if(discountPercentage < 0 || discountPercentage > 100){
                return fError(res, "Discount percentage must be between 0 and 100")
            }
            disAmt = discountPercentage / 100 *  originalPrice
        }else if (discountAmount){
            disAmt = discountAmount
        }

        let finalPrice = originalPrice - disAmt

        if(availability != "preorder" && availability != "instock"){
            return fError(res, "Availability must be either preorder or instock")
        }

        const createdProduct = await Product.create({
            name,
            description,
            merchantId,
            size, 
            color,
            originalPrice, 
            discountPercentage, 
            discuntAmount: disAmt,
            stock,
            imageUrls,
            availability,
            finalPrice,
            category: categoryEntry
        })

        fMsg(res, "Product created successfully", createdProduct)
    } catch (error) {
        console.log("create product error " + error)
    }
}

export const createVariation = async(req, res, next) => {
    try{
        const {productId, size, color, originalPrice, discountPercentage, discountAmount, stock, availability} = req.body;
        if(!productId  || !stock || !availability){
            return fError(res, "Need the required fields")
        }

        let productFound = await Product.findById(productId)
        if(!productFound){
            return fError(res, "Product not found")
        }

        if(!size && !color ){
            return fError(res, "Need to provide different size or color to create variation")
        }

        let imageUrls = []
        if(req.files.imageUrls){
            try {
                for (const file of req.files.imageUrls) {
                    const contentPictureUrl = await uploadImageToSupabase(file, "product_images");
                    imageUrls.push(contentPictureUrl); // Save the URL to the array
                }
                } catch (uploadError) {
                return next(new Error(`File upload failed: ${uploadError.message}`));
            }
        }

        let disAmt = 0;
        if(discountAmount && discountPercentage){
            return fError(res, "Cannot provide both discount amount and discount percentage")
        }else if(discountPercentage){
            if(discountPercentage < 0 || discountPercentage > 100){
                return fError(res, "Discount percentage must be between 0 and 100")
            }
            disAmt = discountPercentage / 100 *  originalPrice
        }else if (discountAmount){
            disAmt = discountAmount
        }

        let finalPrice;
        if(originalPrice){
            finalPrice = originalPrice - disAmt
        }
        

        if(availability != "preorder" && availability != "instock"){
            return fError(res, "Availability must be either preorder or instock")
        }

        const variation = await Variation.create({
            productId,
            size,
            color,
            originalPrice,
            discountPercentage,
            discountAmount: disAmt,
            stock,
            imageUrls,
            availability,
            finalPrice
        })

        fMsg(res, "Variation created successfully", variation)
    }catch(error){
        console.log("variation error" + error)
    }
    
}