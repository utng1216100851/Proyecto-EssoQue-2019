import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'; 
import { Observable } from 'rxjs/Observable';
import {GLOBAL} from './global.service';
import { Producto } from '../models/producto';
 

@Injectable()
export class ProductoService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }


    getProductos(token, page){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url + 'productos/'+page, options)
                        .map(res=>res.json());
    }

    getProducto(token, id: string){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url + 'producto/'+id, options)
                        .map(res=>res.json());
    }

    addProducto(token, producto:Producto){
        let params = JSON.stringify(producto);
        let headers =  new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url+'producto', params,{headers:headers})
                .map(res => res.json());
    }

    editProducto(token,id:string, producto:Producto){
        let params = JSON.stringify(producto);
        let headers =  new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.put(this.url+'producto/'+ id, params,{headers:headers})
                .map(res => res.json());
    }
    deleteProducto(token, id: string){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({headers: headers});
        return this._http.delete(this.url + 'producto/'+id, options)
                        .map(res=>res.json());
    }


}