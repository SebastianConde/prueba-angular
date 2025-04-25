import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../services/productos.service';
import { HeaderComponent } from '../header/header.component';

//Importaciones de angular material
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    HeaderComponent
  ],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.scss'
})
export class ProductoDetalleComponent implements OnInit {
  producto: any;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productosService.getProductoPorId(id).subscribe(data => {
        this.producto = data;
      });
    }
  }
}
