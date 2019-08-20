import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../../services/global.service';
import {UserService} from '../../services/user.service';
import {UploadService} from '../../services/upload.service';
import {ProductoService} from '../../services/producto.service';
import {Producto}  from '../../models/producto';
@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css'],
  providers:[UserService, ProductoService, UploadService]
})
export class ProductoEditComponent implements OnInit {
  public titulo: string;
  public producto: Producto;
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
      private _productoService: ProductoService
  ){
      this.titulo = 'Editar producto';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.producto = new Producto('','',0,'');
      this.is_edit = true;
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
      console.log(this.producto);
          this._route.params.forEach((params: Params)=>{
          let id = params['id'];
      this._productoService.editProducto(this.token,id,this.producto).subscribe(
          response =>{
              this.producto = response.productot;

              if(!response.producto){
                  this.alertMessage=('Error en el servidor');
              }else{
                  this.alertMessage=('El producto se ha actualizado correctamente');
                  if(!this.filesToUpload){
                      this._router.navigate(['./producto', response.producto._id]);
                  }else{
                  //Subir la imagen de producto
                      this._uploadService.makeFileRequest(this.url+'upload-image-producto/'+id, [], this.filesToUpload, this.token, 'image')
                      .then(
                          (result)=>{
                              this._router.navigate(['./producto', response.producto._id]);
                          },
                          (error)=>{
                              console.log(error);
                          }
                      );
              }
                  //this.producto = response.producto;
                  //this._router.navigate(['./editar-producto], response.producto._id);
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


