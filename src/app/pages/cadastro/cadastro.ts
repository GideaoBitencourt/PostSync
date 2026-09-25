import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth';

function senhasIguaisValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { senhasDiferentes: true };
  };
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class Cadastro {

  cadastroForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;
  cadastroError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.cadastroForm = this.fb.group(
      {
        nome: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required]]
      },
      { validators: senhasIguaisValidator() }
    );
  }

  get nome() {
    return this.cadastroForm.get('nome');
  }

  get email() {
    return this.cadastroForm.get('email');
  }

  get senha() {
    return this.cadastroForm.get('senha');
  }

  get confirmarSenha() {
    return this.cadastroForm.get('confirmarSenha');
  }

  get senhasDiferentes(): boolean {
    return this.cadastroForm.hasError('senhasDiferentes') && !!this.confirmarSenha?.touched;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.cadastroError = null;

    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { nome, email, senha } = this.cadastroForm.value;

    const role = this.authService.register(nome, email, senha);

    this.isSubmitting = false;

    if (!role) {
      this.cadastroError = 'Não foi possível criar sua conta. Tente novamente.';
      return;
    }

    this.router.navigate(['/' + role]);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}