import { Component, OnInit } from '@angular/core';
import { AlbumOutput } from '../models/album-output';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormControl, FormArray } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ArtistOutput } from '../models/artist-output';
import { forkJoin } from 'rxjs';
import { AlbumInput } from '../models/album-input';
import { GenresOutput } from '../models/genres-output';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent implements OnInit {

  album: AlbumOutput;

  albumForm = new FormGroup({
    name: new FormControl(''),
    year: new FormControl(),
    genres: new FormControl([]),
    type: new FormControl(''),
    support: new FormControl(''),
    artists: new FormControl([])
  });

  artists: ArtistOutput[];
  genres: GenresOutput[];
  types: any = [{value: 1,  name: 'Album'}, {value: 2, name: 'Singolo'}];
  supports: any = [{value: 1,  name: 'CD'}, {value: 2, name: 'Vinile'}, {value: 3, name: 'Musicassetta'}, {value: 4, name: 'Digitale'}];
  loaded: boolean = false;


  constructor(private route: ActivatedRoute, private router: Router, private albumApi: ApiService) { }

  ngOnInit(): void {
    const albumsPromise = this.albumApi.getAlbum(this.route.snapshot.params.id);
    const artistsPromise = this.albumApi.getArtists();
    const genresPromise = this.albumApi.getGenres();

    forkJoin([albumsPromise, artistsPromise, genresPromise]).subscribe(results => {
      console.log(results[0]);
      this.album = results[0];
      this.artists = results[1];
      this.genres = results[2];

      this.albumForm.get('genres').setValue(this.genres.filter(val => {
        return this.album.genres.filter(x => {
          return (x as any).id === val.id;
        }).length > 0;
      }));

      this.albumForm.get('artists').setValue(this.artists.filter(val => {
        return this.album.artists.filter(x => {
          return (x as any).id === val.id;
        }).length > 0;
      }));

      this.albumForm.get('type').setValue(this.types.filter(val => {
        return val.value === this.album.type;
      })[0]);

      this.albumForm.get('support').setValue(this.supports.filter(val => {
        return val.value === this.album.type;
      })[0]);

      this.loaded = true;
    });
  }

  onSubmit() {
    const selectedArtists = this.albumForm.value.artists.map((selected, i) => {
      return selected.id;
    });

    const selectedGenres = this.albumForm.value.genres.map((selected, i) => {
      return selected.id;
    });

    const albumToSave = {
      name: this.albumForm.value.name,
      artists: selectedArtists,
      year: this.albumForm.value.year,
      generes: selectedGenres,
      type: this.albumForm.value.type.value,
      support: this.albumForm.value.support.value
    } as AlbumInput;



    this.albumApi.updateAlbum(this.route.snapshot.params.id, albumToSave).subscribe(res => {
      this.router.navigate(['/home']);
    });
  }

}
