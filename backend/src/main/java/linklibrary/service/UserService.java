package linklibrary.service;

import linklibrary.dto.JoinFormDto;
import linklibrary.entity.Role;
import linklibrary.entity.User;
import linklibrary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    /**
     * 회원 가입
     */
    public Long join(JoinFormDto joinFormDto) {
        User user = User.builder()
                .loginId(joinFormDto.getLoginId())
                .password(encoder.encode(joinFormDto.getPassword())) //비밀번호 인코딩
                .nickname(joinFormDto.getNickname())
                .role(Role.ROLE_USER) //user 등급으로 회원가입
                .createdAt(LocalDateTime.now()) //생성일
                .build();
        validateDuplicateUser(user); // 중복회원 검사
        userRepository.save(user);
        return user.getId();
    }

    private void validateDuplicateUser(User user) {
        User findUser = userRepository.findByLoginId(user.getLoginId());
        if(findUser != null) {
            throw new IllegalStateException("이미 존재하는 회원입니다");
        }
    }
}
