import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'registro', pathMatch: 'full' }, 
    { path: 'registro', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
    { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    { path: 'producto/:id', loadComponent: () => import('./producto-detalle/producto-detalle.component').then(m => m.ProductoDetalleComponent)},
];
