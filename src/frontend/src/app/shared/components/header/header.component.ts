import { Component, signal, OnInit } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LogOut, User } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, LucideAngularModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly LogOut = LogOut;
  readonly User = User;

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  logOut() {
    this.auth.logOut();
    this.router.navigate(['/login']);
  }
}
