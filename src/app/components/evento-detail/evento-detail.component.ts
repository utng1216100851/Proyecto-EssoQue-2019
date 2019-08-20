import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../../services/global.service';
import {UserService} from '../../services/user.service';
import {EventoService} from '../../services/evento.service';
import {AlbumService} from '../../services/album.service';
import {Evento}  from '../../models/evento';


@Component({
  selector: 'app-evento-detail',
  templateUrl: './evento-detail.component.html',
  styleUrls: ['./evento-detail.component.css'],
  providers:[UserService, EventoService, AlbumService]
})
export class EventoDetailComponent implements OnInit {
  public evento: Evento;
  public identity;
  public token;
  public url:string;
  public alertMessage;
  

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _eventoService: EventoService
     
  ){
     
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
     
     
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
}


