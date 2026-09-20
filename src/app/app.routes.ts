import { Routes } from '@angular/router';
import { PostSync } from './pages/post-sync/post-sync';

export const routes: Routes = [
    {path: "", redirectTo:"post-sync", pathMatch:"full"},
    {path: "post-sync", component: PostSync}
];
