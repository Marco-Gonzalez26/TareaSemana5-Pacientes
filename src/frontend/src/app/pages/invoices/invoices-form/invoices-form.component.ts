import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Save, ArrowLeft } from 'lucide-angular';
import { Patient } from '../../../interfaces/patient.interface';
import { FacturaRequest } from '../../../interfaces/invoice.interface';
import { InvoicesService } from '../../../core/services/invoices.service';
import { PatientService } from '../../../core/services/patient.service';

@Component({
  selector: 'app-facturas-form',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './invoices-form.component.html',
})
export class InvoicesFormComponent implements OnInit {
  readonly Save = Save;
  readonly ArrowLeft = ArrowLeft;

  id = signal<number | null>(null);
  patients = signal<Patient[]>([]);
  error = signal('');

  form = signal<FacturaRequest>({
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '',
    total: 0,
    pacienteId: 0,
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoicesService: InvoicesService,
    private patientsService: PatientService,
  ) {}

  ngOnInit() {
    this.patientsService.getAll().subscribe((data) => this.patients.set(data));

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id.set(+idParam);
      this.invoicesService.getById(+idParam).subscribe((data) => {
        this.form.set({
          fecha: data.fecha.split('T')[0],
          descripcion: data.descripcion,
          total: data.total,
          pacienteId: data.pacienteId,
        });
      });
    }
  }

  updateField(field: keyof FacturaRequest, value: any) {
    this.form.update((f) => ({ ...f, [field]: value }));
  }

  save() {
    this.error.set('');
    const data = this.form();

    if (!data.descripcion || !data.pacienteId || data.total <= 0) {
      this.error.set('Por favor completa todos los campos');
      return;
    }
    const op = this.id()
      ? this.invoicesService.update(this.id()!, data)
      : this.invoicesService.create(data);

    op.subscribe({
      next: () => this.router.navigate(['/facturas']),
      error: () => {
        this.error.set('Error al guardar la factura');
      },
    });
  }

  back() {
    this.router.navigate(['/facturas']);
  }
}
