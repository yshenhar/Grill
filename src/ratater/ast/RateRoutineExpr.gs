package ratater.ast

uses java.util.ArrayList

/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/8/12
 * Time: 11:33 PM
 * To change this template use File | Settings | File Templates.
 */
class RateRoutineExpr extends Expr {
  var _lob : String as readonly LineOfBusinessPatternCode
  var _code : String as readonly Code
  var _body : Expr as readonly Body
  
  construct(lob : String, code : String, body : Expr) {
    _lob = lob
    _code = code
    _body = body
  }




  override function accept(visitor : ExprVisitor) {
    visitor.visit(this)
  }

  override function toString() : String {
    return _lob + "." + _code
  }
}