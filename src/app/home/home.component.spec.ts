import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ProductosService } from '../services/productos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productosServiceSpy: jasmine.SpyObj<ProductosService>;

  const mockProductos = [
    { id: 1, nombre: 'Producto 1', precio: 100, categoria: 'Categoría 1', imagen: 'url1' },
    { id: 2, nombre: 'Producto 2', precio: 200, categoria: 'Categoría 2', imagen: 'url2' },
    { id: 3, nombre: 'Producto test', precio: 50, categoria: 'Categoría 1', imagen: 'url3' },
  ];

  beforeEach(async () => {
    productosServiceSpy = jasmine.createSpyObj('ProductosService', ['getProductos']);
    productosServiceSpy.getProductos.and.returnValue(of(mockProductos));

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        HomeComponent
      ],
      providers: [
        { provide: ProductosService, useValue: productosServiceSpy },
        { provide: MatSnackBar, useValue: jasmine.createSpyObj('MatSnackBar', ['open']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería filtrar productos por nombre correctamente', () => {
    component.textoBusqueda = 'test';
    component.filtrarPorNombre('test');
    
    expect(component.productosFiltrados.length).toBe(1);
    expect(component.productosFiltrados[0].nombre).toContain('test');
    expect(component.mensajeNoResultados).toBe('');
  });
});
