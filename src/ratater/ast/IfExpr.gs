package ratater.ast
/**
 * Created by IntelliJ IDEA.
 * User: yshenhar
 * Date: 3/14/12
 * Time: 6:51 AM
 * To change this template use File | Settings | File Templates.
 */
class IfExpr extends Expr {

  var _condition : Expr as readonly Condition
  var _block : Expr as readonly Block

  construct(cond : Expr, blk : Expr) {
    _condition = cond
    _block = blk
  }

  override function accept(visitor: ratater.ast.ExprVisitor) {
    visitor.visit(this)
  }
}