package ratater.ast

uses ratater.parser.TokenType
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/9/12
 * Time: 10:44 PM
 * To change this template use File | Settings | File Templates.
 */
class OperatorExpr extends Expr {
  var _tokenType : TokenType
  var _left : Expr
  var _right : Expr
  construct(left : Expr, token : TokenType, right : Expr) {
    _tokenType = token
    _left = left
    _right = right
  }

  override function accept(visitor : ExprVisitor) {
    visitor.visit(this)
  }

  override function toString() : String {
    return _left + " " + _tokenType.Name + " " + _right
  }
}