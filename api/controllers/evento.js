'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginat = require('mongoose-pagination')
var Evento = require('../models/evento');
var Album = require('../models/album');
var Song = require('../models/song');


function getEvento(req, res){
    var eventoId = req.params.id;

    Evento.findById(eventoId, (err, evento)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!evento){
                res.status(404).send({message: 'El evento no existe'});
            }else{
                res.status(200).send({evento});
            }
        }
    });
}


function getEventos(req, res){

    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    var itemsPerPage = 4;

    Evento.find().sort('name').paginate(page, itemsPerPage, function(err, eventos, total){
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!eventos){
                res.status(404).send({message: 'No hay Eventos'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    eventos: eventos
                });
            }
        }
    });
}

function saveEvento(req,res){
    var evento = new Evento();
    var params = req.body;
    evento.lugar = params.lugar;
    evento.tipo = params.tipo;
    evento.descripcion = params.descripcion;
    evento.fecha = params.fecha;

    evento.save((err, eventoStored)=>{
        if(err){
            res.status(500).send({message:'Error al guardar el evento'});
        }else{
            if(!eventoStored){
                res.status(404).send({message:'El evento no ha sido guardado'});
       
            }else{
                res.status(200).send({evento: eventoStored});
       
            }
        }
    })
}

function updateEvento(req, res){
    var eventoId = req.params.id;
    var update = req.body;

    Evento.findByIdAndUpdate(eventoId, update, (err, eventoUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al guardar el evento'});
        }else{
            if(!eventoUpdated){
                res.status(404).send({message:'El evento no ha sido actualizado'});
            }else{
                res.status(200).send({evento: eventoUpdated});
            }
        }
    });
}

function deleteEvento(req,res){
    var eventoId = req.params.id;
    Evento.findByIdAndRemove(eventoId, (err, eventoRemoved)=>{
        if(err){
            res.status(500).send({message:'Error al guardar el evento'});
        }else{
            if(!eventoRemoved){
                res.status(404).send({message:'El evento no ha sido elimindado'});
            }else{
                Album.find({evento: eventoRemoved._id}).remove((err,albumRemoved)=>{
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
                                        res.status(200).send({evento: eventoRemoved});
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
    var eventoId = req.params.id;
    var file_name = "Imagen no subida...";

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' ){

            Evento.findByIdAndUpdate(eventoId, {image: file_name}, (err,eventoUpdated)=>{
                if(!eventoId){
                    res.status(404).send({message: "No se ha podido actualizar el usuario!!"});
                }else{
                    res.status(200).send({evento: eventoUpdated});
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
    var path_file = './uploads/eventos/' + imageFile;
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la Imagen...'});
        }
    });
}



module.exports ={
    getEvento,
    saveEvento, 
    getEventos,
    updateEvento,
    deleteEvento,
    uploadImage,
    getImageFile
}




