import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    merchantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Merchant",
        required: true,
    },
    size: {
        type: String,
        // enum: ['S', 'M', 'L', 'XL', 'XXL'], // Adjust as needed
    },
    color: {
        type: String,
    },
    originalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    discountPercentage: {
        type: Number,
    },
    discountAmount: {
        type: Number
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    availability: {
        type: String,
        required: true,
        enum: ["preorder", "instock"],
    },
    imageUrls: {
        required: true,
        type: [String]
    },
    finalPrice: {
        required: true,
        type: Number
    },
    category: {
        type: [String],
        required: true,
        enum: ["clothes","mens_wear","women_wear","childs_wear", "sport_wear","shoes", "accessories"], // Adjust as needed
    },
    variations: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Variation",
    }, 
    

});

// Middleware to update the `updatedAt` field automatically


const Product = mongoose.model('Product', productSchema);

export default Product;
