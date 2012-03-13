package ratater.ast
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/12/12
 * Time: 9:55 PM
 * To change this template use File | Settings | File Templates.
 */
class SequenceExpr extends Expr {
  var _exprs : List<Expr>
  
  construct(exprs : List<Expr>) {
    _exprs = exprs
  }

  property get Expressions() : List<Expr> {
    return _exprs.freeze()
  }
  
  override function accept(visitor: ratater.ast.ExprVisitor) {
    visitor.visit(this)
  }
}