import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global.service';
import {UserService} from '../../services/user.service';
import {ProductoService} from '../../services/producto.service';
import {Producto}  from '../../models/producto';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css'],
  providers:[UserService, ProductoService]
})

export class ProductoAddComponent implements OnInit{
  public titulo: string;
  public producto: Producto;
  public identity;
  public token;
  public url:string;
  public alertMessage;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _productoService: ProductoService
  ){
      this.titulo = 'Crear nuevo producto';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.producto = new Producto('','',0,'');

  }

  ngOnInit(){
      console.log('producto-add.component.ts cargado');
      
      //Conseguir el listado de productos
      
  }

  onSubmit(){
      console.log(this.producto);
      this._productoService.addProducto(this.token, this.producto).subscribe(
          response =>{
              this.producto = response.producto;

              if(!response.producto){
                  this.alertMessage=('Error en el servidor');
              }else{
                  this.alertMessage=('El producto se ha creado correctamente');
                  this.producto = response.producto;
                  this._router.navigate(['./editar-producto', response.producto._id]);
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

