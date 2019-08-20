import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global.service';
import {UserService} from '../../services/user.service';
import {ProductoService} from '../../services/producto.service';
import {Producto}  from '../../models/producto';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css'],
  providers:[UserService, ProductoService]
})
export class ProductoListComponent implements OnInit {
  public titulo: string;
  public productos: Producto[];
  public identity;
  public token;
  public url:string;
  public next_page;
  public prev_page;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _productoService: ProductoService,
      private _userService: UserService
  ){
      this.titulo = 'Productos';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.next_page = 1;
      this.prev_page = 1;

  }

  ngOnInit(){
      console.log('producto-list.component.ts cargado');

      //Conseguir el listado de productos
      this.getProductos();
      
  }

  getProductos(){
      this._route.params.forEach((params:Params)=>{
          let page = +params['page'];
          if(!page){
              page = 1;
          }else{
              this.next_page = page+1;
              this.prev_page = page-1;

              if(this.prev_page == 0){
                  this.prev_page = 1;
              }
          }
          this._productoService.getProductos(this.token, page).subscribe(
              response =>{
                  if(!response.productos){
                      this._router.navigate(['/']);
                  }else{
                      this.productos = response.productos;
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

  public confirmado;
  onDeleteConfirm(id){
      this.confirmado = id;
  }

  onCancelProducto(){
      this.confirmado = null;
  }

  onDeleteProducto(id){
      this._productoService.deleteProducto(this.token, id).subscribe(
          response =>{
              if(!response.producto){
                  alert('Error en el servidor');
              }
              this.getProductos();
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
  }
}


