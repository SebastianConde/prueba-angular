import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private apiUrl = 'http://localhost:3000/paises';  

  constructor(private http: HttpClient) { }

  // Método para obtener los países
  getPaises(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
