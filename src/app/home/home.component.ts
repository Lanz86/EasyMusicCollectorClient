import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  albums = [];

  constructor(private albumApi: AlbumService) { }

  ngOnInit(): void {
    this.albumApi.getAlbums().subscribe((data: any[]) => {
      console.log(data);
      this.albums = data;
    });
  }

}
