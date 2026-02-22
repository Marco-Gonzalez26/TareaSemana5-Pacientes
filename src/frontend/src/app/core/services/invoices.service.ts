import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura, FacturaRequest } from '../../interfaces/invoice.interface';

@Injectable({ providedIn: 'root' })
export class InvoicesService {
  private url = 'https://localhost:7000/api/facturas';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Factura[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Factura>(`${this.url}/${id}`);
  }

  create(invoice: FacturaRequest) {
    return this.http.post<Factura>(this.url, invoice);
  }

  update(id: number, invoice: FacturaRequest) {
    return this.http.put(`${this.url}/${id}`, { id, ...invoice });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
