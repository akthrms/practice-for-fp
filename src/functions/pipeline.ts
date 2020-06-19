class Pipeline<A> {
  constructor(private value: A) {}

  pipe<B>(f: (a: A) => B): Pipeline<B> {
    return new Pipeline(f(this.value));
  }

  end(): A {
    return this.value;
  }
}

export function start<A>(value: A): Pipeline<A> {
  return new Pipeline(value);
}
