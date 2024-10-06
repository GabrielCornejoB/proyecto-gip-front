export interface Handler<Request = FileList, Result = FileList> {
  setNext(handler: Handler<Request, Result>): Handler<Request, Result>;

  handle(request: Request): Result;
}
