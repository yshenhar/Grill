package ratater.parser
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/9/12
 * Time: 11:28 PM
 * To change this template use File | Settings | File Templates.
 */

uses ratater.ast.Expr
uses ratater.ast.AssignExpr
uses ratater.ast.NameExpr

class AssignParselet implements InfixParselet {
  override function parse(parser: RataterParser, left: Expr, token: Token): ratater.ast.Expr {
    // TODO: Test that Assignment is done to a variable
    if (left typeis NameExpr) {
      var right = parser.parsePrecedence(Precedence - 1)
      return new AssignExpr(left.toString(), right)
    } else {
      throw "Can only assign to variables: " + left
    }
  }

  override property get Precedence(): int {
    return ratater.parser.Precedence.ASSIGNMENT.Precedence
  }
}