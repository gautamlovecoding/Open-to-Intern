const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    mobile: {
        type: String,
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(v);
            },
            message: "Please enter a valid mobile number"
        },
        required: [true, "Mobile required"]
    },
    collegeId: { type: ObjectId, ref: "College", required: true },
    isDeleted: { type: Boolean, default: false }

}, { timestamps: true })

module.exports = mongoose.model('intern', internSchema)