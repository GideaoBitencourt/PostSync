import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  loginForm: FormGroup;
  showPassword = false;
  isSubmitting = false;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get senha() {
    return this.loginForm.get('senha');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.loginError = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { email, senha } = this.loginForm.value;

    const role = this.authService.login(email, senha);

    this.isSubmitting = false;

    if (!role) {
      this.loginError = 'Email ou senha incorretos.';
      return;
    }

    this.router.navigate(['/' + role]);
  }

  goToRegister(): void {
    this.router.navigate(['/cadastro']);
  }
}