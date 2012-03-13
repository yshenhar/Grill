package ratater.ast
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/9/12
 * Time: 8:56 PM
 * To change this template use File | Settings | File Templates.
 */
class LiteralExpr<T> extends Expr {
  var _val : T as readonly Value

  construct(val : T) {
    _val = val
  }

  override function accept(visitor : ExprVisitor) {
    visitor.visit(this)
  }

  override function toString() : String {
    return _val.toString()
  }
}