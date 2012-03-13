package ratater.ast
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/9/12
 * Time: 8:03 PM
 * To change this template use File | Settings | File Templates.
 */
abstract class Expr {
  abstract function accept(visitor : ExprVisitor)
}