import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private serverUrl = 'http://localhost:8000';
  constructor(private httpClient: HttpClient) { }

  public getAlbums() {
    return this.httpClient.get(this.serverUrl + '/albums');
  }
}
