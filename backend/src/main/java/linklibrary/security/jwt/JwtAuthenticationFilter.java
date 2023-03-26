package linklibrary.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import linklibrary.entity.User;
import linklibrary.exception.JsonParseException;
import linklibrary.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;


/**
 * /login 으로 요청이 오면 UsernamePasswordAuthenticationFilter 동작함. 이를 오버라이딩해서 구현
 */
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        log.info("로그인 시도중");
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            //json 데이터를 User로 변환
            User user = objectMapper.readValue(request.getInputStream(), User.class);
            log.info("json 으로 받아온 데이터 User 로 변환, User={}", user);

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getLoginId(), user.getPassword());
            log.info("토큰 생성 완료");

            //authenticationManger 를 통해 loadUserByUsername() 함수 실행
            //성공하면 authentication 에 로그인 정보 담김
            Authentication authenticate = authenticationManager.authenticate(authenticationToken);
            log.info("loadUserByUsername() 실행하여 db 토큰과 로그인 토큰 비교 후 authentication 생성");

            return authenticate;
        } catch (IOException e) {
            throw new JsonParseException("json 으로 변환 중 예외 발생");
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        log.info("successfulAuthentication 실행됨 (인증완료)");
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        /**
         * JWT 토큰 생성
         * HASH 암호방식
         */
//        String jwtToken = JWT.create()
//                .withSubject("login 토큰")
//                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME)) // 토큰 유효 시간 10분
//                .withClaim("id", principalDetails.getUser().getId())
//                .withClaim("loginId", principalDetails.getUser().getLoginId())
//                .sign(Algorithm.HMAC512(JwtProperties.SECRET)); //서버만 알고있는 secret 키로 암호화
//        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
        String jwtToken = Jwts.builder()
                .setSubject("login 토큰")
                .setExpiration(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME)) // 토큰 유효 시간 10분
                .claim("id", principalDetails.getUser().getId())
                .claim("loginId", principalDetails.getUser().getLoginId())
                .signWith(SignatureAlgorithm.HS512, JwtProperties.SECRET.getBytes())
                .compact();
        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
        log.info("헤더에 JWT 토큰을 실어 응답");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"message\":\"로그인 성공!\", \"token\":\"" + JwtProperties.TOKEN_PREFIX + jwtToken + "\"}");
    }
}
