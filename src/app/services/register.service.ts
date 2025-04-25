import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  // URL en despliegue
  private apiUrl = 'https://mockapi-6q8y.onrender.com/usuarios';  

  // URL en local
  //private apiUrl = 'http://localhost:3000/usuarios';  // URL de la mock API para usuarios

  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo usuario
  registerUsuario(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }

  // Método para obtener todos los usuarios 
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
