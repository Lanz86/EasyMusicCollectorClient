import { Component, OnInit } from '@angular/core';
import { AlbumOutput } from '../models/album-output';
import { ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, FormArray } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ArtistOutput } from '../models/artist-output';
import { forkJoin } from 'rxjs';
import { AlbumInput } from '../models/album-input';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent implements OnInit {

  album: AlbumOutput;

  albumForm = new FormGroup({
    name: new FormControl(''),
    artists: new FormArray([]),
  });

  artists: ArtistOutput[];

  constructor(private route: ActivatedRoute, private albumApi: ApiService) { }

  ngOnInit(): void {
    let albumsPromise = this.albumApi.getAlbum(this.route.snapshot.params.id);
    let artistsPromise = this.albumApi.getArtists();

    forkJoin([albumsPromise, artistsPromise]).subscribe(results => {
      console.log(results[0]);
      this.album = results[0];
      this.artists = results[1];

      console.log(this.artists);

      this.createArtists();
    });
    /*.subscribe(res => {

    }, err => {
      console.log(err);
    });*/
  }

  onSubmit() {
    console.log(this.albumForm.value);
    let selectedArtists = this.albumForm.value.artists.map((val, key) => {
      if(val) {
        return (this.album.artists[key] as any).id;
      }
    }).filter(function(val) {
      return val !== undefined;
    });

    const albumToSave = {
      name: this.albumForm.value.name,
      artists: selectedArtists,
	    year: 2019,
	    generes: [],
	    type: 1,
	    support: 0
    } as AlbumInput;
    //albumToSave.name = this.albumForm.name;
    //albumToSave.

    this.albumApi.updateAlbum(this.route.snapshot.params.id, albumToSave).subscribe(res => {
      console.log("Saved");
    });

    console.log(selectedArtists);
  }

  createArtists() {
    const arrayTest = [];

    const selectedArray = this.album.artists.map(c  => {
      return (c as any).id;
    });

    this.artists.forEach(element => {
      (this.albumForm.controls.artists as FormArray).push(new FormControl(selectedArray.includes(element.id)));
    });
  }

}
