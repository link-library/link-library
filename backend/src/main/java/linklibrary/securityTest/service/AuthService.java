package linklibrary.securityTest.service;

import linklibrary.dto.JoinFormDto;
import linklibrary.dto.LoginFormDto;
import linklibrary.dto.LogoutDto;
import linklibrary.dto.ResponseData;
import linklibrary.entity.Role;
import linklibrary.entity.User;
import linklibrary.repository.UserRepository;
import linklibrary.securityTest.TokenProvider;
import linklibrary.securityTest.dto.TokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RedisTemplate redisTemplate;

    @Transactional
    public Long join(JoinFormDto joinFormDto) {
        User user = User.builder()
                .loginId(joinFormDto.getLoginId())
                .password(passwordEncoder.encode(joinFormDto.getPassword())) //비밀번호 인코딩
                .nickname(joinFormDto.getNickname())
                .role(Role.ROLE_USER) //user 등급으로 회원가입
                .build();
        validateDuplicateUser(user); // 중복회원 검사
        userRepository.save(user);
        return user.getId();
    }

    @Transactional
    public TokenDto login(LoginFormDto loginFormDto) {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginFormDto.getLoginId(), loginFormDto.getPassword());

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
        // 4. 토큰 발급
        return tokenDto;
    }

    private void validateDuplicateUser(User user) {
        User findUser = userRepository.findByLoginId(user.getLoginId());
        if (findUser != null) {
            throw new IllegalStateException("이미 존재하는 회원입니다");
        }
    }

    public ResponseEntity<?> logout(LogoutDto logoutDto) {
        if(!tokenProvider.checkToken(logoutDto.getAccessToken())) {
            return ResponseEntity.ok(new ResponseData("잘못된 요청입니다.",null));
        }

        // 2. Access Token 에서 authentication 가져옴
        Authentication authentication = tokenProvider.getAuthentication(logoutDto.getAccessToken());

        // 3. 해당 Access Token 유효시간을 갖고 와서 BlackList 로 저장
        Long expiration = tokenProvider.getExpiration(logoutDto.getAccessToken());
        redisTemplate.opsForValue()
                .set(logoutDto.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);
        return ResponseEntity.ok(new ResponseData("로그아웃 되었습니다", null));

    }
}