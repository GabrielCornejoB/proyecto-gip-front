import { AlertToastType } from '../services/alert-toast/alert-toast.service';

export const ALERT_TOAST_ICONS: Record<AlertToastType, string> = {
  success: 'check_circle',
  error: 'error',
  info: 'info',
  warning: 'warning',
} as const;
