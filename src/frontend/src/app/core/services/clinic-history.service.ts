import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClinicHistory } from './../../interfaces/clinic-history.interface';

@Injectable({
  providedIn: 'root',
})
export class ClinicHistoryService {
  private apiUrl = 'https://localhost:7000/api/historiasclinicas';

  constructor(private http: HttpClient) {}

  getByPatient(patientId: number): Observable<ClinicHistory[]> {
    return this.http.get<ClinicHistory[]>(`${this.apiUrl}/paciente/${patientId}`);
  }

  create(clinicHistory: ClinicHistory): Observable<ClinicHistory> {
    return this.http.post<ClinicHistory>(this.apiUrl, clinicHistory);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
