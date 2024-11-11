export class AiRequest {
  consultation_code = 890308;
  city = '143';

  constructor(
    public identification_type: string,
    public consultation_date: string,
    public gender: string,
    public birth_date: string,
    public subject: string,
    public commitment_type: string,
    public appointment_status: string,
    public procedure_type: string,
    public user_type: string,
  ) {}
}
