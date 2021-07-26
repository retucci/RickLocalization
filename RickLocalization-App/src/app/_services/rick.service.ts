import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rick } from '../_models/Rick';

@Injectable({
  providedIn: 'root'
})
export class RickService {

constructor(private http: HttpClient) { }

  baseURL = environment.apiURL + 'api/rick';

  getRicks(pageNumber: number, pageSize: number): Observable<Rick[]> {
      return this.http.get<Rick[]>(`${this.baseURL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getRicksById(id: number): Observable<Rick> {
    return this.http.get<Rick>(`${this.baseURL}/${id}`);
  }

  postRick(rick: Rick) {
    return this.http.post(this.baseURL, rick);
  }

  postUpload(rickId: number, file: File) {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);
    return this.http.post(`${this.baseURL}/upload-image/${rickId}`, formData);
  }

  putRick(rick: Rick) {
    return this.http.put(`${this.baseURL}/${rick.id}`, rick);
  }

  deleteRick(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
