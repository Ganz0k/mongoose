const Mongoose = require("mongoose");

const productoSchema = new Mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
});

module.exports = Mongoose.model("producto", productoSchema);