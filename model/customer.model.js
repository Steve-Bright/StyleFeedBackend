import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    addresses: {
        type: [String],
    }
})

const Customer = mongoose.model("Customer", customerSchema)

export default Customer;
