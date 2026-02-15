import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, TriangleAlert, X } from 'lucide-angular';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent {
  @Input() title: string = '¿Estás seguro?';
  @Input() message: string = 'Esta acción no se puede deshacer.';
  @Input() visible: boolean = false;

  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  readonly TriangleAlert = TriangleAlert;
  readonly X = X;

  confirm(): void {
    this.confirmed.emit();
  }

  cancel(): void {
    this.canceled.emit();
  }
}
