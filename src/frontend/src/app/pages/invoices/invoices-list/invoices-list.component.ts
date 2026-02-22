import { Factura } from './../../../interfaces/invoice.interface';
import { ConfirmModalComponent } from './../../../shared/components/confirm-modal/confirm-modal.component';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, Plus, Pencil, Trash2, FileText } from 'lucide-angular';
import { DatePipe } from '@angular/common';
import { InvoicesService } from '../../../core/services/invoices.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-facturas-list',
  standalone: true,
  imports: [LucideAngularModule, DatePipe, ConfirmModalComponent],
  templateUrl: './invoices-list.component.html',
})
export class InvoicesListComponent implements OnInit {
  readonly Plus = Plus;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;

  readonly FileText = FileText;

  invoices = signal<Factura[]>([]);
  modalVisible = signal(false);
  invoiceToDelete = signal<number | null>(null);

  constructor(
    private service: InvoicesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.service.getAll().subscribe((data) => this.invoices.set(data));
  }

  new() {
    this.router.navigate(['/facturas/nueva']);
  }

  edit(id: number) {
    this.router.navigate([`/facturas/editar/${id}`]);
  }

  confirmDelete(id: number) {
    this.invoiceToDelete.set(id);
    this.modalVisible.set(true);
  }

  delete() {
    const id = this.invoiceToDelete();
    if (id) {
      this.service.delete(id).subscribe(() => {
        this.modalVisible.set(false);
        this.invoiceToDelete.set(null);
        this.loadInvoices();
      });
    }
  }

  cancel() {
    this.modalVisible.set(false);
    this.invoiceToDelete.set(null);
  }

  generatePDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235);
    doc.text('Medicore - Reporte de Facturas', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generado el: ${new Date().toLocaleDateString('es-EC')}`, 14, 28);

    autoTable(doc, {
      startY: 35,
      head: [['#', 'Paciente', 'Descripción', 'Fecha', 'Total']],
      body: this.invoices().map((f) => [
        f.id,
        `${f.paciente?.nombre} ${f.paciente?.apellido}`,
        f.descripcion,
        new Date(f.fecha).toLocaleDateString('es-EC'),
        `$${f.total.toFixed(2)}`,
      ]),
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [239, 246, 255],
      },
      styles: {
        fontSize: 10,
      },
    });

    const total = this.invoices().reduce((acc, f) => acc + f.total, 0);
    const finalY = (doc as any).lastAutoTable.finalY + 8;
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text(`Total general: $${total.toFixed(2)}`, 14, finalY);

    doc.save('facturas-medicore.pdf');
  }
}
