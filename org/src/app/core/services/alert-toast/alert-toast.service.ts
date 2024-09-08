import { Injectable, signal, WritableSignal } from '@angular/core';
import { AlertToastVariant } from '../../models/alert-toast-variant.model';
import { ALERT_TOAST_ICONS } from '../../constants/alert-toast-icons.constant';
import { ALERT_TOAST_CLASSES } from '../../constants/alert-toast-classes.constant';

export type AlertToastType = 'success' | 'info' | 'warning' | 'error';

@Injectable({
  providedIn: 'root',
})
export class AlertToastService {
  isOpen: WritableSignal<boolean> = signal(false);
  variant: WritableSignal<AlertToastVariant> = signal({
    type: 'success',
    icon: 'check_',
    class: 'alert-success',
  });
  text: WritableSignal<string> = signal('');
  readonly durationInMs = 5000;

  open(type: AlertToastType, text: string): void {
    this.isOpen.set(true);
    this.variant.set({
      type,
      icon: ALERT_TOAST_ICONS[type],
      class: ALERT_TOAST_CLASSES[type],
    });
    this.text.set(text);

    setTimeout(() => {
      this.isOpen.set(false);
    }, this.durationInMs);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
