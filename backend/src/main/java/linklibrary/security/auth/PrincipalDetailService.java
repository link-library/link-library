package linklibrary.security.auth;

import linklibrary.dto.response.UserDto;
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
        /**
         * 여기서 유저 엔티티를 조회하면 profileImg 조회 쿼리까지 같이 나가는데 왜 그런지 모르겠음..
         *
         * A :    (? ,?) 이렇게 인쿼리로 나가서 조회하게 되는거면
         *  application.yml 에서  default_batch_fetch_size: 100  # batch size 설정
         *  이거 때문에  모든 엔티티에 패치 조인 적용되서 그런걸로 알고있어요.
         */
        log.info("유저 엔티티 조회 완료");
        if(userEntity == null) {
            throw new EntityNotFoundException("아이디를 다시 학인해주세요");
        }
        UserDto userDto = new UserDto(userEntity.getId(), userEntity.getLoginId(), userEntity.getPassword(), userEntity.getRole());
        return new PrincipalDetails(userDto);
    }
}
