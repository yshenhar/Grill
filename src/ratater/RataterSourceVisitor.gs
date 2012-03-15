package ratater

uses ratater.ast.ExprVisitor
uses java.lang.StringBuilder
uses java.nio.ReadOnlyBufferException
uses ratater.ast.AssignExpr
uses ratater.ast.NameExpr
uses ratater.ast.OperatorExpr
uses ratater.ast.RateRoutineExpr
uses ratater.ast.LiteralExpr
uses ratater.ast.SequenceExpr
uses ratater.ast.NothingExpr
uses ratater.ast.IfExpr

/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/10/12
 * Time: 9:29 AM
 * To change this template use File | Settings | File Templates.
 */
class RataterSourceVisitor implements ExprVisitor {
  var buf : StringBuilder as readonly ParseTree
  var indent : int

  construct() {
    buf = new StringBuilder()
  }
  override function visit(expr: AssignExpr) {
    buf.append("\n").append("\t".repeat(indent)).append(expr.Name).append(" = ")
  }

  override function visit(expr: LiteralExpr) {
    buf.append(expr.Value)
  }

  override function visit(expr: NameExpr) {
    buf.append("\n").append("\t".repeat(indent)).append(expr.Name)
  }

  override function visit(expr: OperatorExpr) {
    buf.append(expr.toString())
  }

  override function visit(expr: RateRoutineExpr) {
    buf.append("rateroutine ").append(expr.LineOfBusinessPatternCode + "." + expr.Code)
    expr.Body.accept(this)
  }

  override function visit(seq: SequenceExpr) {
    indent++
    buf.append(" {")
    seq.Expressions.each(\expr -> expr.accept(this))
    indent--
    buf.append("\n").append("\t".repeat(indent)).append("}")
  }

  override function visit(expr: NothingExpr) {
  }

  override function visit(ifExpr: IfExpr) {
    buf.append("\n").append("\t".repeat(indent))
    buf.append("IF ").append("(")
    ifExpr.Condition.accept(this)
    buf.append(")")
    ifExpr.Block.accept(this)
    
  }
}