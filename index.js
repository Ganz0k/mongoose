const db = require("./config/db");
const ProductoDAO = require("./dataAccess/productoDAO");
const VentaDAO = require("./dataAccess/ventaDAO");
const ProductoVentaDAO = require("./dataAccess/productoVentaDAO");

db.conectar()
    .then(async () => {
        try {
            for (let i = 1; i <= 10; i++) {
                const nuevoProducto = {
                    nombre: `Producto ${i}`,
                    precio: Math.floor(Math.random() * 100) + 1,
                    cantidad: Math.floor(Math.random() * 50) + 1
                };
                await ProductoDAO.crearProducto(nuevoProducto);
                console.log(`Producto ${i} creado`);
            }

            for (let i = 1; i <= 3; i++) {
                const nuevaVenta = {
                    total: Math.floor(Math.random() * 1000) + 1,
                    iva: Math.floor(Math.random() * 100) + 1
                };
                const ventaCreada = await VentaDAO.crearVenta(nuevaVenta);
                console.log(`Venta ${i} creada`);

                const productos = await ProductoDAO.obtenerProductos(3);

                const productosVenta = productos.map(producto => ({
                    idVenta: ventaCreada._id,
                    idProducto: producto._id,
                    cantidadVendida: Math.floor(Math.random() * producto.cantidad) + 1,
                    subtotal: producto.precio * (Math.floor(Math.random() * producto.cantidad) + 1),
                    precioVenta: producto.precio
                }));

                for (const productoVenta of productosVenta) {
                    await ProductoVentaDAO.crearProductoVenta(productoVenta);
                }

                await VentaDAO.agregarProductosAVenta(ventaCreada._id, productos.map(producto => producto._id));
                console.log(`Productos asignados a la venta ${i}`);
            }

            const desgloseVenta1 = await VentaDAO.obtenerDesgloseVenta("651ccc90489f453fc4ed1062");
            console.log("Desglose de la venta: ", desgloseVenta1);
            const desgloseVentas = await VentaDAO.obtenerTodasLasVentasConDesglose();
            console.log("Desglose de las ventas: ", desgloseVentas);
            
            db.desconectar();
        } catch (error) {
            console.error("Error en las pruebas: ", error);
        }
    })
    .catch(err => {
        console.error("Error en las pruebas: ", err);
    });