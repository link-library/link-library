package linklibrary.security.jwt;

public interface JwtProperties {
    String SECRET = "lzighesooiehfoiehdddosizgaeqwoipvdhvkxljkhaodqddafagegrdhpiogzuskeffhzos";
    int EXPIRATION_TIME = 100000 * 60 * 10 * 6;//60분
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
