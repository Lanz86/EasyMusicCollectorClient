import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageAlbum;
  loaded: boolean = false;

  constructor(private route: ActivatedRoute, private albumApi: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.loaded = false;
    this.albumApi.getAlbums().subscribe(res => {
      this.pageAlbum = res;
      this.loaded = true;
    }, err => {
      console.log(err);
    });
  }

  onDelete(album) {
    console.log(album);
    if(confirm(`Vuoi cancellare l'album ${album.name}`)) {
      this.albumApi.deleteAlbum(album.id).subscribe(res => {
        this.loadData();
      });
    }
  }

}
