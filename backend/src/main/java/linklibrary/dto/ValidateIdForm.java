package linklibrary.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

//@Data
//@AllArgsConstructor
//public class ValidateIdForm {
//    @NotBlank(message = "아이디는 필수 입력 값입니다.")
//    @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.")
//    private String loginId;
//}


//컨트롤러에서 데이터 바인딩이 From에서 안되길래 찾아보고, 수정했습니다.
@Data
@NoArgsConstructor
public class ValidateIdForm {
    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.")
    private String loginId;

    @JsonCreator
    public ValidateIdForm(@JsonProperty("loginId") String loginId) {
        this.loginId = loginId;
    }
}