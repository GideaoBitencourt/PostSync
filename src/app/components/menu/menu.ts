import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  mostrarElemento = false;

  mostrar(): void {
    this.mostrarElemento = !this.mostrarElemento;
  }

 //* constructor(private authService: Auth) {} *//

  logout(): void {
    //repassa a ordem para a função logout() que está no auth.ts
    //this.authService.logout(); 
  }
}
