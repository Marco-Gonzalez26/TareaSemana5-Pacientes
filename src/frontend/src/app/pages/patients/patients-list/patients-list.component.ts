import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Pencil, Trash2, Plus, Eye, Inbox } from 'lucide-angular';

import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { Patient } from '../../../interfaces/patient.interface';
import { PatientService } from '../../../core/services/patient.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [RouterModule, LucideAngularModule, ConfirmModalComponent],
  templateUrl: './patients-list.component.html',
})
export class PatientListComponent implements OnInit {
  patients = signal<Patient[]>([]);
  loading = signal(false);
  error = signal('');

  modalVisible = signal(false);
  selectedPatientId = signal<number | null>(null);

  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;
  readonly Plus = Plus;
  readonly Eye = Eye;
  readonly Inbox = Inbox;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading.set(true);
    this.patientService.getAll().subscribe({
      next: (data) => {
        this.patients.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los Patients');
        this.loading.set(false);
      },
    });
  }

  openModal(id: number): void {
    this.selectedPatientId.set(id);
    this.modalVisible.set(true);
  }

  closeModal(): void {
    this.modalVisible.set(false);
    this.selectedPatientId.set(null);
  }

  confirmDelete(): void {
    const id = this.selectedPatientId();
    if (id !== null) {
      this.patientService.delete(id).subscribe({
        next: () => {
          this.loadPatients();
          this.closeModal();
        },
        error: () => {
          this.error.set('Error al eliminar el Patient');
          this.closeModal();
        },
      });
    }
  }
}
