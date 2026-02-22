import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { LucideAngularModule, Save, ArrowLeft, Loader } from 'lucide-angular';
import { ClinicHistory } from '../../../interfaces/clinic-history.interface';
import { PatientService } from '../../../core/services/patient.service';
import { Patient } from '../../../interfaces/patient.interface';
import { ClinicHistoryService } from '../../../core/services/clinic-history.service';

@Component({
  selector: 'app-history-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, LucideAngularModule],
  templateUrl: './history-form.component.html',
})
export class HistoryFormComponent implements OnInit {
  form!: FormGroup;
  loading = signal(false);
  error = signal('');
  patient = signal<Patient | null>(null);
  patientId = signal<number>(0);

  readonly Save = Save;
  readonly ArrowLeft = ArrowLeft;
  readonly Loader = Loader;

  constructor(
    private fb: FormBuilder,
    private historyService: ClinicHistoryService,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patientId.set(id);

    this.form = this.fb.group({
      fechaConsulta: [new Date().toISOString().split('T')[0], Validators.required],
      diagnostico: ['', [Validators.required, Validators.maxLength(500)]],
      tratamiento: ['', Validators.maxLength(500)],
      observaciones: ['', Validators.maxLength(1000)],
    });

    this.patientService.getById(id).subscribe({
      next: (data) => this.patient.set(data),
      error: () => this.error.set('Error al cargar el paciente'),
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const clinicHistory: ClinicHistory = {
      ...this.form.value,
      pacienteId: this.patientId(),
    };

    this.loading.set(true);
    this.historyService.create(clinicHistory).subscribe({
      next: () => this.router.navigate(['/pacientes', this.patientId(), 'historias']),
      error: () => {
        this.error.set('Error al guardar la historia clínica');
        this.loading.set(false);
      },
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }
}
