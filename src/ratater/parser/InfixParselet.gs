package ratater.parser
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/9/12
 * Time: 10:52 PM
 * To change this template use File | Settings | File Templates.
 */

uses ratater.ast.Expr
interface InfixParselet {
  function parse(parser : RataterParser, left : Expr, token : Token) : Expr

  property get Precedence() : int
}