package linklibrary.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor //기본 생성자가 없어서 나는 오류였어요. 수정했습니다
public class ValidateNicknameForm {
    //@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.
    @NotBlank(message = "닉네임은 필수 입력 값입니다.")
    @Size(max = 8)
    private String nickname;
}

//@Data
//@NoArgsConstructor
//public class ValidateNicknameForm {
//    @NotBlank(message = "아이디는 필수 입력 값입니다.")
//    private String nickname;
//
//    @JsonCreator
//    public ValidateNicknameForm(@JsonProperty("nickname") String nickname) {
//        this.nickname = nickname;
//    }
//}
