/**
 * Cons
 */
type Cons<A> = {
  readonly _tag: "cons";
  readonly head: A;
  readonly tail: List<A>;
};

/**
 * Nil
 */
type Nil = {
  readonly _tag: "nil";
};

/**
 * List
 */
type List<A> = Cons<A> | Nil;

/**
 * Consのスマートコンストラクタ
 * @param head
 * @param tail
 */
function cons<A>(head: A, tail: List<A>): Cons<A> {
  return {
    _tag: "cons",
    head,
    tail,
  };
}

/**
 * Nilのスマートコンストラクタ
 */
function nil(): Nil {
  return {
    _tag: "nil",
  };
}

/**
 * Listのスマートコンストラクタ
 *
 * ```
 * listOf(1, 2, 3) // cons(1, cons(2, cons(3, nil)))
 * listOf() // nil
 * ```
 *
 * @param as
 */
export function listOf<A>(...as: Array<A>): List<A> {
  if (as.length === 0) {
    return nil();
  } else {
    const [head, ...tail] = as;
    return cons(head, listOf(...tail));
  }
}

/**
 * Consのタイプガード
 * @param as
 */
function isCons<A>(as: List<A>): as is Cons<A> {
  return as._tag === "cons";
}

/**
 * Nilのタイプガード
 * @param as
 */
function isNil<A>(as: List<A>): as is Nil {
  return !isCons(as);
}

/**
 * JS.Arrayに変換する関数
 *
 * ```
 * toArray(listOf(1, 2, 3)) // [1, 2, 3]
 * toArray(listOf()) // []
 * ```
 *
 * @param as
 */
export function toArray<A>(as: List<A>): Array<A> {
  if (isCons(as)) {
    return [as.head, ...toArray(as.tail)];
  } else {
    return [];
  }
}

/**
 * sum関数
 *
 * ```
 * sum(listOf(1, 2, 3)) // 6
 * ```
 *
 * @param ns
 */
export function sum(ns: List<number>): number {
  if (isCons(ns)) {
    return ns.head + sum(ns.tail);
  } else {
    return 0;
  }
}

/**
 * map関数
 *
 * ```
 * map((x) => x.toUpperCase(), listOf("a", "b", "c")) // cons("A", cons("B", cons("C", nil)))
 * ```
 *
 * @param f
 * @param as
 */
export function map<A, B>(f: (a: A) => B, as: List<A>): List<B> {
  if (isCons(as)) {
    return cons(f(as.head), map(f, as.tail));
  } else {
    return nil();
  }
}

/**
 * filter関数
 *
 * ```
 * filter((x) => x % 2 === 0, listOf(1, 2, 3)) // cons(2, nil)
 * ```
 *
 * @param f
 * @param as
 */
export function filter<A>(f: (a: A) => boolean, as: List<A>): List<A> {
  if (isCons(as)) {
    return f(as.head) ? cons(as.head, filter(f, as.tail)) : filter(f, as.tail);
  } else {
    return nil();
  }
}

/**
 * foldLeft（左畳み込み）関数
 *
 * ```
 * foldLeft(0, (b, a) => b + a, listOf(1, 2, 3)) // 6
 * ```
 *
 * @param init
 * @param f
 * @param as
 */
export function foldLeft<A, B>(init: B, f: (b: B, a: A) => B, as: List<A>): B {
  if (isCons(as)) {
    return foldLeft(f(init, as.head), f, as.tail);
  } else {
    return init;
  }
}

/**
 * foldRight（右畳み込み）関数
 *
 * ```
 * foldRight(0, (a, b) => a + b, listOf(1, 2, 3)) // 6
 * ```
 *
 * @param init
 * @param f
 * @param as
 */
export function foldRight<A, B>(init: B, f: (a: A, b: B) => B, as: List<A>): B {
  if (isCons(as)) {
    return f(as.head, foldRight(init, f, as.tail));
  } else {
    return init;
  }
}

/**
 * append関数
 *
 * ```
 * append(listOf(1, 2), listOf(3, 4)) // cons(1, cons(2, cons(3, cons(4, nil))))
 * ```
 *
 * @param as1
 * @param as2
 */
export function append<A>(as1: List<A>, as2: List<A>): List<A> {
  return foldRight(as2, (a, b) => cons(a, b), as1);
}

/**
 * flatMap関数
 *
 * ```
 * flatMap((x) => listOf(x, x), listOf(1, 2, 3)) // cons(1, cons(1, cons(2, cons(2, cons(3, cons(3, nil))))))
 * ```
 *
 * @param f
 * @param as
 */
export function flatMap<A, B>(f: (a: A) => List<B>, as: List<A>): List<B> {
  return foldRight(nil() as List<B>, (a, b) => append(f(a), b), as);
}
