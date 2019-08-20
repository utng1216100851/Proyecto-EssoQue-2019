import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../../services/global.service';
import {UserService} from '../../services/user.service';
import {UploadService} from '../../services/upload.service';
import {EventoService} from '../../services/evento.service';
import {Evento}  from '../../models/evento';


@Component({
  selector: 'app-evento-edit',
  templateUrl: './evento-edit.component.html',
  styleUrls: ['./evento-edit.component.css'],
  providers:[UserService, EventoService, UploadService]
})
export class EventoEditComponent implements OnInit {
  public titulo: string;
  public evento: Evento;
  public identity;
  public token;
  public url:string;
  public alertMessage;
  public is_edit;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _uploadService: UploadService,
      private _eventoService: EventoService
  ){
      this.titulo = 'Editar evento';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.evento = new Evento('','','',null);
      this.is_edit = true;
  }

  ngOnInit(){
      console.log('evento-edit.component.ts cargado');
      //Llamar al metodo del api para sacar un evento en base a su id getEvento
      this.getEvento();
  }

  getEvento(){
      this._route.params.forEach((params: Params)=>{
          let id = params['id'];
          this._eventoService.getEvento(this.token, id).subscribe(
              response =>{
             

                  if(!response.evento){
                      this._router.navigate(['/']);
                  }else{
                      this.evento = response.evento;
                  }
              },
              error =>{
                  var errorMessage = <any>error;
          
                  if(errorMessage != null){
                    var body = JSON.parse(error._body);
                    //this.alertMessage = body.message;
                    console.log(error);
                  }
              }
          );
      });
  }

  onSubmit(){
      console.log(this.evento);
          this._route.params.forEach((params: Params)=>{
          let id = params['id'];
      this._eventoService.editEvento(this.token,id,this.evento).subscribe(
          response =>{
              this.evento = response.evento;

              if(!response.evento){
                  this.alertMessage=('Error en el servidor');
              }else{
                  this.alertMessage=('El evento se ha actualizado correctamente');
                  if(!this.filesToUpload){
                      this._router.navigate(['./eventos', response.evento._id]);
                  }else{
                  //Subir la imagen de evento
                      this._uploadService.makeFileRequest(this.url+'upload-image-evento/'+id, [], this.filesToUpload, this.token, 'image')
                      .then(
                          (result)=>{
                              this._router.navigate(['./eventos', response.evento._id]);
                          },
                          (error)=>{
                              console.log(error);
                          }
                      );
              }
                  //this.evento = response.evento;
                  //this._router.navigate(['./editar-evento'], response.evento._id);
              }
          },
          error =>{
              var errorMessage = <any>error;
      
              if(errorMessage != null){
                var body = JSON.parse(error._body);
                this.alertMessage = body.message;
                console.log(error);
              }
            }
          );
      });
  }
  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}



