package linklibrary.securityTest.auth;

import linklibrary.dto.UserDto;
import linklibrary.entity.User;
import linklibrary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrincipalDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("loadUserByUsername 실행");
        User userEntity = userRepository.findByLoginId(username);
        if(userEntity == null) {
            throw new EntityNotFoundException("아이디를 다시 학인해주세요");
        }
        UserDto userDto = new UserDto(userEntity.getId(), userEntity.getLoginId(), userEntity.getPassword(), userEntity.getRole());
        return new PrincipalDetails(userDto);
    }
}
