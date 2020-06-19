/**
 * パイプラインのクラス
 */
class Pipeline<A> {
  /**
   * コンストラクタ
   * @param value
   */
  constructor(private value: A) {}

  /**
   * 関数を適用して、パイプラインをつなげる
   * @param f
   */
  then<B>(f: (a: A) => B): Pipeline<B> {
    return new Pipeline(f(this.value));
  }

  /**
   * パイプラインを終了して、値を取り出す
   */
  end(): A {
    return this.value;
  }
}

/**
 * パイプラインを開始する
 * @param value
 */
export function start<A>(value: A): Pipeline<A> {
  return new Pipeline(value);
}
