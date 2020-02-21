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

  constructor(private route: ActivatedRoute, private albumApi: ApiService) { }

  ngOnInit(): void {
    this.albumApi.getAlbums().subscribe(res => {
      this.pageAlbum = res;
      console.log(this.pageAlbum);
    }, err => {
      console.log(err);
    });
  }

}
