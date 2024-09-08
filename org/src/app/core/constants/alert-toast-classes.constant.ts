import { AlertToastType } from '../services/alert-toast/alert-toast.service';

export const ALERT_TOAST_CLASSES: Record<AlertToastType, string> = {
  success: 'alert-success',
  error: 'alert-error',
  info: 'alert-info',
  warning: 'alert-warning',
} as const;
