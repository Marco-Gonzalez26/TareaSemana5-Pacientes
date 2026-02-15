export interface ClinicHistory {
  id?: number;
  fechaConsulta: string;
  diagnostico: string;
  tratamiento?: string;
  observaciones?: string;
  pacienteId: number;
}
