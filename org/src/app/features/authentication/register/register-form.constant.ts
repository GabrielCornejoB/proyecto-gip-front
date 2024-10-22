import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators as V,
} from '@angular/forms';

const samePasswordValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { samePassword: false }
    : null;
};

export type RegisterForm = {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
};

export const registerForm = new FormGroup<RegisterForm>(
  {
    email: new FormControl('', [V.required, V.email, V.minLength(5)]),
    password: new FormControl('', [V.required, V.minLength(7)]),
    confirmPassword: new FormControl('', [V.required, V.minLength(7)]),
  },
  [samePasswordValidator],
);
