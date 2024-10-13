import { AlertToastType } from '../services/alert-toast/alert-toast.service';

export type AlertToastState = {
  type: AlertToastType;
  icon: string;
  class: string;
  text: string;
  isOpen: boolean;
};
