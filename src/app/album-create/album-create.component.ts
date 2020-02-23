import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { GenresOutput } from '../models/genres-output';
import { ArtistOutput } from '../models/artist-output';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { forkJoin } from 'rxjs';
import { AlbumInput } from '../models/album-input';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit {

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

  constructor(private route: ActivatedRoute, private router: Router, private albumApi: ApiService) { }

  ngOnInit(): void {
    const artistsPromise = this.albumApi.getArtists();
    const genresPromise = this.albumApi.getGenres();

    forkJoin([artistsPromise, genresPromise]).subscribe(results => {
      this.artists = results[0];
      this.genres = results[1];
    });

  }

  onSubmit() {
    console.log(this.albumForm.value);

    const selectedArtist = this.albumForm.get('artists').value.map(c => {
      return (c as ArtistOutput).id;
    });

    const selectedGenres = this.albumForm.get('genres').value.map(c => {
      return (c as GenresOutput).id;
    });

    console.log(selectedArtist);

    const albumToAdd = {
      name: this.albumForm.controls.name.value,
      artists: selectedArtist,
      year: this.albumForm.controls.year.value,
      generes: selectedGenres,
      type: this.albumForm.controls.type.value.value,
      support: this.albumForm.controls.support.value.value,
    } as AlbumInput;

    this.albumApi.createAlbum(albumToAdd).subscribe(res => {
      this.router.navigate(['/home']);
    });

  }
}
