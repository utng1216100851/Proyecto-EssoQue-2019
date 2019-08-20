import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import user
import {HomeComponent} from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';

//import artist
import {ArtistListComponent} from './components/artist-list/artist-list.component';
import {ArtistAddComponent} from './components/artist-add/artist-add.component';
import {ArtistEditComponent} from './components/artist-edit/artist-edit.component';
import {ArtistDetailComponent} from './components/artist-detail/artist-detail.component';


//import productos
import {ProductoListComponent} from './components/producto-list/producto-list.component';
import {ProductoAddComponent} from './components/producto-add/producto-add.component';
import {ProductoEditComponent} from './components/producto-edit/producto-edit.component';
import {ProductoDetailComponent} from './components/producto-detail/producto-detail.component';



//Import album
import {AlbumAddComponent} from './components/album-add/album-add.component';
import {AlbumEditComponent} from './components/album-edit/album-edit.component';
import {AlbumDetailComponent} from './components/album-detail/album-detail.component';


//Import Song
import {SongAddComponent} from './components/song-add/song-add.component';
import {SongEditComponent} from './components/song-edit/song-edit.component';

//Import Eventos
import { EventoAddComponent } from './components/evento-add/evento-add.component';
import { EventoDetailComponent } from './components/evento-detail/evento-detail.component';
import { EventoEditComponent } from './components/evento-edit/evento-edit.component';
import { EventoListComponent } from './components/evento-list/evento-list.component';



const appRoutes: Routes =[
    {path: '', component:HomeComponent},
    {path: 'info', component:InfoComponent},
    {path: 'artistas/:page', component:ArtistListComponent},
    {path: 'crear-artista', component:ArtistAddComponent},
    {path: 'editar-artista/:id', component:ArtistEditComponent},
    {path: 'artista/:id', component:ArtistDetailComponent},

    {path: 'productos/:page', component:ProductoListComponent},
    {path: 'crear-producto', component:ProductoAddComponent},
    {path: 'editar-producto/:id', component:ProductoEditComponent},
    {path: 'producto/:id', component:ProductoDetailComponent},

    {path: 'eventos/:page', component:EventoListComponent},
    {path: 'crear-evento', component:EventoAddComponent},
    {path: 'editar-evento/:id', component:EventoEditComponent},
    {path: 'evento/:id', component:EventoDetailComponent},
    
    {path: 'crear-album/:artist', component:AlbumAddComponent},
    {path: 'editar-album/:id', component:AlbumEditComponent},
    {path: 'album/:id', component:AlbumDetailComponent},
    {path: 'crear-tema/:album', component:SongAddComponent},
    {path: 'editar-tema/:id', component:SongEditComponent},
    {path: 'mis-datos', component:UserEditComponent},
    {path: '**', component:HomeComponent}
];

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
