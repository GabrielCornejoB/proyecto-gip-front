import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertToastState } from '../../models/alert-toast-state.model';
import { ALERT_TOAST_ICONS } from '../../constants/alert-toast-icons.constant';
import { ALERT_TOAST_CLASSES } from '../../constants/alert-toast-classes.constant';

export type AlertToastType = 'success' | 'info' | 'warning' | 'error';

@Injectable({
  providedIn: 'root',
})
export class AlertToastService {
  readonly durationInMs = 5000;

  private state = new BehaviorSubject<AlertToastState>({
    isOpen: false,
    text: '',
    icon: 'check-circle',
    class: 'alert-success',
    type: 'success',
  });
  state$ = this.state.asObservable();

  open(type: AlertToastType, text: string): void {
    if (this.state.value.isOpen) return;

    this.state.next({
      isOpen: true,
      type,
      text,
      icon: ALERT_TOAST_ICONS[type],
      class: ALERT_TOAST_CLASSES[type],
    });

    setTimeout(() => {
      this.state.next({ ...this.state.value, isOpen: false });
    }, this.durationInMs);
  }

  close(): void {
    this.state.next({ ...this.state.value, isOpen: false });
  }
}
