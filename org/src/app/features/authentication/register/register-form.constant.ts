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
  name: FormControl<string | null>;
  justification: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
};

export const registerForm = new FormGroup<RegisterForm>(
  {
    email: new FormControl('', [V.required, V.email, V.minLength(5)]),
    password: new FormControl('', [
      V.required,
      V.minLength(7),
      V.pattern(/^\S.*\S$/),
    ]),
    confirmPassword: new FormControl('', [
      V.required,
      V.minLength(7),
      V.pattern(/^\S.*\S$/),
    ]),
    name: new FormControl('', [
      V.required,
      V.minLength(5),
      V.pattern(/^\S.*\S$/),
    ]),
    justification: new FormControl('', [
      V.required,
      V.minLength(10),
      V.pattern(/^\S.*\S$/),
    ]),
  },
  [samePasswordValidator],
);
