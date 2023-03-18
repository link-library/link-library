package linklibrary.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class JoinFormDto {
    @NotBlank(message = "아이디를 입력해주세요")
    private String loginId;
    @NotBlank(message = "비밀번호를 입력해주세요")
    private String password;
    @NotBlank(message = "닉네임을 입력해주세요")
    private String nickname;
}
