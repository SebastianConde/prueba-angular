import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Component } from '@angular/core';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('debe renderizar el título correctamente', () => {
    component.titulo = 'Título de prueba';
    fixture.detectChanges(); // Detectar cambios para que Angular actualice la vista

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Título de prueba');
  });
});
