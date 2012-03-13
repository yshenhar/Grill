package ratater.ast
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/10/12
 * Time: 9:17 AM
 * To change this template use File | Settings | File Templates.
 */
interface ExprVisitor {
  function visit(expr : AssignExpr)
  function visit(expr : LiteralExpr)
  function visit(expr : NameExpr)
  function visit(expr : OperatorExpr)
  function visit(expr : RateRoutineExpr)
  function visit(expr : SequenceExpr)
}