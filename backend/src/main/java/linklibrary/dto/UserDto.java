package linklibrary.dto;

import linklibrary.entity.Role;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private Long userId;
    private String loginId;
    private String password;
    private Role role;
}
