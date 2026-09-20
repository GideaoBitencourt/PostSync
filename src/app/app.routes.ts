import { Routes } from '@angular/router';
import { PostSync } from './pages/post-sync/post-sync';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';

export const routes: Routes = [
    {path: "", redirectTo:"post-sync", pathMatch:"full"},
    {path: "post-sync", component: PostSync},
    {path: "login", component: Login},
    {path: "cadastro", component: Cadastro}
];
