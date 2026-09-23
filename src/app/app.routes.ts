import { Routes } from '@angular/router';
import { PostSync } from './pages/post-sync/post-sync';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Frentista } from './pages/frentista/frentista';
import { Cliente } from './pages/cliente/cliente';

export const routes: Routes = [
    {path: "", redirectTo:"post-sync", pathMatch:"full"},
    {path: "post-sync", component: PostSync},
    {path: "login", component: Login},
    {path: "cadastro", component: Cadastro},
    {path: "frentista", component: Frentista},
    {path: "cliente", component: Cliente}
];
