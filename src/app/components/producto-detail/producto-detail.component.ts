import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../../services/global.service';
import {UserService} from '../../services/user.service';
import {ProductoService} from '../../services/producto.service';
import {AlbumService} from '../../services/album.service';
import {Producto}  from '../../models/producto';
import {Album}  from '../../models/album';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css'],
  providers:[UserService, ProductoService, AlbumService]
})
export class ProductoDetailComponent implements OnInit {
  public producto: Producto;
  public albums: Album[];
  public identity;
  public token;
  public url:string;
  public alertMessage;
  

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _productoService: ProductoService,
      private _albumService: AlbumService
  ){
     
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
     
     
  }

  ngOnInit(){
      console.log('producto-edit.component.ts cargado');
      //Llamar al metodo del api para sacar un producto en base a su id getProducto
      this.getProducto();
  }

  getProducto(){
      this._route.params.forEach((params: Params)=>{
          let id = params['id'];
          this._productoService.getProducto(this.token, id).subscribe(
              response =>{
             

                  if(!response.producto){
                      this._router.navigate(['/']);
                  }else{
                      this.producto = response.producto;

                      //Sacar los albums del producto
                      this._albumService.getAlbums(this.token, response.producto._id).subscribe(
                          response=>{
                              if(!response.albums){
                                  this.alertMessage= 'Este producto no tiene albums';
                              }else{
                                  this.albums = response.albums;

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

  onCancelAlbum(){
      this.confirmado = null;
  }

  onDeleteAlbum(id){
      this._albumService.deleteAlbum(this.token, id).subscribe(
          response=>{
              if(!response.album){
                  alert('Error en el servidor');
              }
              this.getProducto();
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



