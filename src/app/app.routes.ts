import { Routes } from '@angular/router';
import { PostSync } from './pages/post-sync/post-sync';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Frentista } from './pages/frentista/frentista';
import { Cliente } from './pages/cliente/cliente';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
    {path: "", redirectTo:"post-sync", pathMatch:"full"},
    {path: "post-sync", component: PostSync},
    {path: "login", component: Login},
    {path: "cadastro", component: Cadastro},
    {path: "frentista", component: Frentista, canActivate: [authGuard], data: {role: 'frentista'}},
    {path: "cliente", component: Cliente, canActivate: [authGuard], data: {role: 'cliente' }}
];
