package linklibrary.securityTest;


public enum ExceptionCode {
    ACCESS_DENIED("A001", "Access is denied."),
    WRONG_TYPE_TOKEN("A002", "Wrong type of token."),
    EXPIRED_TOKEN("A003", "The token has expired."),
    UNSUPPORTED_TOKEN("A004", "The token is not supported."),
    UNKNOWN_ERROR("A999", "An unknown error has occurred."),
    WRONG_TOKEN("J001", "The token is invalid.");

    private final String code;
    private final String message;

    ExceptionCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
