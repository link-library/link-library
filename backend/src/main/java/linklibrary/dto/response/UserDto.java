package linklibrary.dto.response;

import linklibrary.entity.Role;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    //@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.
    private Long userId;
    private String loginId;
    private String password;
    private Role role;
}
