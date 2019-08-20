'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginat = require('mongoose-pagination')
var Producto = require('../models/producto');
var Album = require('../models/album');
var Song = require('../models/song');


function getProducto(req, res){
    var productoId = req.params.id;

    Producto.findById(productoId, (err, producto)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!producto){
                res.status(404).send({message: 'El producto no existe'});
            }else{
                res.status(200).send({producto});
            }
        }
    });
}


function getProductos(req, res){

    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    var itemsPerPage = 4;

    Producto.find().sort('name').paginate(page, itemsPerPage, function(err, productos, total){
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!productos){
                res.status(404).send({message: 'No hay Productos'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    productos: productos
                });
            }
        }
    });
}

function saveProducto(req,res){
    var producto = new Producto();
    var params = req.body;
    producto.name = params.name;
    producto.precio = params.precio;
    producto.description = params.description;
    producto.image = 'null';

    producto.save((err, productoStored)=>{
        if(err){
            res.status(500).send({message:'Error al guardar el producto'});
        }else{
            if(!productoStored){
                res.status(404).send({message:'El producto no ha sido guardado'});
       
            }else{
                res.status(200).send({producto: productoStored});
       
            }
        }
    })
}

function updateProducto(req, res){
    var productoId = req.params.id;
    var update = req.body;

    Producto.findByIdAndUpdate(productoId, update, (err, productoUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al guardar el producto'});
        }else{
            if(!productoUpdated){
                res.status(404).send({message:'El producto no ha sido actualizado'});
            }else{
                res.status(200).send({producto: productoUpdated});
            }
        }
    });
}

function deleteProducto(req,res){
    var productoId = req.params.id;
    Producto.findByIdAndRemove(productoId, (err, productoRemoved)=>{
        if(err){
            res.status(500).send({message:'Error al guardar el producto'});
        }else{
            if(!productoRemoved){
                res.status(404).send({message:'El producto no ha sido elimindado'});
            }else{
                Album.find({producto: productoRemoved._id}).remove((err,albumRemoved)=>{
                    if(err){
                        res.status(500).send({message:'Error al eliminar el album'});
                    }else{
                        if(!albumRemoved){
                            res.status(404).send({message:'El album no ha sido elimindado'});
                        }else{
                            Song.find({album: albumRemoved._id}).remove((err,songRemoved)=>{
                                if(err){
                                    res.status(500).send({message:'Error al eliminar la canción'});
                                }else{
                                    if(!songRemoved){
                                        res.status(404).send({message:'La canción no ha sido elimindada'});
                                    }else{
                                        res.status(200).send({producto: productoRemoved});
                                    }
                                }
                                    
                            });
                        }  
                    }    
                });
            }
        }
    });
}


function uploadImage(req, res){
    var productoId = req.params.id;
    var file_name = "Imagen no subida...";

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' ){

            Producto.findByIdAndUpdate(productoId, {image: file_name}, (err,productoUpdated)=>{
                if(!productoId){
                    res.status(404).send({message: "No se ha podido actualizar el usuario!!"});
                }else{
                    res.status(200).send({producto: productoUpdated});
                }
            });
        }else{
            res.status(200).send({message: 'Extensión del archivo no es valida'});
        }

    }else{
        res.status(200).send({message: 'No has subido ninguna Imagen...'});
    }
}


function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/productos/' + imageFile;
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la Imagen...'});
        }
    });
}



module.exports ={
    getProducto,
    saveProducto, 
    getProductos,
    updateProducto,
    deleteProducto,
    uploadImage,
    getImageFile
}




