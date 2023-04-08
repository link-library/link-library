package linklibrary.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor //기본 생성자가 없어서 나는 오류였어요. 수정했습니다
public class ValidateIdForm {
    //@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.
    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.")
    private String loginId;
}


//컨트롤러에서 데이터 바인딩이 From에서 안되길래 찾아보고, 수정했습니다.
//@Data
//@NoArgsConstructor
//public class ValidateIdForm {
//    @NotBlank(message = "아이디는 필수 입력 값입니다.")
//    @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.")
//    private String loginId;
//
//    @JsonCreator
//    public ValidateIdForm(@JsonProperty("loginId") String loginId) {
//        this.loginId = loginId;
//    }
//}
