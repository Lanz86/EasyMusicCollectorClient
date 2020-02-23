import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable, of, throwError  } from 'rxjs';
import { PageResult } from '../models/page-result';
import { catchError, tap, map } from 'rxjs/operators';
import { AlbumOutput } from '../models/album-output';
import { AlbumPageItem } from '../models/album-page-item';
import { ArtistOutput } from '../models/artist-output';
import { GenresOutput } from '../models/genres-output';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private serverUrl;

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {
    this.serverUrl = environment.apiUrl;
  }

  public getAlbums(): Observable<PageResult> {
    return this.http.get<PageResult>(this.serverUrl + '/albums')
      .pipe(
        tap(page => console.log('fetched page')),
        catchError(err => this.handleError('getAlbums', []))
      );
  }

  public getAlbum(id: number): Observable<AlbumOutput> {
    return this.http.get<any>(this.serverUrl + `/albums/${id}/`)
      .pipe(
        tap(page => console.log('fetched album')),
        catchError(err => this.handleError('getAlbum${id}', []))
      );
  }

  public createAlbum(album): Observable<any> {
    const url = `${this.serverUrl}/albums/`;
    return this.http.post(url, album).pipe(
      tap(_ => console.log(`added album`)),
      catchError(this.handleError<any>('createAlbum'))
    );
  }

  public updateAlbum(id, album): Observable<any> {
    const url = `${this.serverUrl}/albums/${id}`;
    return this.http.put(url, album).pipe(
      tap(_ => console.log(`updated album  id=${id}`)),
      catchError(this.handleError<any>('updateAlbum'))
    );
  }

  public deleteAlbum(id): Observable<any> {
    const url = `${this.serverUrl}/albums/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => console.log(`deleted album id=${id}`)),
      catchError(this.handleError<any>('deleteAlbum'))
    );
  }

  public getArtists(): Observable<ArtistOutput[]> {
    return this.http.get<any>(this.serverUrl + `/artists/`)
      .pipe(
        tap(page => console.log('fetched artists')),
        catchError(err => this.handleError('getArtists', []))
      );
  }

  public getGenres(): Observable<GenresOutput[]> {
    return this.http.get<GenresOutput[]>(this.serverUrl + `/genres/`)
    .pipe(
      tap(page => console.log('fetched artists')),
      catchError(err => this.handleError('getArtists', []))
    );
  }
}
