package ratater.parser

uses java.util.LinkedList
uses ratater.ast.RateRoutineExpr
uses java.util.ArrayList
uses ratater.ast.Expr
uses java.util.Map
uses java.util.HashMap
uses ratater.ast.SequenceExpr
uses ratater.ast.NothingExpr
uses ratater.ast.IfExpr

/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/8/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */
class RataterParser {
  var mTokens: TokenReader
  var mRead : List<Token>
  var mConsumed : List<Token>
  var _infixParselets : Map<TokenType,InfixParselet>
  var _prefixParselets : Map<TokenType,PrefixParselet>

  construct(reader: TokenReader) {
    mTokens = reader
    mRead = new LinkedList<Token>()
    mConsumed = new LinkedList<Token>()
    _infixParselets = new HashMap<TokenType,InfixParselet>()
    _prefixParselets = new HashMap<TokenType,PrefixParselet>()

    register(TokenType.ASSIGN, new AssignParselet())
    prefix(TokenType.NAME, new NameParselet())
    prefix(TokenType.NUMBER, new LiteralParser())
    infixLeft(TokenType.PLUS, Precedence.SUM)
    infixLeft(TokenType.EQEQ, Precedence.CONDITIONAL)
  }

  function parse() : List<Expr> {
    var exprs = new ArrayList<Expr>()
    while (!lookAhead(EOF)) {
      var expr = parseStatement()
      exprs.add(expr)
      if (!lookAhead(EOF)) consume(LINE)
    }

    return exprs
  }


  private function parseStatement() : Expr {
    if (match(RATEROUTINE)) return parseRoutine()
    if (match(LEFT_BRACE)) return parseBlock()
    if (match(IF)) return parseIfStatement()
    //if (match(RIGHT_BRACE)) return parseEOF()

    return parseExpression()
  }

  function parseEOF(): Expr {
    //consume(RIGHT_BRACE)
    return new NothingExpr()
  }

  function parseRoutine() : Expr {
    consume(RATEROUTINE)

    var line = consume(NAME)
    consume(DOT)
    var rateRoutineCode = consume(NAME)

    match(LINE)
    var blk = parseBlock()
    var routine = new RateRoutineExpr(line.Text, rateRoutineCode.Text, blk)

    return routine
  }

  private function parseIfStatement() : Expr {
    var condition = parseCondition()
    return new IfExpr(condition, parseBlock())
  }

  private function parseCondition() : Expr {
    consume(LEFT_PAREN)
    var condition = parseExpression()
    consume(RIGHT_PAREN)

    return condition
  }

  private function parseBlock() : Expr {
    consume(LEFT_BRACE)
    var expressions = new ArrayList<Expr>()

    while(true) {
      if(lookAhead(RIGHT_BRACE)) break
      expressions.add(parseStatement())
      if(lookAhead(LINE)) consume()
    }
    //consume()
    return new SequenceExpr(expressions)
  }

  private function parseExpression() : Expr {
    return parsePrecedence(0)
  }
  
  function parsePrecedence(precedence: int) : Expr {
    var token = consume();
    var prefix = _prefixParselets.get(token.Type)

    if (prefix == null) {
      throw "Could not parse \"" + token.Text + "\"" + token.Type + "."
    }
    var left = prefix.parse(this, token)
    return parseInfix(left, precedence)
    
  }
  
  private function parseInfix(left : Expr, precedence : int) : Expr {

    while (precedence < getPrecedence()) {
      var token = consume()
      var infix = _infixParselets.get(token.getType())
      left = infix.parse(this, left, token)
    }

    return left
  }

  private function getPrecedence() : int {
    var parser = _infixParselets.get(lookAhead(0).getType())
    if (parser != null) return parser.Precedence

    return 0;
  }

  
  private function infixLeft(tokenType : TokenType, precedence : Precedence) {
    _infixParselets.put(tokenType, new BinaryOperatorParselet(precedence.Precedence, false))
  }
  
  private function prefix(tokenType : TokenType, parser : PrefixParselet) {
    _prefixParselets.put(tokenType, parser)
  }

  private function register(tokenType : TokenType, parser : InfixParselet) {
    _infixParselets.put(tokenType, parser)
  }



  private function consume(tokenType : TokenType) : Token {
    if (match(tokenType)) return last(1)
    throw "Parse Exception expected " + tokenType.Name + " got " + current().Text
  }

  private function current() : Token {
    return lookAhead(0)
  }

  private function match(tokenType : TokenType) : boolean {
    if (!lookAhead(tokenType)) return false

    consume()

    return true
  }

  private function consume() : Token {
    lookAhead(0)

    mConsumed.add(0, mRead.remove(0))
    return last(1)
  }

  function last(offset : int) : Token {
    //Expect.positive(offset);
    return mConsumed.get(offset - 1);
  }

  private function lookAhead(distance : int) : Token {
    // Read in as many as needed.
    while (distance >= mRead.size()) {
      mRead.add(mTokens.readToken())
    }

    // Get the queued token.
    return mRead.get(distance)
 }
  
  private function lookAhead(expectedType: TokenType) : boolean {
    return lookAhead(0).Type == expectedType
  }

  private function lookAhead(expectedTokens: List<TokenType>) : boolean {
    var pos = 0
    return expectedTokens.allMatch( \ expectedType -> {
      var matches = lookAhead(pos).Type == expectedType
      pos++
      return matches
    })
  }
}