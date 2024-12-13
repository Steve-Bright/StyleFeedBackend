import mongoose from "mongoose";

const merchantSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    shopName: {
        type: String,
        required: true,
        index: true
    },
    shopLocation: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    productsCategories: {
        type: [String],
        enum: ['shirts' , 'sneakers', 'pants', 'dresses', 'jackets', 'men', 'women']
    },
    shopLogo: {
        type: String
    }
    // crn: {
    //     type: String,
    //     required: true
    // }
})

const Merchant = mongoose.model("Merchant", merchantSchema)
export default Merchant;