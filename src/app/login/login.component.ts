import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  showPassword = false;

  constructor(private formBuilder: FormBuilder, 
              private snackBar: MatSnackBar, 
              private registerService: RegisterService,
              private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      this.registerService.getUsuarios().subscribe(usuarios => {
        const user = usuarios.find(u => u.email === email && u.password === password);
  
        if (user) {
          // Simulamos un "token"
          localStorage.setItem('token', btoa(`${email}:${password}`)); 
          localStorage.setItem('usuario', JSON.stringify(user));
          
          // Mostrar mensaje de éxito
          this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 1000 });

          // Redirige a la página de dashboard luego de 1 segundo para que el usuario vea el mensaje de exito
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000); 
        } else {
          this.snackBar.open('El usuario no existe', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Por favor completa el formulario correctamente', 'Cerrar', { duration: 3000 });
    }
  }
}
