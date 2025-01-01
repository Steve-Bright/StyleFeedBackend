import Product from "../model/item.model.js";
import Proudct from "../model/item.model.js";
import {fError, fMsg} from "../utils/libby.js"

// export const createProduct = async(req, res, next) => {
//     try {
//         const {name, description, variations, category, availability, originalPrice, discountPercentage, discountAmount, imageUrls} = req.body;
//         if(!name || !description || !variations || !category || !availability || !price || !imageUrls){
//             return fError(res, "Need the field of either name, description, variations, category, availability, price, discount or imageUrls")
//         }

//         if(!variations["size"] || !variations["color"] || !variations["stock"] || !variations["price"] || !variations["availability"]){
//             return fError(res, "Need to provide size, color, stock and price in variations")
//         }

//         let discountCalculation;

//         if(discountPercentage){
//             if(discountPercentage < 0 || discountPercentage > 100){
//                 return fError(res, "Discount percentage must be between 0 and 100")
//             }

//             discountCalculation = discountPercentage / 100 * originalPrice
//         }

//         if(discountAmount){
//             if(discountAmount < 0){
//                 return fError(res, "Discount amount must be greater than 0")
//             }
//             discountCalculation = discountAmount
//         }

//         const createdProduct = await Product.create({
//             name,
//             description,
//             variations,
//             category,
//             availability,
//             originalPrice,
//             discountPercentage, 
//             discountAmount: discountCalculation,
//             imageUrls
//         })

//         fMsg(res, "Product created successfully", createdProduct)
        
//         // res.status(201).json(product);
//     } catch (error) {
//         console.log("create product error " + error)
//     }
// }

export const createProduct = async(req, res, next) => {
    try {
        const {name, description, variations, category} = req.body;
        if(!name || !description || !variations || !category){
            return fError(res, "Need the field of either name, description, variations, category")
        }

        let definedCategories = ["clothes","mens_wear","women_wear","childs_wear", "sport_wear","shoes", "accessories"]


        for(let cat of category){
            if(!definedCategories.includes(cat)){
                return fError(res, "Category must be one of the defined ones")
            }
                
        }
        if(variations.length === 0){
            return fError(res, "Need to provide at least one variation: size, color, price, stock, availability")
        }

        for(let eachVar of variations){
            if(!eachVar.originalPrice || !eachVar.stock || !eachVar.availability || !eachVar.imageUrls){
                return fError(res, "Need to provide originalPrice, stock, availability and imageUrls in each variation")
            }

            let originalPrice = eachVar.originalPrice

            if(eachVar.availability != "preorder" && eachVar.availability != 'instock'){
                return fError(res, "Availability must be either preorder or instock")
            }

            let disAmt = 0;
            let disPercent= 0;
            if(eachVar.discountPercentage && eachVar.discountAmount){
                return fError(res, "Cannot provide both disPercent and disAmt")
            }else if(eachVar.discountPercentage){
                disPercent = eachVar.discountPercentage
                if(disPercent < 0 || disPercent > 100){
                    return fError(res, "dis Percent must be between 0 and 100")
                }
                disAmt = disPercent / 100 * originalPrice
            }else if(eachVar.discountAmount){
                disAmt = eachVar.discountAmount
            }
                
            let finalPrice = originalPrice - disAmt
            eachVar.finalPrice = finalPrice
        }

        const createdProduct = await Product.create({
            name,
            description,
            variations,
            category
        })

        fMsg(res, "Product created successfully", createdProduct)
    } catch (error) {
        console.log("create product error " + error)
    }
}