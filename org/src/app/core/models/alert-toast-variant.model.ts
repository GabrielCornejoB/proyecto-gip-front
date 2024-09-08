import { AlertToastType } from '../services/alert-toast/alert-toast.service';

export type AlertToastVariant = {
  type: AlertToastType;
  icon: string;
  class: string;
};
