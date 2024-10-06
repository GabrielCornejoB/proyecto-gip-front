import { Handler } from './handler.interface';

export abstract class FileInputHandler implements Handler {
  next!: Handler;

  setNext(handler: Handler): Handler {
    this.next = handler;

    return handler;
  }

  handle(request: FileList): FileList {
    if (this.next) {
      return this.next.handle(request);
    }

    return request as FileList;
  }
}
