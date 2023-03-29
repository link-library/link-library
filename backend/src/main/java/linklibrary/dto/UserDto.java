package linklibrary.dto;

import linklibrary.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserDto {
    private Long userId;
    private String loginId;
    private String password;
    private Role role;
}
