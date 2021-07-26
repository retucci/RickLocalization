import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dimension } from '../_models/Dimension';

@Injectable({
  providedIn: 'root'
})
export class DimensionService {

constructor(private http: HttpClient) { }

  baseURL = environment.apiURL + 'api/dimension';

  postDimension(dimension: Dimension) {
    return this.http.post(this.baseURL, dimension);
  }

  getDimensionsByRickId(rickId: number): Observable<Dimension> {
    return this.http.get<Dimension>(`${this.baseURL}/getByRickId/${rickId}`);
  }
}
