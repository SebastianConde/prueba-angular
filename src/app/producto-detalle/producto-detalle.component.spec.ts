import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoDetalleComponent } from './producto-detalle.component';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

describe('ProductoDetalleComponent', () => {
  let component: ProductoDetalleComponent;
  let fixture: ComponentFixture<ProductoDetalleComponent>;
  let productosServiceSpy: jasmine.SpyObj<ProductosService>;
  let activatedRouteMock: any;

  const mockProducto = {
    id: '1',
    nombre: 'Producto Test',
    precio: 100,
    descripcion: 'Descripción del producto de prueba',
    categoria: 'Categoría Test',
    imagen: 'url-imagen-test'
  };

  beforeEach(async () => {
    // Crear espía para el servicio de productos
    productosServiceSpy = jasmine.createSpyObj('ProductosService', ['getProductoPorId']);
    
    // Configurar el mock de ActivatedRoute
    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        ProductoDetalleComponent
      ],
      providers: [
        { provide: ProductosService, useValue: productosServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Para ignorar errores de componentes hijo no declarados
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoDetalleComponent);
    component = fixture.componentInstance;
  });

  it('debería cargar los detalles del producto cuando se inicializa', () => {
    productosServiceSpy.getProductoPorId.and.returnValue(of(mockProducto));
    fixture.detectChanges();
    
    expect(component.producto).toEqual(mockProducto);
  });
});
