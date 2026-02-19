export interface LoginRequest {
  email: string;
  contrasenia: string;
}

export interface LoginResponse {
  message: string;
  usuario: {
    nombre: string;
    email: string;
    id: number;
    contrasenia: string;
  };
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  contrasenia: string;
}
