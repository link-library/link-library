package linklibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class ValidateNicknameForm {
    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    private String nickname;
}