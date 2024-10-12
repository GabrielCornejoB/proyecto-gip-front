import { AlertToastService } from './alert-toast.service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('AlertToastService', () => {
  let service: AlertToastService;

  beforeEach(() => {
    service = new AlertToastService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('open()', () => {
    it(
      'GIVEN the alert is not already open ' +
        'WHEN the open() fn is called ' +
        'THEN it should open the alert, change its values and then close it',
      fakeAsync(() => {
        const expectedState = {
          isOpen: true,
          type: 'info',
          icon: 'info',
          class: 'alert-info',
          text: 'Texto informativo',
        };
        jest.spyOn(service['state'], 'next');

        service.open('info', 'Texto informativo');

        expect(service['state'].value).toEqual(expectedState);
        tick(5100);
        expect(service['state'].value.isOpen).toBeFalsy();
        expect(service['state'].next).toHaveBeenCalledTimes(2);
      }),
    );

    it(
      'GIVEN the alert is already open ' +
        'WHEN the open() fn is called ' +
        'THEN it should not open the alert, nor change its state',
      () => {
        service['state'].next({ ...service['state'].value, isOpen: true });
        jest.spyOn(service['state'], 'next');

        service.open('info', 'Texto informativo');

        expect(service['state'].value.type).not.toEqual('info');
        expect(service['state'].value.text).not.toEqual('Texto informativo');
        expect(service['state'].next).not.toHaveBeenCalled();

        jest.clearAllTimers();
      },
    );
  });

  describe('close()', () => {
    it(
      'GIVEN no preconditions ' +
        'WHEN the close() fn is called ' +
        'THEN it should close the alert toast',
      () => {
        jest.spyOn(service['state'], 'next');

        service.close();

        expect(service['state'].next).toHaveBeenCalledWith({
          ...service['state'].value,
          isOpen: false,
        });
        expect(service['state'].value.isOpen).toBeFalsy();
      },
    );
  });
});
