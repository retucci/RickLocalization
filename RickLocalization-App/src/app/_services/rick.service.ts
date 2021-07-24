import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rick } from '../_models/Rick';

@Injectable({
  providedIn: 'root'
})
export class RickService {

constructor(private http: HttpClient) { }

  baseURL = 'http://localhost:5000/api/rick';

  getRicks(): Observable<Rick[]> {
      return this.http.get<Rick[]>(this.baseURL);
  }

  getRicksById(id: number): Observable<Rick> {
    return this.http.get<Rick>(`${this.baseURL}/${id}`);
  }

  postRick(rick: Rick) {
    return this.http.post(this.baseURL, rick);
  }

  putRick(rick: Rick) {
    return this.http.put(`${this.baseURL}/${rick.id}`, rick);
  }

  deleteRick(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
