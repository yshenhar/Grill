package ratater.parser

uses ratater.ast.Expr
uses ratater.ast.LiteralExpr
uses java.math.BigDecimal

/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/9/12
 * Time: 8:55 PM
 * To change this template use File | Settings | File Templates.
 */
class LiteralParser implements PrefixParselet {
  override function parse(parser : RataterParser, t : Token): Expr {
    switch (t.Type) {
      case TokenType.NUMBER:
          return new LiteralExpr <BigDecimal>(new BigDecimal(t.Text))
      case TokenType.BOOL:
          return new LiteralExpr <Boolean>(Boolean.valueOf(t.Text == "true"))
      case TokenType.STRING:
          return new LiteralExpr <String>(t.Text)
        default:
        throw "Not a literal token " + t.Type + ":" + t.Text
    }
  }

}