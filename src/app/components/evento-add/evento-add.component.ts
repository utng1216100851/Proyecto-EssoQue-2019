import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global.service';
import {UserService} from '../../services/user.service';
import {EventoService} from '../../services/evento.service';
import {Evento}  from '../../models/evento';

@Component({
  selector: 'app-evento-add',
  templateUrl: './evento-add.component.html',
  styleUrls: ['./evento-add.component.css'],
  providers:[UserService, EventoService]
})

export class EventoAddComponent implements OnInit {
  public titulo: string;
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
      this.titulo = 'Crear nuevo evento';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.evento = new Evento('','','',null);

  }

  ngOnInit(){
      console.log('evento-add.component.ts cargado');
      
      //Conseguir el listado de eventos
      
  }

  onSubmit(){
      console.log(this.evento);
      this._eventoService.addEvento(this.token, this.evento).subscribe(
          response =>{
              this.evento = response.evento;

              if(!response.evento){
                  this.alertMessage=('Error en el servidor');
              }else{
                  this.alertMessage=('El evento se ha creado correctamente');
                  this.evento = response.evento;
                  this._router.navigate(['./eventos', response.evento._id]);
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
  }
}

