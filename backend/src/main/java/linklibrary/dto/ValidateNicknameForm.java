package linklibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;

   //컨트롤에서 변수 바인딩이 안되서 조금 손봤어요.
//@Data
//@AllArgsConstructor
//public class ValidateNicknameForm {
//    @NotBlank(message = "아이디는 필수 입력 값입니다.")
//    private String nickname;
//}

@Data
@NoArgsConstructor
public class ValidateNicknameForm {
    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    private String nickname;

    @JsonCreator
    public ValidateNicknameForm(@JsonProperty("nickname") String nickname) {
        this.nickname = nickname;
    }
}
