import { Patient } from './../../interfaces/patient.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'https://localhost:7000/api/pacientes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  create(Patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, Patient);
  }

  update(id: number, Patient: Patient): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, Patient);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
