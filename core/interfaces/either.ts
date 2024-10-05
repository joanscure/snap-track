export abstract class Either<L, R> {
  abstract fold<B>(ifLeft: (l: L) => B, ifRight: (r: R, message?: any) => B): B;
}

export class Left<L, R> extends Either<L, R> {
  constructor(private readonly _l: L) {
    super();
  }

  fold<B>(ifLeft: (l: L) => B, _: (r: R, message?: any) => B): B {
    return ifLeft(this._l);
  }
}

export class Right<L, R> extends Either<L, R> {
  constructor(private readonly _r: R, private readonly _message?: any) {
    super();
  }

  fold<B>(_: (l: L) => B, ifRight: (r: R, message?: any) => B): B {
    return ifRight(this._r, this._message);
  }
}
