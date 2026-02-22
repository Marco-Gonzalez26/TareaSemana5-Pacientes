import { Patient } from './patient.interface';

export interface Factura {
  id: number;
  fecha: string;
  descripcion: string;
  total: number;
  pacienteId: number;
  paciente?: Patient;
}

export interface FacturaRequest {
  fecha: string;
  descripcion: string;
  total: number;
  pacienteId: number;
}
