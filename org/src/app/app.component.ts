import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './core/components/side-bar/side-bar.component';
import { AlertToastService } from './core/services/alert-toast/alert-toast.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertToastState } from './core/models/alert-toast-state.model';

@Component({
  standalone: true,
  imports: [RouterModule, SideBarComponent, NgClass, AsyncPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  alertToastState$: Observable<AlertToastState>;

  constructor(private readonly alertToastService: AlertToastService) {
    this.alertToastState$ = this.alertToastService.state$;
  }

  closeAlertToast(): void {
    this.alertToastService.close();
  }
}
