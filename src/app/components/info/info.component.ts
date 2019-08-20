import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit{
  public titulo: string;
  

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
    
  ){
      this.titulo = 'Información';
  }

  ngOnInit(){
      console.log('homet.component.ts cargado');

      //Conseguir el listado de artistas
      
  }
}
