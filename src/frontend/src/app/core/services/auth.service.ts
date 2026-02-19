import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginRequest, LoginResponse, RegisterRequest } from '../../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = 'https://localhost:7000/api/usuarios';

  userName = signal<string>(localStorage.getItem('userName') || '');

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const body: LoginRequest = { email, contrasenia: password };
    return this.http.post<LoginResponse>(`${this.url}/login`, body);
  }

  signUp(name: string, email: string, password: string) {
    const body: RegisterRequest = { nombre: name, email, contrasenia: password };
    return this.http.post<any>(`${this.url}/sign-up`, body);
  }

  saveSession(name: string) {
    localStorage.setItem('userName', name);
    this.userName.set(name);
  }

  getUserName() {
    return this.userName();
  }

  logout() {
    localStorage.removeItem('userName');
    this.userName.set('');
  }

  isLoggedIn() {
    return !!this.userName();
  }
}
