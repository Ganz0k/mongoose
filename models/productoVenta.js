const Mongoose = require("mongoose");

const productoVentaSchema = new Mongoose.Schema({
    idVenta: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "venta",
        required: true
    },
    idProducto: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "producto",
        required: true
    },
    cantidadVendida: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    precioVenta: {
        type: Number,
        required: true
    }
});

module.exports = Mongoose.model("productoVenta", productoVentaSchema);