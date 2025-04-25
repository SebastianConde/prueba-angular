import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaisService } from '../services/pais.service';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

//Importaciones de angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    HeaderComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  // Variables útiles para el formulario
  paises: any[] = []; 
  showPassword = false;
  hoy = new Date();
  diezAniosAtras = new Date(this.hoy.getFullYear() - 10, this.hoy.getMonth(), this.hoy.getDate());
  maxDate = this.diezAniosAtras.toISOString().split('T')[0];


  constructor(private formBuilder: FormBuilder, private paisService: PaisService, 
              private registerService: RegisterService, private snackBar: MatSnackBar,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/)]],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      intereses: this.formBuilder.group({
        entretenimiento: [false],
        tecnologia: [false],
        naturaleza: [false],
        cultura: [false],
        deportes: [false],
      }, { validators: this.unInteresSeleccionado.bind(this) }),      
      pais: ['', Validators.required],
    }, { validators: this.passwordMatchValidator })
  }

  //Validador para comparar contraseñas
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  
    return password && confirmPassword && password !== confirmPassword 
      ? { passwordMismatch: true } 
      : null;
  }

  //Validador para al menos un interes seleccionado
  unInteresSeleccionado(control: AbstractControl): ValidationErrors | null {
    const intereses = control.value;
    const algunoSeleccionado = Object.values(intereses).some(v => v === true);
    return algunoSeleccionado ? null : { unInteresSeleccionado: true };
  }  
  
  //Método para obtener los países
  ngOnInit(): void {
    this.paisService.getPaises().subscribe((data) => {
      console.log('Paises desde la API mock:', data);
      this.paises = data;
    });
  }  

  onSubmit(): void {
    const userData = this.registerForm.value;
    if (this.registerForm.valid) {
      // Registrar al usuario llamando al servicio
      this.registerService.registerUsuario(userData).subscribe(
        (response) => {
          console.log('Registro exitoso', response);
          this.registerForm.reset();

          // Mostrar alerta de éxito
          this.snackBar.open('¡Registro exitoso!', 'Cerrar', {
            duration: 3000, 
            panelClass: ['snackbar-success']
          });
        },
        (error) => {
          console.error('Error al registrar usuario', error);

          // Mostrar alerta de error
          this.snackBar.open('Error al registrar. Intenta de nuevo.', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      );
    } else {
      console.log('Formulario inválido', this.registerForm.errors);    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}
