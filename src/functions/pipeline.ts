/**
 * パイプラインのインターフェース
 */
interface Pipeline<A> {
  /**
   * 関数を適用して、パイプラインをつなげる
   * @param f
   */
  then<B>(f: (a: A) => B): Pipeline<B>;

  /**
   * パイプラインを終了して、値を取り出す
   */
  end(): A;
}

/**
 * パイプラインの実装クラス
 */
class PipelineImpl<A> implements Pipeline<A> {
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
    return new PipelineImpl(f(this.value));
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
  return new PipelineImpl(value);
}
