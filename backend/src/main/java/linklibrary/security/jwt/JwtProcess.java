package linklibrary.security.jwt;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import linklibrary.dto.UserDto;
import linklibrary.entity.Role;
import linklibrary.entity.User;
import linklibrary.security.auth.PrincipalDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class JwtProcess {

    private static final Logger log = LoggerFactory.getLogger(JwtProcess.class);

    public static String create(PrincipalDetails principalDetails) {
        log.debug("디버그 : JwtProcess create()");
        String jwtToken = JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("loginId", principalDetails.getUsername())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
        return JwtProperties.TOKEN_PREFIX + jwtToken;
    }

    public static String verify(String token) {
        log.debug("디버그 : JwtProcess verify()");
        try {
            DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token);
            String id = decodedJWT.getClaim("loginId").asString();
            return id;
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
            throw new SignatureException(ex.getMessage());
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        } catch (JWTDecodeException ex) {
            log.error("The input is not a valid base 64 encoded string.");
            throw new JWTDecodeException(ex.getMessage());
        }
        return null;
    }

}