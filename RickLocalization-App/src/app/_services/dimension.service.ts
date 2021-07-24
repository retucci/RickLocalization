import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dimension } from '../_models/Dimension';

@Injectable({
  providedIn: 'root'
})
export class DimensionService {

constructor(private http: HttpClient) { }

  baseURL = 'http://localhost:5000/api/dimension';

  postDimension(dimension: Dimension) {
    return this.http.post(this.baseURL, dimension);
  }
}
