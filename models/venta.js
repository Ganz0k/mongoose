const Mongoose = require("mongoose");

const ventaSchema = new Mongoose.Schema({
    total: {
        type: Number,
        required: true
    },
    iva: {
        type: Number,
        required: true
    },
    productosVenta: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "productoVenta",
        required: true
    }]
});

module.exports = Mongoose.model("venta", ventaSchema);