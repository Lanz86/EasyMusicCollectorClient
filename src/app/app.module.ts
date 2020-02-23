import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';
import { LoaderComponent } from './loader/loader.component';
import { AlbumCreateComponent } from './album-create/album-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumEditComponent,
    LoaderComponent,
    AlbumCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
