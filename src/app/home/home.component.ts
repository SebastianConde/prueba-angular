import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgFor } from '@angular/common';
import { ProductosService } from '../services/productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//Importaciones de angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    CommonModule,
    HeaderComponent,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatInputModule,
    MatLabel,
    MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  textoBusqueda: string = '';
  mensajeNoResultados: string = ''; 
  ordenAscendente: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;


  constructor(private productosService: ProductosService, 
              private snackBar: MatSnackBar,
              private router: Router) {
    this.productosService.getProductos().subscribe((data: any[]) => {
      this.productos = data;
      this.productosFiltrados = data; // Copia inicial

      // Calcular totalPages después de cargar los productos
      this.totalPages = Math.ceil(this.productosFiltrados.length / this.itemsPerPage);
    }, error => {
      console.error('Error al obtener los productos', error);
      this.snackBar.open('Error al cargar los productos', 'Cerrar', { duration: 3000 });
    });    
  }

  filtrarPorNombre(nombre: string) {
    const nombreMin = nombre.toLowerCase();
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(nombreMin)
    );

    // Actualizar el mensaje si no hay resultados
    if (this.productosFiltrados.length === 0) {
      this.mensajeNoResultados = 'No se encontraron productos que coincidan con la búsqueda.';
    } else {
      this.mensajeNoResultados = ''; // Limpiar el mensaje si hay resultados
    }

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.productosFiltrados.length / this.itemsPerPage);
  }

  ordenarPorPrecio() {
    this.productosFiltrados.sort((a, b) =>
      this.ordenAscendente ? a.precio - b.precio : b.precio - a.precio
    );
    this.ordenAscendente = !this.ordenAscendente;

    // Recalcular totalPages después de ordenar los productos
    this.totalPages = Math.ceil(this.productosFiltrados.length / this.itemsPerPage);
  }

  verDetalle(id: number) {
    this.router.navigate(['/producto', id]);
  }

  get productosPaginados() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.productosFiltrados.slice(start, start + this.itemsPerPage);
  }

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPages) {
      this.currentPage = pagina;
    }
  }
}
