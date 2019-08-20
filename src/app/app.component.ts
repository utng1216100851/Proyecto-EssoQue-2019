import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from './services/global.service';
import {UserService} from './services/user.service'; 
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit {
  public title = 'EssoQue Music';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url: string;
 

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');
    this.user_register = new User('','','','','','ROLE_USER','');
    this.url = GLOBAL.url;
  }

  ngOnInit(){
   this.identity = this._userService.getIdentity();
   this.token = this._userService.getToken();

   console.log(this.identity);
   console.log(this.token);
  }

  public onSubmit(){
    console.log(this.user);

    //Conseguir los datos dell usuario identificado
    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert("El usuario no esta correctamente identificado");
        }else{
          //Crear elemento en el localstorage para tener al usuario en sesion
          localStorage.setItem('identity', JSON.stringify(identity));

          //Conseguir el token para enviarselo en cada peticion
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;
      
              if(this.token.length <= 0){
                alert("El no se ha generado");
              }else{
                //Crear elemento en el localstorage para tener token disponible
                localStorage.setItem('token', token);
                this.user = new User('','','','','','ROLE_USER','');
              }
            },
            error => {
              var errorMessage = <any>error;
      
              if(errorMessage != null){
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
                console.log(error);
              }
            }
          );
        }
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(error);
        }
      }
    );
  }
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity=null;
    this.token= null;
    this._router.navigate(['/']);
  }

 

  onSubmitRegister(){
      console.log(this.user_register);
      this._userService.register(this.user_register).subscribe(
        response =>{
          let user = response.user;
          this.user_register=user;

          if(!user._id){
            this.alertRegister='Error al registrarse';
          }else{
            this.alertRegister = 'El registro se ha realizado correctamente, Identificate con: ' + this.user_register.email;
            this.user_register = new User('','','','','','ROLE_USER','');
          }
        },
        error => {
          var errorMessage = <any>error;
  
          if(errorMessage != null){
            var body = JSON.parse(error._body);
            this.alertRegister = body.message;
            console.log(error);
          }
        }
      );
  }
}
