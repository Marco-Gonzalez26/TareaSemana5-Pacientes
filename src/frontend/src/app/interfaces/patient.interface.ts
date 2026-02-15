import { ClinicHistory } from './clinic-history.interface';

export interface Patient {
  id?: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  cedula: string;
  telefono?: string;

  direccion?: string;

  historiiasClinicas?: ClinicHistory[];
}
