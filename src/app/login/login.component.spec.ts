import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el HttpClientTestingModule
import { RegisterService } from '../services/register.service'; // Si lo necesitas en la prueba

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule, // Asegúrate de incluir esto
        LoginComponent
      ],
      providers: [FormBuilder, RegisterService], // Proporciona el servicio si es necesario
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería marcar el formulario como inválido cuando el email es incorrecto', () => {
    const emailControl = component.loginForm.get('email');
    
    emailControl?.setValue('emailinvalido');
    expect(emailControl?.valid).toBeFalse();
    expect(emailControl?.hasError('email')).toBeTrue();
    
    emailControl?.setValue('email@valido.com');
    expect(emailControl?.valid).toBeTrue();
  });
});
