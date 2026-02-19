import { PatientService } from './../../../core/services/patient.service';
import { ClinicHistoryService } from './../../../core/services/clinic-history.service';
import { Patient } from './../../../interfaces/patient.interface';
import { ClinicHistory } from './../../../interfaces/clinic-history.interface';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Plus, Trash2, ArrowLeft, Inbox, User } from 'lucide-angular';

import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-histories-list',
  standalone: true,
  imports: [RouterModule, LucideAngularModule, ConfirmModalComponent, DatePipe],
  templateUrl: './histories-list.component.html',
})
export class HistoriesListComponent implements OnInit {
  clinicHistories = signal<ClinicHistory[]>([]);
  patient = signal<Patient | null>(null);
  loading = signal(false);
  error = signal('');

  modalVisible = signal(false);
  selectedHistoryId = signal<number | null>(null);

  readonly Plus = Plus;
  readonly Trash2 = Trash2;
  readonly ArrowLeft = ArrowLeft;
  readonly Inbox = Inbox;
  readonly User = User;

  constructor(
    private clinicHistoryService: ClinicHistoryService,
    private patientService: PatientService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPatient(id);
    this.loadClinicHistories(id);
  }

  loadPatient(id: number): void {
    this.patientService.getById(id).subscribe({
      next: (data) => this.patient.set(data),
      error: () => this.error.set('Error al cargar el paciente'),
    });
  }

  loadClinicHistories(id: number): void {
    this.loading.set(true);
    this.clinicHistoryService.getByPatient(id).subscribe({
      next: (data) => {
        this.clinicHistories.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar las historias clínicas');
        this.loading.set(false);
      },
    });
  }

  openModal(id: number): void {
    this.selectedHistoryId.set(id);
    this.modalVisible.set(true);
  }

  closeModal(): void {
    this.modalVisible.set(false);
    this.selectedHistoryId.set(null);
  }

  confirmDelete(): void {
    const id = this.selectedHistoryId();
    if (id !== null) {
      this.clinicHistoryService.delete(id).subscribe({
        next: () => {
          this.loadClinicHistories(this.patient()!.id!);
          this.closeModal();
        },
        error: () => {
          this.error.set('Error al eliminar la historia clínica');
          this.closeModal();
        },
      });
    }
  }
}
