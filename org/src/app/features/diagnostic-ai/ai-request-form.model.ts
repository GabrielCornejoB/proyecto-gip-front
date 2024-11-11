import { FormControl, FormGroup } from '@angular/forms';

export const identificationTypes = ['CC', 'TI', 'RC'] as const;
export type IdentificationType = (typeof identificationTypes)[number];

export const genders = ['Masculino', 'Femenino', 'Sin Asignar'] as const;
export type Gender = (typeof genders)[number];

export const coreSubjects = [
  'BIENESTAR',
  'COLEGIO',
  'COLEGIATURA',
  'COMFENALCO',
  'EMPRESA',
  'UNIVERSIDAD',
  'CONVENIO',
  'EGRESADO',
  'ESTUDIANTE',
  'FONDELCO',
  'GESTIÓN HUMANA',
  'CLINICA',
] as const;
export type CoreSubject = (typeof coreSubjects)[number];

export const commitmentTypes = ['Primera vez', 'Repetida'] as const;
export type CommitmentType = (typeof commitmentTypes)[number];

export const appointmentStatuses = [
  'Asistió',
  'No asistió',
  'Cancelada',
] as const;
export type AppointmentStatus = (typeof appointmentStatuses)[number];

export const procedureTypes = [
  'Consulta psicológica',
  'Docencia Asistencial',
  'Evaluación',
] as const;
export type ProcedureType = (typeof procedureTypes)[number];

export const userTypes = ['Particular', 'Empleado'];
export type UserType = (typeof userTypes)[number];

export type AiRequestForm = {
  identification_type: FormControl<IdentificationType>;
  consultation_date: FormControl<string>;
  gender: FormControl<Gender>;
  birth_date: FormControl<string>;
  subject: FormControl<CoreSubject>;
  commitment_type: FormControl<CommitmentType>;
  appointment_status: FormControl<AppointmentStatus>;
  procedure_type: FormControl<ProcedureType>;
  user_type: FormControl<UserType>;
};

const notNull = { nonNullable: true } as const;

export const aiRequestForm = new FormGroup<AiRequestForm>({
  identification_type: new FormControl<IdentificationType>('CC', notNull),
  consultation_date: new FormControl<string>(
    new Date().toISOString().split('T')[0],
    notNull,
  ),
  gender: new FormControl<Gender>('Masculino', notNull),
  birth_date: new FormControl<string>('2000-01-01', notNull),
  subject: new FormControl<CoreSubject>('BIENESTAR', notNull),
  commitment_type: new FormControl<CommitmentType>('Repetida', notNull),
  appointment_status: new FormControl<AppointmentStatus>('Asistió', notNull),
  procedure_type: new FormControl<ProcedureType>('Evaluación', notNull),
  user_type: new FormControl<UserType>('Particular', notNull),
});
