package linklibrary.service;

import linklibrary.dto.JoinFormDto;
import linklibrary.entity.User;
import linklibrary.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class UserServiceTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Test
    public void 회원가입() throws Exception {
        //given
        JoinFormDto joinFormDto = new JoinFormDto();
        joinFormDto.setLoginId("abcde");
        joinFormDto.setPassword("abcdefg1!");
        joinFormDto.setNickname("요롱롱");
        //when
        Long joinUserId = userService.join(joinFormDto);
        //then
        User findUser = userRepository.findById(joinUserId).get();
        Assertions.assertThat(findUser.getLoginId()).isEqualTo(joinFormDto.getLoginId());
        Assertions.assertThat(findUser.getNickname()).isEqualTo(joinFormDto.getNickname());
    }
}