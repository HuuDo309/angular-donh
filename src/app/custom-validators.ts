import { AbstractControl, ValidationErrors } from '@angular/forms';

export function DateValidator(control: AbstractControl): ValidationErrors | null {
  const inputDate = new Date(control.value);
  const today = new Date();

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return inputDate <= today ? null : { dateInvalid: true };
}
