package ratater.parser
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/9/12
 * Time: 10:22 PM
 * To change this template use File | Settings | File Templates.
 */
enum Precedence {
  // Ordered in increasing precedence.
  ASSIGNMENT(1),
  CONDITIONAL(2),
  SUM(3),
  PRODUCT(4),
  EXPONENT(5),
  PREFIX(6),
  POSTFIX(7),
  CALL(8)

  private construct(precedence : int) {
    _precedence = precedence
  }
  var _precedence : int as readonly Precedence
}