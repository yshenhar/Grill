package ratater.parser
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/8/12
 * Time: 10:55 PM
 * To change this template use File | Settings | File Templates.
 */
class WhitespaceStripper implements TokenReader {
  var _reader : TokenReader
  var _debug : boolean
  construct(tokenReader : TokenReader, debug=false) {
    _reader = tokenReader
    _debug = debug
  }

  override function readToken() : Token {
    while(true) {
      var token = _reader.readToken()

      switch(token.Type) {
        case WHITESPACE:
        case BLOCK_COMMENT:
        case LINE_COMMENT:
          continue

        default: {
          if (_debug) print(token)
          return token
        }
      }
    }

    //. make the ratater.parser happy
    throw "Unexpected termination from loop"
  }
}