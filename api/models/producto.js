'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    name: String,
    description: String,
    precio: Number,
    image: String
});

module.exports = mongoose.model('Producto', ProductoSchema);
