const Mongoose = require("mongoose");

const config = {
    url: "mongodb://127.0.0.1:27017/mongoose",
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

function conectar() {
    return Mongoose.connect(config.url, config.options);
}

function desconectar() {
    return Mongoose.disconnect();
}

module.exports = { conectar, desconectar };