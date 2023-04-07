package linklibrary.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginFormDto {
    @NotBlank(message = "아이디를 입력해주세요")
    @ApiModelProperty(example = "abcde1")
    private String loginId;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @ApiModelProperty(example = "abcdefg1!")
    private String password;
}

