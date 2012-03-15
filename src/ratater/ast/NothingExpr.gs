package ratater.ast
/**
 * Created by IntelliJ IDEA.
 * User: yshenhar
 * Date: 3/13/12
 * Time: 11:46 PM
 * To change this template use File | Settings | File Templates.
 */
class NothingExpr extends Expr {

  override function accept(visitor: ratater.ast.ExprVisitor) {
    visitor.visit(this)
  }
}