package ratater.ast
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/9/12
 * Time: 11:25 PM
 * To change this template use File | Settings | File Templates.
 */
class AssignExpr extends Expr {
  var _name : String as Name
  var _right : Expr

  construct(name : String, right : Expr) {
    _name = name
    _right = right
  }

  override function accept(visitor : ExprVisitor) {
    visitor.visit(this)
    _right.accept(visitor)
  }

  override function toString() : String {
    return _name + "=" + _right
  }
}