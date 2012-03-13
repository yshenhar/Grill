package ratater.parser
/**
 * Created by IntelliJ IDEA.
 * User: chris
 * Date: 3/6/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */

enum TokenType {
    // punctuation and grouping
    LEFT_PAREN,
    RIGHT_PAREN,
    LEFT_BRACE,
    RIGHT_BRACE,
    COMMA,
    DOT,

    // operators
    ASTERISK,
    ASSIGN,
    SLASH,
    //PERCENT,
    PLUS,
    MINUS,
    LT,
    GT,
    LTE,
    GTE,
    EQEQ,
    NOTEQ,

    // keywords
    AND,
    BOOK,
    COST,
    ELSE,
    IF,
    OR,
    RATEROUTINE,

    // identifiers
    NAME,

    // literals
    BOOL,
    NUMBER,
    NOTHING,
    STRING,

    // comments
    BLOCK_COMMENT,
    DOC_COMMENT,
    LINE_COMMENT,

    // spacing
    LINE,
    WHITESPACE,
    LINE_CONTINUATION,
    EOF
}