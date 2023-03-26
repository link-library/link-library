package linklibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor //기본 생성자가 없어서 나는 오류였어요. 수정했습니다
public class ValidateNicknameForm {
    @NotBlank(message = "닉네임은 필수 입력 값입니다.")
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
