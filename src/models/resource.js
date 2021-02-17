const mongoose = require('mongoose');
const { stringify } = require('qs');
const { Schema } = mongoose;

const ResSchema = new Schema({
    titulo: {type: String, required: true},
    claves: {type: Array, required: true},
    descripcion: {type: String, required: true},
    fuente: {type: String, required: true},
    tiporecurso: {type: String, required: true},
    cobertura: {type: String, required: true}
})

module.exports = mongoose.model('Resource', ResSchema);