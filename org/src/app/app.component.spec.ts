import { AppComponent } from './app.component';
import { AlertToastService } from './core/services/alert-toast/alert-toast.service';

describe('AppComponent', () => {
  let component: AppComponent;

  const alertToastService: AlertToastService = {
    close: jest.fn(),
  } as never;

  beforeEach(() => {
    component = new AppComponent(alertToastService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the alert toast when the alert toast is clicked', () => {
    component.closeAlertToast();

    expect(alertToastService.close).toHaveBeenCalled();
  });
});
