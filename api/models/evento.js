'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventoSchema = Schema({
    lugar: String,
    tipo: String,
    descripcion: String,
    fecha: Date
});

module.exports = mongoose.model('Evento', EventoSchema);
