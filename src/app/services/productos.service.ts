import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  // URL en despliegue
  private apiUrl = 'https://mockapi-6q8y.onrender.com/productos';

  // URL en local
  //private apiUrl = 'http://localhost:3000/productos';  // URL de la mock API para usuarios

  constructor(private http: HttpClient) { }

  // Método para ontener la lista de productos
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  } 

  getProductoPorId(id: string) {
    return this.http.get<any>(`http://localhost:3000/productos/${id}`);
  }  
}
