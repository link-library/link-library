package linklibrary.security.service.test;

import linklibrary.dto.request.JoinFormDto;
import linklibrary.dto.request.LoginFormDto;
import linklibrary.dto.request.LogoutDto;
import linklibrary.dto.response.ResponseData;
import linklibrary.dto.response.test.CommonResponseDto;
import linklibrary.entity.Role;
import linklibrary.entity.User;
import linklibrary.repository.UserRepository;
import linklibrary.security.dto.TokenDto;
import linklibrary.security.filter.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.concurrent.TimeUnit;

import static linklibrary.security.filter.JwtFilter.BEARER_PREFIX;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthServiceTest {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RedisTemplate redisTemplate;


    // 이런 방법도 있어서. 한번 소개해보고싶어서 test로 넣어놨어요
    @Transactional
    public CommonResponseDto<Object> join2(JoinFormDto request) {
        log.debug("[join] join: {}", request);
        String password = request.getPassword();
        String password2 = request.getPassword();
        if(password.equals(password2)) {
            User user = User.builder()
                    .loginId(request.getLoginId())
                    .password(passwordEncoder.encode(request.getPassword())) //비밀번호 인코딩
                    .nickname(request.getNickname())
                    .role(Role.ROLE_USER) //user 등급으로 회원가입
                    .build();
            validateDuplicateUser(user); // 중복회원 검사
            userRepository.save(user);
            return CommonResponseDto.builder()
                    .message("회원 가입이 완료되었습니다.")
                    .build();
        }
        log.error("[join] 회원 가입 실패");
        throw new AuthenticationInvalidException("비밀번호와 확인 비밀번호가 일치하지 않습니다.");


    }

    private void validateDuplicateUser(User user) {
        User findUser = userRepository.findByLoginId(user.getLoginId());
        if (findUser != null) {
            throw new IllegalStateException("이미 존재하는 회원입니다");
        }
    }



}
