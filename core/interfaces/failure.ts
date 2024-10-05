export type BadRequestErrorType = {
  [key: string]: string[];
};
export abstract class Failure {
  readonly message: string;

  constructor(message: string) {
    this.message = message;
  }

  toString(): string {
    return this.message;
  }
}

export class BadRequestFailure extends Failure {
  readonly errors?: BadRequestErrorType;
  readonly errorsString?: string;

  constructor(
    message: string,
    errors: {
      [key: string]: string[];
    },
    errorsString?: string
  ) {
    super(message);
    this.errors = errors;
    this.errorsString = errorsString;
  }
}

export class ServerFailure extends Failure {
  constructor(message: string) {
    super(message);
  }
}

// Client

export class NotFoundFailure extends Failure {
  constructor(message?: string) {
    super(message ?? "No se encontró el recurso");
  }
}

export class FeatureNotImplementedFailure extends Failure {
  constructor(message?: string) {
    super(message ?? "Característica no implementada");
  }
}
