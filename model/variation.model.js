import mongoose from "mongoose"

const variationSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
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
        type: Number
    }
});

const Variation = mongoose.model("Variation", variationSchema)
export default Variation;