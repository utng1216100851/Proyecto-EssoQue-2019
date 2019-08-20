import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http' 
import {routing, appRoutingProviders} from './app.routing';

//GENERAL
import { AppComponent } from './app.component';
import {HomeComponent} from './components/home/home.component';
//USER
import {UserEditComponent} from '../app/components/user-edit/user-edit.component';
//ARTIST
import {ArtistListComponent} from '../app/components/artist-list/artist-list.component';
import {ArtistAddComponent} from '../app/components/artist-add/artist-add.component';
import {ArtistEditComponent} from '../app/components/artist-edit/artist-edit.component';
import {ArtistDetailComponent} from '../app/components/artist-detail/artist-detail.component';
//ALBUM
import {AlbumAddComponent} from '../app/components/album-add/album-add.component';
import {AlbumEditComponent} from '../app/components/album-edit/album-edit.component';
import {AlbumDetailComponent} from '../app/components/album-detail//album-detail.component';
//SONG
import {SongAddComponent} from '../app/components/song-add/song-add.component';
import {SongEditComponent} from '../app/components/song-edit/song-edit.component';
import {PlayerComponent} from '../app/components/player/player.component';
//Productos
import { ProductoAddComponent } from './components/producto-add/producto-add.component';
import { ProductoDetailComponent } from './components/producto-detail/producto-detail.component';
import { ProductoEditComponent } from './components/producto-edit/producto-edit.component';
import { ProductoListComponent } from './components/producto-list/producto-list.component';
//Informacion
import { InfoComponent } from './components/info/info.component';
//Eventos
import { EventoAddComponent } from './components/evento-add/evento-add.component';
import { EventoDetailComponent } from './components/evento-detail/evento-detail.component';
import { EventoEditComponent } from './components/evento-edit/evento-edit.component';
import { EventoListComponent } from './components/evento-list/evento-list.component';








@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    HomeComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    AlbumDetailComponent,
    SongAddComponent,
    SongEditComponent,
    PlayerComponent,
    ProductoAddComponent,
    ProductoDetailComponent,
    ProductoEditComponent,
    ProductoListComponent,
    InfoComponent,
    EventoAddComponent,
    EventoDetailComponent,
    EventoEditComponent,
    EventoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
