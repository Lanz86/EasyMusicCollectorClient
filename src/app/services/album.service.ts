import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable, of, throwError  } from 'rxjs';
import { PageResult } from '../models/page-result';
import { catchError, tap, map } from 'rxjs/operators';
import { AlbumOutput } from '../models/album-output';
import { AlbumPageItem } from '../models/album-page-item';
@Injectable({
  providedIn: 'root'
})
export class AlbumService {

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

  public getAlbums(): Observable<AlbumPageItem> {
    return this.http.get<any>(this.serverUrl + '/albums')
      .pipe(
        tap(page => console.log('fetched page')),
        catchError(this.handleError('getAlbums', []))
      );
  }

  public getAlbum(id: number): Observable<AlbumOutput> {
    console.log(id);
    return this.http.get<any>(this.serverUrl + `/albums/${id}/`)
      .pipe(
        tap(page => console.log('fetched album')),
        catchError(this.handleError('getAlbum${id}', []))
      );
  }
}
