import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Mail, Lock, LogIn, UserPlus, User } from 'lucide-angular';
import { AuthService } from './../../core/services/auth.service';
import { LoginResponse } from './../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  readonly Mail = Mail;
  readonly Lock = Lock;
  readonly LogIn = LogIn;
  readonly UserPlus = UserPlus;
  readonly User = User;

  activeTab = signal<'login' | 'register'>('login');

  email = signal('');
  password = signal('');
  loginError = signal('');

  signupUserName = signal('');
  registerEmail = signal('');
  registerPassword = signal('');
  confirmPassword = signal('');
  registerError = signal('');
  registerSuccess = signal('');

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  login() {
    this.loginError.set('');
    this.auth.login(this.email(), this.password()).subscribe({
      next: (res: LoginResponse) => {
        this.auth.saveSession(res.usuario.nombre);
        this.router.navigate(['/pacientes']);
      },
      error: () => {
        this.loginError.set('Credenciales incorrectas');
      },
    });
  }

  signUp() {
    this.registerError.set('');
    this.registerSuccess.set('');

    if (this.registerPassword() !== this.confirmPassword()) {
      this.registerError.set('Las contraseñas no coinciden');
      return;
    }

    this.auth
      .signUp(this.signupUserName(), this.registerEmail(), this.registerPassword())
      .subscribe({
        next: () => {
          this.registerSuccess.set('Usuario registrado correctamente');
          this.signupUserName.set('');
          this.registerEmail.set('');
          this.registerPassword.set('');
          this.confirmPassword.set('');
          setTimeout(() => this.activeTab.set('login'), 1500);
        },
        error: (err) => {
          this.registerError.set(err.error?.mensaje || 'Error al registrarse');
        },
      });
  }
}
