package ratater.parser
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/10/12
 * Time: 3:53 PM
 * To change this template use File | Settings | File Templates.
 */

class Morpher implements  TokenReader {
  var _tokens : TokenReader
  var _eatLines : boolean

  construct(tokens : TokenReader) {
    _tokens = tokens;

    // Consume any leading newlines.
    _eatLines = true;
  }

  override function  readToken() : Token {
    while (true) {
      var token = _tokens.readToken();

      switch (token.getType()) {
        case WHITESPACE:
        case BLOCK_COMMENT:
        case LINE_COMMENT:
          // Ignore non-semantic tokens.
          continue;

        // Ignore lines after tokens that can't end an expression.
        case COMMA:
        case LEFT_PAREN:
        case LEFT_BRACE:
        case ASTERISK:
        case SLASH:
        case PLUS:
        case MINUS:
        case LT:
        case GT:
        case LTE:
        case GTE:
        case EQEQ:
        case NOTEQ:
        case AND:
        case OR:
          _eatLines = true;
          break;

        case LINE_CONTINUATION:
          _eatLines = true;
          continue;

        case LINE:
          if (_eatLines) continue;

          // Collapse multiple lines into one.
          _eatLines = true;
          break;

        default:
          // A line after any other token is significant.
          _eatLines = false;
          break;
      }

      return token;
    }
  }

}
