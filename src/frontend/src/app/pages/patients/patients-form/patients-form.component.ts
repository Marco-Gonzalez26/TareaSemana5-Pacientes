import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { LucideAngularModule, Save, ArrowLeft, Loader } from 'lucide-angular';

import { Patient } from '../../../interfaces/patient.interface';
import { PatientService } from '../../../core/services/patient.service';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, LucideAngularModule],
  templateUrl: './patients-form.component.html',
})
export class PatientFormComponent implements OnInit {
  form!: FormGroup;
  loading = signal(false);
  error = signal('');
  isEditing = signal(false);
  patientId = signal<number | null>(null);

  readonly Save = Save;
  readonly ArrowLeft = ArrowLeft;
  readonly Loader = Loader;

  constructor(
    private fb: FormBuilder,
    private patientSercive: PatientService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.maxLength(100)]],
      fechaNacimiento: ['', Validators.required],
      cedula: ['', Validators.maxLength(20)],
      telefono: ['', Validators.maxLength(20)],
      direccion: ['', Validators.maxLength(200)],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.patientId.set(Number(id));
      this.loadPatient(Number(id));
    }
  }

  loadPatient(id: number): void {
    this.loading.set(true);
    this.patientSercive.getById(id).subscribe({
      next: (patient) => {
        this.form.patchValue({
          nombre: patient.nombre,
          apellido: patient.apellido,
          fechaNacimiento: patient.fechaNacimiento,
          cedula: patient.cedula,
          telefono: patient.telefono,
          direccion: patient.direccion,
        });
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar el paciente');
        this.loading.set(false);
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const patient: Patient = {
      ...this.form.value,
      id: this.isEditing() ? this.patientId()! : undefined,
    };

    this.loading.set(true);

    if (this.isEditing()) {
      console.log({ id: this.patientId()! });
      console.log({ patient });
      this.patientSercive.update(this.patientId()!, patient).subscribe({
        next: () => this.router.navigate(['/pacientes']),
        error: () => {
          this.error.set('Error al actualizar el paciente');
          this.loading.set(false);
        },
      });
    } else {
      this.patientSercive.create(patient).subscribe({
        next: () => this.router.navigate(['/pacientes']),
        error: () => {
          this.error.set('Error al crear el paciente');
          this.loading.set(false);
        },
      });
    }
  }

  isFieldInvalid(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control?.invalid && control?.touched);
  }
}
