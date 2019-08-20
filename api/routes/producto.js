'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/productos'})

api.get('/producto/:id', md_auth.ensureAuth, ProductoController.getProducto);
api.post('/producto', md_auth.ensureAuth, ProductoController.saveProducto);
api.get('/productos/:page?', md_auth.ensureAuth, ProductoController.getProductos);
api.put('/producto/:id', md_auth.ensureAuth, ProductoController.updateProducto);
api.delete('/producto/:id', md_auth.ensureAuth, ProductoController.deleteProducto);
api.post('/upload-image-producto/:id', [md_auth.ensureAuth, md_upload],ProductoController.uploadImage);
api.get('/get-image-producto/:imageFile', ProductoController.getImageFile);

module.exports = api;