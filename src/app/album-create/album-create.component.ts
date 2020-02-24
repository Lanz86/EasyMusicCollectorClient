import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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
    name: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    genres: new FormControl([], [Validators.required]),
    type: new FormControl('', [Validators.required]),
    support: new FormControl('', [Validators.required]),
    artists: new FormControl([], [Validators.required])
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

    if (this.albumForm.invalid)  {
      return;
    }

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

  onClickCancel() {
    this.router.navigate(['/home']);
  }

  get year() {
    return this.albumForm.get('year');
  }

  get name() {
    return this.albumForm.get('name');
  }

  get artistsElement() {
    return this.albumForm.get('artists');
  }

  get genresElement() {
    return this.albumForm.get('genres');
  }

  get typeElement() {
    return this.albumForm.get('type');
  }

  get supportElement() {
    return this.albumForm.get('support');
  }
}
