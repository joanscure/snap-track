export interface RecordCore {
  [key: string]: string | number;
}

export class BadRequest extends Error {
  errors?: { [key: string]: string[] };
  constructor(message: string, errors?: { [key: string]: string[] }) {
    super(message);
    this.errors = errors;
  }
}
