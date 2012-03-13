package ratater.parser
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/9/12
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */

uses ratater.ast.Expr

interface PrefixParselet {
  function parse(parser : RataterParser, token : Token) : Expr
}