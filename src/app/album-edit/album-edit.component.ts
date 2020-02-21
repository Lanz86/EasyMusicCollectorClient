import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../services/album.service';
import { AlbumOutput } from '../models/album-output';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent implements OnInit {

  album: AlbumOutput;

  constructor(private route: ActivatedRoute, private albumApi: AlbumService) { }

  ngOnInit(): void {
    this.albumApi.getAlbum(this.route.snapshot.params.id).subscribe(res => {
      this.album = res;
      console.log(this.album);
    }, err => {
      console.log(err);
    });
  }

}
