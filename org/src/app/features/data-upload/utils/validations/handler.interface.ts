export interface Handler<Request = FileList | null, Result = FileList> {
  setNext(handler: Handler<Request, Result>): Handler<Request, Result>;

  handle(request: Request): Result;
}
