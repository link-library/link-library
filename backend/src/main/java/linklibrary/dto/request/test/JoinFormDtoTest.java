package linklibrary.dto.request.test;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class JoinFormDtoTest {

    @Data
    @Schema(title = "회원 가입 요청", description = "회원가입 폼을 작성하셔야 합니다.")
    public class JoinFormDto {

        //@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
        //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
        //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.
        @Schema(title = "로그인 ID", example = "abcde1")
        @NotBlank(message = "아이디는 필수 입력 값입니다.")
        @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.")
        private String loginId;

        @Schema(title = "로그인 PASSWORD", example = "abcdefg1!")
        @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$",
                message = "비밀번호는 8~16자리수여야 합니다. 영문 대소문자, 숫자, 특수문자를 1개 이상 포함해야 합니다.")
        private String password;

        @Schema(description = "로그인 패스워드2")
        @NotBlank(message = "확인 비밀번호는 필수 입력 값입니다.")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$",
                message = "비밀번호는 8~16자리수여야 합니다. 영문 대소문자, 숫자, 특수문자를 1개 이상 포함해야 합니다.")
        private String password2;

        @Schema(title = "닉네임 작성", example = "nickname1")
        @NotBlank(message = "닉네임을 입력해주세요")
        private String nickname;
    }

}
