package ratater.parser

class EchoReader implements TokenReader {
  var _reader : TokenReader
  construct(reader : TokenReader) {
    _reader = reader
  }
  override function readToken(): Token {
    var t = _reader.readToken()
    print(t)
    return t
  }
}