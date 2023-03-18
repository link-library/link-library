package linklibrary.security.jwt;

public interface JwtProperties {
    String SECRET = "lzighesooiehfoiehdddosizfhzos";
    int EXPIRATION_TIME = 1000 * 60 * 10; //10분
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
