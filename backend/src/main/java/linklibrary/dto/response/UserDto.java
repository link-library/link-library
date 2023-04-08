package linklibrary.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import linklibrary.entity.Role;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(title = "유저 정보 응답", description = "유저 정보 응답하기")
public class UserDto {
    //@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.
    @Schema(title = "유저 ID", example = "1")
    private Long userId;

    @Schema(title = "유저 로그인ID", description = "abcde1")
    private String loginId;

    @Schema(title = "유저 패스워드", description = "abcdefg1!")
    private String password;

    @Schema(title = "유저 등급", example = "ROLE_USER")
    private Role role;
}
