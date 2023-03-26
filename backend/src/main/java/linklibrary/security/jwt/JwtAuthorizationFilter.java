package linklibrary.security.jwt;

import io.jsonwebtoken.Jwts;
import linklibrary.entity.User;
import linklibrary.repository.UserRepository;
import linklibrary.security.auth.PrincipalDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//시큐리티가 BasicAuthenticationFilter 를 갖고 있음
//위 필터를 상속했기에 권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 타게 되어 있음
@Slf4j
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private UserRepository userRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String jwtHeader = request.getHeader(JwtProperties.HEADER_STRING);

        if (jwtHeader == null || !jwtHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        log.info("인증이나 권한이 필요한 주소 요청됨");
        String jwtToken = request.getHeader(JwtProperties.HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX, "");
//        String loginId = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET))
//                .build()
//                .verify(jwtToken)
//                .getClaim("loginId")
//                .asString();
        String loginId = Jwts.parserBuilder()
                .setSigningKey(JwtProperties.SECRET.getBytes())
                .build()
                .parseClaimsJws(jwtToken)
                .getBody()
                .get("loginId", String.class);
        log.info("JWT 토큰에서 인코딩된 정보 확인중");


        if (loginId != null) {
            User userEntity = userRepository.findByLoginId(loginId);
            PrincipalDetails principalDetails = new PrincipalDetails(userEntity);

            Authentication authenticationToken =
                    new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            chain.doFilter(request, response);
        }
    }
}
