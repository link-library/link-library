package linklibrary.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@Schema(title = "로그인 요청 ", description = "로그인 폼 작성하기 ")

public class LoginFormDto {
    //@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가  기능 많은 최신 swagger버전에 어울린다함.
    //구글에서 @Schema 쓰라고 해서  @ApiModelProperty 주석 처리 해놔도 될까요
    @NotBlank(message = "아이디를 입력해주세요")
    @Schema(title = "로그인 ID", example = "abcde1")
//    @ApiModelProperty(example = "abcde1")  ->위에 주석 설명
    private String loginId;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Schema(title ="로그인 패스워드", example = "abcdefg1!")
//    @ApiModelProperty(example = "abcdefg1!")
    private String password;
}

