import { Injectable } from '@angular/core';

export type UserRole = 'frentista' | 'cliente';

interface StoredUser {
  nome: string;
  email: string;
  senha: string;
  role: UserRole;
}

interface Session {
  nome: string;
  email: string;
  role: UserRole;
}

const STORAGE_KEY = 'postsync_session';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // "Banco de usuários" simulado — sem backend.
  // Troque por uma chamada HTTP real quando a API existir.
  private users: StoredUser[] = [
    { nome: 'Frentista', email: 'frentista@gmail.com', senha: '123456', role: 'frentista' },
    { nome: 'Marcelo', email: 'marcelo@gmail.com', senha: '123456', role: 'cliente' }
  ];

  private session: Session | null = this.restoreSession();

  get isLoggedIn(): boolean {
    return this.session !== null;
  }

  get currentRole(): UserRole | null {
    return this.session?.role ?? null;
  }

  get currentUser(): Session | null {
    return this.session;
  }

  /**
   * Tenta autenticar. Retorna o papel (role) do usuário em caso de sucesso,
   * ou null se email/senha não conferem.
   */
  login(email: string, senha: string): UserRole | null {
    const user = this.users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.senha === senha
    );

    if (!user) return null;

    this.setSession({ nome: user.nome, email: user.email, role: user.role });
    return user.role;
  }

  /**
   * Cria um novo usuário (sempre como "cliente") e já efetua o login.
   * Se o email já existir, apenas tenta autenticar com a senha informada.
   */
  register(nome: string, email: string, senha: string): UserRole | null {
    const jaExiste = this.users.some(u => u.email.toLowerCase() === email.trim().toLowerCase());

    if (!jaExiste) {
      this.users.push({ nome, email: email.trim(), senha, role: 'cliente' });
    }

    return this.login(email, senha);
  }

  logout(): void {
    this.session = null;
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }

  private setSession(session: Session): void {
    this.session = session;
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
  }

  private restoreSession(): Session | null {
    if (typeof sessionStorage === 'undefined') return null;

    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as Session;
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }
}