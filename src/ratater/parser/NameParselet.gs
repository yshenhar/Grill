package ratater.parser
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/10/12
 * Time: 12:08 AM
 * To change this template use File | Settings | File Templates.
 */
uses ratater.ast.Expr
uses ratater.ast.NameExpr

class NameParselet implements PrefixParselet {
  override function parse(parser: RataterParser, token: Token): Expr {
    return new NameExpr(token.Text)
  }
}