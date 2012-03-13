package ratater.parser
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/9/12
 * Time: 10:39 PM
 * To change this template use File | Settings | File Templates.
 */

uses ratater.ast.Expr
uses ratater.ast.OperatorExpr

class BinaryOperatorParselet implements InfixParselet {
  construct(precedence : int, isRight : boolean) {
    _precedence = precedence;
    _isRight = isRight;
  }

  function parse(parser : RataterParser, left : Expr, token : Token) : Expr {
  // To handle right-associative operators like "^", we allow a slightly
  // lower precedence when parsing the right-hand side. This will let a
  // parselet with the same precedence appear on the right, which will then
  // take *this* parselet's result as its left-hand argument.
  var right = parser.parsePrecedence(_precedence - (_isRight ? 1 : 0))

  return new OperatorExpr(left, token.getType(), right)
  }

  var _precedence : int as readonly Precedence
  var _isRight : boolean

}