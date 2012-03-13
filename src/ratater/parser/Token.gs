package ratater.parser
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/6/12
 * Time: 11:10 PM
 * To change this template use File | Settings | File Templates.
 */
final class Token {
  /**
   * A simple token class. These are generated by Lexer and consumed by Parser.
   */
  construct(type : TokenType, text : String) {
    mType = type;
    mText = text;
  }

  override function toString() : String { return mType + ":'" + mText +"'" }

  var mType : TokenType as readonly Type
  var mText : String as readonly Text
}