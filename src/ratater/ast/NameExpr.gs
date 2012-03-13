package ratater.ast
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/10/12
 * Time: 12:06 AM
 * To change this template use File | Settings | File Templates.
 */
class NameExpr extends Expr {
  var _name : String as readonly Name
  construct(name : String) {
    _name = name
  }

  override function accept(visitor : ExprVisitor) {
    visitor.visit(this)
  }

  override function toString() : String {
    return _name
  }
}