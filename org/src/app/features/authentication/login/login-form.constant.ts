import { FormControl, FormGroup, Validators as V } from '@angular/forms';

export type LoginForm = {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
};

export const loginForm = new FormGroup<LoginForm>({
  email: new FormControl('', [V.required, V.email, V.minLength(5)]),
  password: new FormControl('', [V.required, V.minLength(7)]),
});
