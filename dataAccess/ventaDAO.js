const Venta = require("../models/venta");
const ProductoVenta = require("../models/productoVenta");
const Producto = require("../models/producto");

class VentaDAO {

    static async crearVenta(ventaData) {
        try {
            const venta = new Venta(ventaData);

            return await venta.save();
        } catch (error) {
            throw error;
        }
    }

    static async obtenerVentaPorId(id) {
        try {
            return await Venta.findById(id);
        } catch (error) {
            throw error;
        }
    }

    static async actualizarVenta(id, ventaData) {
        try {
            return await Venta.findByIdAndUpdate(id, ventaData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    static async eliminarVenta(id) {
        try {
            return await Venta.findByIdAndRemove(id);
        } catch (error) {
            throw error;
        }
    }

    static async agregarProductosAVenta(idVenta, productos) {
        try {
            const venta = await Venta.findById(idVenta);
            
            if (!venta) {
                throw new Error("Venta no encontrada");
            }

            venta.productosVenta.push(...productos);
            
            return await venta.save();
        } catch (error) {
            throw error;
        }
    }

    static async obtenerVentas(limit = 10) {
        try {
            return await Venta.find().limit(limit);
        } catch (error) {
            throw error;
        }
    }

    static async obtenerDesgloseVenta(id) {
        try {
            const venta = await Venta.findById(id);

            if (!venta) {
                throw new Error("Venta no encontrada");
            }

            const productoVenta = await ProductoVenta.find({ idVenta: venta._id });

            const desgloseVenta = await Promise.all(productoVenta.map(async (productoVenta) => {
                const producto = await Producto.findById(productoVenta.idProducto);

                return {
                    producto: producto,
                    cantidadVendida: productoVenta.cantidadVendida,
                    subtotal: productoVenta.subtotal,
                    precioVenta: productoVenta.precioVenta
                };
            }));

            return {
                venta: venta,
                desglose: desgloseVenta
            };
        } catch (error) {
            throw error;
        }
    }

    static async obtenerTodasLasVentasConDesglose() {
        try {
            const ventas = await Venta.find();

            const ventasConDesglose = await Promise.all(ventas.map(async (venta) => {
                const productosVenta = await ProductoVenta.find({ idVenta: venta._id });
                
                const desgloseVenta = await Promise.all(productosVenta.map(async (productoVenta) => {
                    const producto = await Producto.findById(productoVenta.idProducto);

                    return {
                        producto: producto.toJSON(),
                        cantidadVendida: productoVenta.cantidadVendida,
                        subtotal: productoVenta.subtotal,
                        precioVenta: productoVenta.precioVenta
                    };
                }));

                const productosVentaJSON = productosVenta.map(productoVenta => productoVenta.toJSON());

                return {
                    venta: venta.toJSON(),
                    productoVenta: productosVentaJSON,
                    desglose: desgloseVenta
                };
            }));

            return ventasConDesglose;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = VentaDAO;