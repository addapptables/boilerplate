
export class AlreadyExists extends Error {

  code = 400;

  constructor(message: string, code = 400) {
    super(message);
    this.code = code;
  }

}
