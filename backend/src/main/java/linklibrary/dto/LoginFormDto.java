package linklibrary.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginFormDto {
    @NotBlank(message = "아이디를 입력해주세요")
    private String loginId;
    @NotBlank(message = "비밀번호를 입력해주세요")
    private String password;
}

