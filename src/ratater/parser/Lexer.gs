package ratater.parser
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/6/12
 * Time: 11:13 PM
 * To change this template use File | Settings | File Templates.
 */
uses java.util.Iterator
uses java.lang.Character
uses java.util.HashMap
uses java.util.Map
uses java.lang.UnsupportedOperationException
uses java.lang.StringBuilder

class Lexer implements TokenReader {
/**
 * A very primitive lexer. Takes a string and splits it into a series of
 * Tokens. Operators and punctuation are mapped to unique keywords. Names,
 * which can be any series of letters, are turned into NAME tokens. All other
 * characters are ignored (except to separate names). Numbers and strings are
 * not supported. This is really just the bare minimum to give the parser
 * something to work with.
 */
  /**
   * Creates a new Lexer to tokenize the given string.
   * @param text String to tokenize.
   */
  construct(text : String) {
    mIndex = 0;
    mText = text;
    mRead = new StringBuilder()
  }

  override function readToken() : Token {
    while (mIndex < mText.length()) {
      var c = advance()
      switch (c) {
        // Whitespace.
        case ' ':
        case '\t':
          return readWhitespace()

          // Punctuators.
        case '(': return makeToken(LEFT_PAREN)
        case ')': return makeToken(RIGHT_PAREN)
        case '{': return makeToken(LEFT_BRACE)
        case '}': return makeToken(RIGHT_BRACE)
        case ',': return makeToken(COMMA)
        case '.': return makeToken(DOT)

          // Match line ending characters.
        case ';':
        case '\n':
        case '\r':
            return makeToken(LINE)

          // Strings.
        case '"':
            return readString()

          // Comments.
        case '/':
          switch (peek()) {
            case '/': return readLineComment();
            case '*': return readBlockComment();
            //default:  return readName();
          }
          // EOF.
        case '\0': return makeToken(EOF)

        default:
          if (isName(c)) {
            // Identifier.
            return readName()
          } else if (isOperator(c)) {
            // Operator
            return readOperator()
          } else if (isDigit(c)) {
            // Number.
            return readNumber()
          } else {
            // TODO(bob): Emit error token instead of throwing.
            throw "Unknown character: " + c
          }
      }
    }

    // Once we've reached the end of the string, just return EOF tokens. We'll
    // just keeping returning them as many times as we're asked so that the
    // ratater.parser's lookahead doesn't have to worry about running out of tokens.
    return makeToken(TokenType.EOF)
  }

  private function advance() : char {
    if (mIndex >= mText.length) return '\0'
    var c = mText.charAt(mIndex)
    mIndex++
    mRead.append(c)
    return c;
  }
  
  private function peek() : char {
    if (mIndex >= mText.length) return '\0'
    return mText.charAt(mIndex)
  }

  private function readBlockComment() : Token {
    while (true) {
      switch (advance()) {
        case '*':
          switch (advance()) {
            case '/': return makeToken(BLOCK_COMMENT);
              // TODO(bob): Emit error token instead of throwing.
            case '\0': throw "Unterminated block comment."
              default: // Do nothing, keep advancing.
          }
          break;

          // TODO(bob): Emit error token instead of throwing.
        case '\0': throw "Unterminated block comment."
          default: // Do nothing, keep advancing.
      }
    }

    throw "Exited line comment loop unexpectedly"
  }

  private function readLineComment() : Token {
    advance(); // Consume second "/".

    var slashCount = 2

    // Consume any number of additional leading "/".
    while (peek() == '/') {
      advance()
      slashCount++
    }

    while (true) {
      switch (peek()) {
        case '\n':
        case '\r':
        case '\0':
          var value = mRead.substring(slashCount).trim()
          return makeToken(LINE_COMMENT, value);

        default:
          advance();
      }
    }

    throw "Exited line comment loop unexpectedly"
  }

  private function readWhitespace() : Token {
    while (true) {
      switch (peek()) {
        case ' ':
        case '\t':
          advance()
          break

        default:
          return makeToken(WHITESPACE)
      }
    }

    // this shouldn't occur, but the Gosu ratater.parser complains without it
    throw "Exited whitespace loop unexpectedly"
  }

  private function readString() : Token {
    var str = new StringBuilder()

    while (true) {
      var c = advance()
      switch (c) {
        case '"':
          return makeToken(STRING, str.toString())
        default:
        str.append(c);
      }
    }

    // this shouldn't occur, but the Gosu ratater.parser complains without it
    throw "Exited readString loop unexpectedly"
  }

  private function readName() : Token {
    while (true) {
      if (isName(peek()) || isDigit(peek())) {
        advance();
      } else {
        return makeToken(NAME);
      }
    }

    // this shouldn't occur, but the Gosu ratater.parser complains without it
    throw "Exited readName loop unexpectedly"
  }

  private function readNumber() : Token {
    while (true) {
      if (isDigit(peek())) {
        advance()
      } else {
        return makeToken(NUMBER, mRead.toString());
      }
    }

    // this shouldn't occur, but the Gosu ratater.parser complains without it
    throw "Exited readNumber loop unexpectedly"
  }

  private function readOperator() : Token {
    while (true) {
      if (isName(peek()) || isOperator(peek())) {
        advance();
      } else {
        return makeToken(TokenType.NAME)
      }
    }

    // this shouldn't occur, but the Gosu ratater.parser complains without it
    throw "Exited readOperator loop unexpectedly"
  }

  private function makeToken(tokenType : TokenType) : Token {
    return makeToken(tokenType, mRead.toString())
  }  
  
  private function makeToken(tokenType : TokenType, value : String) : Token {
    // Handle reserved words.
    var read = mRead.toString()
    if (tokenType == TokenType.NAME) {
      if (keywords.containsKey(read)) {
        tokenType = keywords.get(read)
      } else if (read.equals("false")) {
        tokenType = TokenType.BOOL
        value = "false"
      } else if (read.equals("true")) {
        tokenType = TokenType.BOOL
        value = "true"
      }
    }
    var t = new Token(tokenType, value)

    mRead.setLength(0)
    return t
  }

  private function isName(c : char) : boolean {
    return ((c >= 'a') && (c <= 'z'))
      || ((c >= 'A') && (c <= 'Z'))
      || (c == '_')
  }

  private function isDigit(c : char) : boolean  {
    return (c >= '0') && (c <= '9');
  }

  private function isOperator(c : char) : boolean {
  return ("=+*-/".indexOf(c) != -1);
  }

  var mText : String
  var mIndex :int
  var mRead : StringBuilder
  
  private static var keywords : Map<String, TokenType> = {
    "if" -> IF,
    "else" -> ELSE,
    "==" -> EQEQ,
    "rateroutine" -> RATEROUTINE,
    "_cost" -> COST,
    "_book" -> BOOK,
    "+" -> PLUS,
    "*" -> ASTERISK,
    "=" -> ASSIGN
  }
}